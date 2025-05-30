import {
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
    Button,
    DropdownItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import staticValues from "@helpers/StaticValues";
import { ChevronDownIcon } from "@public/icons/ChevronDownIcon";

export default function SortButton({ setItemSorter }) {
    const options = staticValues.sortingOptions;
    const [selectedKey, setSelectedKey] = useState(options[0].label);

    const handleSortChange = (label) => {
        setSelectedKey(label);
        const selectedOption = options.find((option) => option.label === label);
        if (selectedOption) {
            setItemSorter(selectedOption.value);
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button endContent={<ChevronDownIcon className="text-small" />}>
                    Sortiraj
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                closeOnSelect={true}
                selectionMode="single"
                selectedKeys={new Set([selectedKey])}
                onSelectionChange={(keys) => {
                    const selectedLabel = Array.from(keys)[0];
                    handleSortChange(selectedLabel);
                }}
            >
                {options.map((option) => (
                    <DropdownItem key={option.label}>
                        {option.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
