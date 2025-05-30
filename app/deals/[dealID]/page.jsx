"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchDealID } from "@utils/fetchManager";
import DealDetailsCard from "@components/DealDetails/DealDetailsCard";
import { Divider, Spinner } from "@nextui-org/react";
import CommentSection from "@components/Comments/CommentSection";
import { useCurrency } from "@context/CurrencyContext";
import CheaperStoreCards from "@components/DealDetails/CheaperStoreCards";

const DealDetails = () => {
    const { dealID } = useParams();
    const [selectedDeal, setSelectedDeal] = useState({});
    const [gameInfo, setGameInfo] = useState(null);
    const [cheaperStores, setCheaperStores] = useState([]);
    const [cheapestPrice, setCheapestPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const { convertPriceWithSymbol } = useCurrency();

    useEffect(() => {
        if (dealID) {
            const selectedDealInfo = localStorage.getItem("selectedDeal");
            if (selectedDealInfo) {
                setSelectedDeal(JSON.parse(selectedDealInfo));
            }

            const fetchDeal = async () => {
                setLoading(true);
                try {
                    const fetchedDeal = await fetchDealID(dealID);

                    setGameInfo(fetchedDeal.gameInfo);
                    setCheaperStores(fetchedDeal.cheaperStores);
                    setCheapestPrice(fetchedDeal.cheapestPrice);
                } catch (error) {
                    console.error("Dohvaćanje podataka neuspješno:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDeal();
        }
    }, [dealID, convertPriceWithSymbol]);

    if (loading) {
        return (
            <div className="pt-50 flex justify-center items-center h-full">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div>
            <DealDetailsCard
                selectedDeal={selectedDeal}
                gameInfo={gameInfo}
                cheapestPrice={cheapestPrice}
                convertPriceWithSymbol={convertPriceWithSymbol}
            />

            <div className="w-full pt-5 md:mx-auto lg:w-full lg:flex lg:justify-center lg:gap-6">
                {cheaperStores && (
                    <div className="lg:mt-0 lg:w-[45%] xl:w-[40%] lg:order-3">
                        <CheaperStoreCards
                            cheaperStores={cheaperStores}
                            convertPriceWithSymbol={convertPriceWithSymbol}
                        />
                    </div>
                )}

                <div className="hidden lg:flex lg:order-2">
                    <Divider orientation="vertical" />
                </div>

                <div className="pt-5 lg:pt-0 lg:w-[55%] xl:w-[60%] lg:order-1">
                    <CommentSection gameID={gameInfo.gameID} />
                </div>
            </div>
        </div>
    );
};

export default DealDetails;
