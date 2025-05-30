import React, { useCallback } from "react";
import { Button, Pagination as NextUIPagination } from "@nextui-org/react";
import Filters from "@components/Deals/Filters";

const Pagination = ({
    params,
    setParams,
    totalPages,
    setVisibleStores,
    router,
    setItemSorter,
}) => {
    const adjustedTotalPages = totalPages > 0 ? totalPages : 1;

    const updateUrlParams = useCallback(
        (newParams) => {
            const url = new URL(window.location);
            Object.keys(newParams).forEach((key) => {
                if (newParams[key] !== undefined && newParams[key] !== null) {
                    url.searchParams.set(key, newParams[key]);
                } else {
                    url.searchParams.delete(key);
                }
            });
            router.push(url.toString());
        },
        [router]
    );

    const setVisibleStoresCallback = useCallback(
        (stores) => {
            if (Array.isArray(stores) && stores.length > 0) {
                setVisibleStores(new Set(stores));
                const storeID = stores.join(",");
                setParams((prev) => ({ ...prev, storeID, pageNumber: 0 }));
                updateUrlParams({ storeID });
            } else {
                setVisibleStores(new Set());
                setParams((prev) => ({ ...prev, storeID: "", pageNumber: 0 }));
                updateUrlParams({ storeID: "" });
            }
        },
        [setParams, setVisibleStores, updateUrlParams]
    );

    const handlePriceChange = useCallback(
        (values) => {
            const [lowerPrice, upperPrice] = values;
            setParams((prev) => ({
                ...prev,
                lowerPrice,
                upperPrice,
                pageNumber: 0,
            }));
            updateUrlParams({ lowerPrice, upperPrice });
        },
        [setParams, updateUrlParams]
    );

    const handleClickClearFilters = () => {
        setVisibleStores(new Set());
        setParams({
            pageNumber: 0,
            storeID: "",
            lowerPrice: 0,
            upperPrice: 50,
        });
        setItemSorter({
            sortBy: "DealRating",
            desc: 0,
        });

        router.push("/");
    };

    const onNextPage = useCallback(() => {
        const newPage = params.pageNumber + 1;
        setParams((prev) => ({ ...prev, pageNumber: newPage }));
    }, [params.pageNumber, setParams]);

    const onPreviousPage = useCallback(() => {
        if (params.pageNumber > 0) {
            const newPage = params.pageNumber - 1;
            setParams((prev) => ({ ...prev, pageNumber: newPage }));
        }
    }, [params.pageNumber, setParams]);

    const handlePageChange = useCallback(
        (page) => {
            const newPage = page - 1;
            setParams((prev) => ({ ...prev, pageNumber: newPage }));
        },
        [setParams]
    );

    const topContent = (
        <div>
            <Filters
                setVisibleStores={setVisibleStoresCallback}
                onPriceChange={handlePriceChange}
                onClearFilters={handleClickClearFilters}
                setItemSorter={setItemSorter}
            />
        </div>
    );

    const bottomContent = (
        <div className="py-2 flex justify-center items-center">
            <Button
                className="hidden sm:flex mr-2"
                isDisabled={params.pageNumber === 0}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
            >
                Prethodna
            </Button>
            <NextUIPagination
                variant="light"
                isCompact
                showShadow
                color="primary"
                page={params.pageNumber + 1}
                total={Number(adjustedTotalPages) + 1}
                onChange={handlePageChange}
            />
            <Button
                className="hidden sm:flex ml-2"
                isDisabled={params.pageNumber >= adjustedTotalPages}
                size="sm"
                variant="flat"
                onPress={onNextPage}
            >
                Sljedeća
            </Button>
        </div>
    );

    return { topContent, bottomContent };
};

export default Pagination;
