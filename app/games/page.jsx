"use client";

import React, { useState, useEffect } from "react";
import DealCard from "@components/Games/DealCard";
import SearchGames from "@components/Games/SearchGames";
import { fetchGames, fetchGameID, fetchStores } from "@utils/fetchManager";
import { Spinner } from "@nextui-org/react";
import GameCard from "@components/Games/GameCard";
import { useCurrency } from "@context/CurrencyContext";

export default function Games() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [stores, setStores] = useState({});
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameDeals, setGameDeals] = useState([]);
    const [gameInfo, setGameInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const { convertPriceWithSymbol } = useCurrency();

    useEffect(() => {
        const fetchData = async () => {
            if (!search && !selectedGame) return;

            setLoading(true);
            try {
                if (search && search.length > 3) {
                    const gamesData = await fetchGames(search);
                    setGames(gamesData);
                }

                if (selectedGame) {
                    const gameData = await fetchGameID(selectedGame);
                    const storesData = await fetchStores();

                    setGameDeals(gameData.deals);
                    setGameInfo(gameData.info);

                    const storesMap = storesData.reduce((acc, store) => {
                        acc[store.storeID] = {
                            name: store.storeName,
                            logo: store.images.logo,
                            banner: store.images.banner,
                            icon: store.images.icon,
                        };
                        return acc;
                    }, {});
                    setStores(storesMap);
                }
            } catch (error) {
                console.error("Dohvaćanje podataka neuspješno:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, selectedGame]);

    const getRelevantStores = (deal) => {
        return stores[deal.storeID] || {};
    };

    return (
        <>
            <div>
                <SearchGames
                    games={games}
                    search={search}
                    setSearch={setSearch}
                    setSelectedGame={setSelectedGame}
                />
            </div>
            {loading ? (
                <div className="pt-50 flex justify-center items-center">
                    <Spinner size="lg" />
                </div>
            ) : selectedGame && gameInfo ? (
                <div className="pt-10">
                    <GameCard gameInfo={gameInfo} gameID={selectedGame} />
                    <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gameDeals.map((deal) => (
                            <DealCard
                                key={deal.dealID}
                                deal={deal}
                                store={getRelevantStores(deal)}
                                convertPriceWithSymbol={convertPriceWithSymbol}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
}
