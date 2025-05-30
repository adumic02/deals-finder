import React from "react";
import { Slider } from "@nextui-org/react";
import { useCurrency } from "@context/CurrencyContext";

export default function PriceSlider({ onChangeEnd }) {
    const { currency, convertPrice } = useCurrency();

    return (
        <Slider
            key={currency}
            label="Cijena videoigre"
            step={1}
            minValue={convertPrice(0)}
            maxValue={convertPrice(50)}
            defaultValue={[convertPrice(0), convertPrice(50)]}
            formatOptions={{ style: "currency", currency: currency }}
            size="sm"
            onChangeEnd={onChangeEnd}
        />
    );
}
