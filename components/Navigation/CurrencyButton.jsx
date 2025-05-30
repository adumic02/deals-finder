import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useCurrency } from "@context/CurrencyContext";
import { ChevronDownIcon } from "@public/icons/ChevronDownIcon";

export default function CurrencyButton() {
    const { currency, changeCurrency } = useCurrency();

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                >
                    {currency}
                </Button>
            </DropdownTrigger>

            <DropdownMenu>
                <DropdownItem key="USD" onClick={() => changeCurrency("USD")}>
                    USD
                </DropdownItem>

                <DropdownItem key="EUR" onClick={() => changeCurrency("EUR")}>
                    EUR
                </DropdownItem>

                <DropdownItem key="GBP" onClick={() => changeCurrency("GBP")}>
                    GBP
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
