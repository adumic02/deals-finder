"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    getWishlist,
    fetchGameID,
    updateGame,
    getStores,
    addStore,
} from "@utils/fetchManager";
import { useSession } from "next-auth/react";
import { useCurrency } from "@context/CurrencyContext";
import WishlistCards from "@components/Wishlist/WishlistCards";
import withAuth from "@libs/withAuth";

const Wishlist = () => {
    const { data: session } = useSession();
    const [wishlistedGames, setWishlistedGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const { convertPriceWithSymbol } = useCurrency();

    const fetchData = useCallback(async () => {
        setLoading(true);
        if (session) {
            try {
                const fetchedGames = await getWishlist(session.user.id);
                const existingStores = await getStores();
                const localStores = JSON.parse(localStorage.getItem("stores"));

                const gamesToUpdate = [];
                const gamesToKeep = [];

                await Promise.all(
                    fetchedGames.map(async (game) => {
                        const updatedGameData = await fetchGameID(game.id);
                        const updatedStoreID = parseInt(
                            updatedGameData.deals[0].storeID
                        );
                        const updatedStoreData = localStores[updatedStoreID];

                        if (
                            updatedGameData.info.title !== game.title ||
                            updatedGameData.info.thumb !== game.thumb ||
                            updatedGameData.deals[0].dealID !== game.deal_id ||
                            parseFloat(updatedGameData.deals[0].price).toFixed(
                                2
                            ) !== parseFloat(game.sale_price).toFixed(2) ||
                            parseFloat(
                                updatedGameData.deals[0].retailPrice
                            ).toFixed(2) !==
                                parseFloat(game.normal_price).toFixed(2) ||
                            parseFloat(
                                updatedGameData.deals[0].savings
                            ).toFixed(2) !==
                                parseFloat(game.savings).toFixed(2) ||
                            updatedStoreID !== game.store_id
                        ) {
                            if (updatedStoreID !== game.store_id) {
                                const storeExists = existingStores.some(
                                    (store) => store.ID === updatedStoreID
                                );

                                if (!storeExists) {
                                    await addStore(
                                        updatedStoreID,
                                        updatedStoreData
                                    );
                                }
                            }

                            await updateGame(game.id, updatedGameData);
                            gamesToUpdate.push(game.id);
                        } else {
                            gamesToKeep.push(game);
                        }
                    })
                );

                let updatedGames = [...gamesToKeep];
                if (gamesToUpdate.length > 0) {
                    const refreshedGames = await getWishlist(session.user.id);
                    updatedGames = refreshedGames;
                }

                setWishlistedGames(updatedGames);
            } catch (error) {
                console.error(
                    "Dohvaćanje podataka liste želja neuspješno:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }
    }, [session]);

    const convertedWishlistedGames = useMemo(() => {
        return wishlistedGames.map((game) => ({
            ...game,
            sale_price: convertPriceWithSymbol(game.sale_price),
            normal_price: convertPriceWithSymbol(game.normal_price),
        }));
    }, [wishlistedGames, convertPriceWithSymbol]);

    useEffect(() => {
        fetchData();
    }, [session, fetchData]);

    return (
        <WishlistCards
            loading={loading}
            wishlistedGames={convertedWishlistedGames}
            onWishlistChange={fetchData}
            convertPriceWithSymbol={convertPriceWithSymbol}
        />
    );
};

export default withAuth(Wishlist);
