import React, { useState, useEffect } from "react";
import { useDisclosure, Button } from "@nextui-org/react";
import { fetchStores } from "@utils/fetchManager";
import PriceSlider from "@components/Deals/PriceSlider";
import StoresModal from "@components/Deals/StoresModal";
import SortButton from "@components/Deals/SortButton";

const Filters = ({
    setVisibleStores,
    onPriceChange,
    onClearFilters,
    setItemSorter,
}) => {
    const [stores, setStores] = useState([]);
    const [selectedStores, setSelectedStores] = useState(new Set());
    const [priceSliderKey, setPriceSliderKey] = useState(0);
    const [storeModalKey, setStoreModalKey] = useState(0);
    const [sortButtonKey, setSortButtonKey] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchStoresData = async () => {
            const storesData = await fetchStores();
            setStores(storesData);
        };

        fetchStoresData();
    }, []);

    const handleCheckboxChange = (storeID) => {
        setSelectedStores((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(storeID)) {
                newSet.delete(storeID);
            } else {
                newSet.add(storeID);
            }
            return newSet;
        });
    };

    const handleOkClick = () => {
        setVisibleStores(Array.from(selectedStores));
        onOpenChange();
    };

    const handleUncheckAll = () => {
        setSelectedStores(new Set());
    };

    const handlePriceChange = (values) => {
        onPriceChange(values);
    };

    const handleClearFilters = () => {
        onClearFilters();

        setPriceSliderKey((prevKey) => prevKey + 1);
        setSortButtonKey((prevKey) => prevKey + 1);

        setStoreModalKey((prevKey) => prevKey + 1);
        setSelectedStores(new Set());
    };

    return (
        <div className="flex flex-col lg:flex-row md:px-20 lg:px-36 items-center justify-between gap-5">
            <div className="flex gap-2">
                <Button onPress={onOpen}>Platforme</Button>
                <SortButton key={sortButtonKey} setItemSorter={setItemSorter} />
                <Button onPress={handleClearFilters}>
                    Ukloni filtere
                </Button>{" "}
            </div>
            <StoresModal
                key={storeModalKey}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                stores={stores}
                selectedStores={selectedStores}
                handleCheckboxChange={handleCheckboxChange}
                handleOkClick={handleOkClick}
                handleUncheckAll={handleUncheckAll}
            />
            <div className="flex justify-self-end w-full max-w-sm">
                <PriceSlider
                    key={priceSliderKey}
                    onChangeEnd={handlePriceChange}
                />
            </div>
        </div>
    );
};

export default Filters;
