import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchExchangeRates } from "@utils/fetchManager";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const CACHE_KEY = "exchangeRates";
const TIMESTAMP_KEY = "exchangeRatesTimestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedCurrency = localStorage.getItem("currency");
                if (savedCurrency) {
                    setCurrency(savedCurrency);
                }

                const cachedRates = localStorage.getItem(CACHE_KEY);
                const timestamp = localStorage.getItem(TIMESTAMP_KEY);
                const now = Date.now();

                if (
                    cachedRates &&
                    timestamp &&
                    now - Number(timestamp) < CACHE_DURATION
                ) {
                    setExchangeRates(JSON.parse(cachedRates));
                } else {
                    const data = await fetchExchangeRates();
                    localStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
                    localStorage.setItem(TIMESTAMP_KEY, now.toString());
                    setExchangeRates(data.rates);
                }
            } catch (error) {
                console.error(
                    "Pogreška prilikom dohvaćanja valutnih tečajeva:",
                    error
                );
            }
        };

        fetchData();
    }, []);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency);
    };

    const convertPriceWithSymbol = (price) => {
        const rate = exchangeRates[currency] || 1;
        const convertedPrice = Number(price) * rate;
        const value =
            currency === "USD"
                ? `$${convertedPrice.toFixed(2)}`
                : currency === "EUR"
                ? `${convertedPrice.toFixed(2)} €`
                : currency === "GBP"
                ? `£${convertedPrice.toFixed(2)}`
                : convertedPrice.toFixed(2);
        return value;
    };

    const convertPrice = (price) => {
        const rate = exchangeRates[currency] || 1;
        const convertedPrice = Number(price) * rate;
        return convertedPrice;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                changeCurrency,
                convertPriceWithSymbol,
                convertPrice,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
