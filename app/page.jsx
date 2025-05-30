"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@components/Deals/Pagination";
import DealCards from "@components/Deals/DealCards";
import { fetchDeals, fetchStores } from "@utils/fetchManager";
import { useCurrency } from "@context/CurrencyContext";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { convertPriceWithSymbol } = useCurrency();

    const [deals, setDeals] = useState([]);
    const [stores, setStores] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({
        pageNumber: Number(searchParams.get("pageNumber")) || 0,
        storeID: searchParams.get("storeID") || "",
        lowerPrice: Number(searchParams.get("lowerPrice")) || 0,
        upperPrice: Number(searchParams.get("upperPrice")) || 50,
        sortBy: searchParams.get("sortBy") || "DealRating",
        desc: searchParams.get("desc") || 0,
    });
    const [visibleStores, setVisibleStores] = useState(new Set());
    const [itemSorter, setItemSorter] = useState({
        sortBy: "DealRating",
        desc: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const fetchParams = {
                    ...params,
                    pageNumber: params.pageNumber,
                    sortBy: itemSorter.sortBy,
                    desc: itemSorter.desc,
                };

                const [dealsResult, storesData] = await Promise.all([
                    fetchDeals(fetchParams),
                    fetchStores(),
                ]);

                setDeals(dealsResult.data);
                setTotalPages(dealsResult.totalPageCount || 1);

                const storesMap = storesData.reduce((acc, store) => {
                    acc[store.storeID] = {
                        name: store.storeName,
                        logo: store.images.logo,
                        banner: store.images.banner,
                        icon: store.images.icon,
                    };
                    return acc;
                }, {});

                localStorage.setItem("stores", JSON.stringify(storesMap));
                setStores(storesMap);
            } catch (error) {
                console.error("Dohvaćanje podataka neuspješno:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params, itemSorter, convertPriceWithSymbol]);

    const filteredDeals = useMemo(() => {
        if (visibleStores.size === 0) return deals;
        return deals.filter((deal) => visibleStores.has(deal.storeID));
    }, [deals, visibleStores]);

    const { topContent, bottomContent } = Pagination({
        params,
        setParams,
        totalPages,
        setVisibleStores,
        setItemSorter,
        router,
    });

    return (
        <DealCards
            deals={filteredDeals}
            stores={stores}
            topContent={topContent}
            bottomContent={bottomContent}
            loading={loading}
            convertPriceWithSymbol={convertPriceWithSymbol}
        />
    );
}
