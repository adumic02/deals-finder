"use client";

import React, { useState } from "react";
import { Input, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

export default function SearchGames({
    games,
    search,
    setSearch,
    setSelectedGame,
}) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length > 3) {
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-3/5 lg:w-2/5 xl:w-1/3">
                <Input
                    label="Naziv videoigre"
                    value={search}
                    onChange={handleSearchChange}
                />
                {isDropdownVisible && (
                    <ScrollShadow className="pt-1 w-full h-80">
                        <Listbox
                            aria-label="Naziv videoigre"
                            className=" bg-content2 shadow-small rounded-medium w-full"
                            closeOnSelect
                            items={games}
                            onAction={(key) => {
                                setSelectedGame(key),
                                    setIsDropdownVisible(false);
                            }}
                        >
                            {(game) => (
                                <ListboxItem showDivider key={game.gameID}>
                                    {game.external}
                                </ListboxItem>
                            )}
                        </Listbox>
                    </ScrollShadow>
                )}
            </div>
        </div>
    );
}
