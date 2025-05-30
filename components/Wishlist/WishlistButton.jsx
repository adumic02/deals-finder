import React, { useEffect, useState } from "react";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { HeartIcon } from "@public/icons/HeartIcon";
import { useSession } from "next-auth/react";
import {
    addToWishlist,
    removeFromWishlist,
    checkWishlist,
    addStore,
    fetchGameID,
    addGame,
    deleteNotification,
    getGames,
    getStores,
    checkNotification,
} from "@utils/fetchManager";
import ConfirmRemoveModal from "@components/ConfirmRemoveModal";
import Toast, { notifyError, notifySuccess } from "@components/Toast";

export default function WishlistButton({ gameID }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session } = useSession();

    useEffect(() => {
        const checkWishListStatus = async () => {
            if (session) {
                try {
                    const res = await checkWishlist(gameID, session.user.id);
                    setIsWishlisted(res.isWishlisted);
                } catch (error) {
                    console.error(
                        "Pogreška prilikom provjere liste želja korisnika:",
                        error
                    );
                }
            }
        };
        checkWishListStatus();
    }, [gameID, session]);

    const handleWishListAdd = async () => {
        if (!session) {
            notifyError(
                "Morate biti prijavljeni kako biste dodali videoigru na listu želja!"
            );
            return;
        }

        try {
            const games = await getGames();
            const stores = await getStores();

            try {
                const gameExists = games.some(
                    (game) => game.ID === Number(gameID)
                );

                if (!gameExists) {
                    const gameData = await fetchGameID(gameID);
                    const storesData = JSON.parse(
                        localStorage.getItem("stores")
                    );

                    const storeID = gameData.deals[0].storeID;
                    const storeData = storesData[storeID];

                    const storeExists = stores.some(
                        (store) => store.id === Number(storeID)
                    );

                    if (!storeExists) {
                        await addStore(storeID, storeData);
                    }

                    await addGame(gameID, gameData);
                }

                await addToWishlist(gameID, session.user.id);
                setIsWishlisted(true);
                notifySuccess("Videoigra dodana na listu želja!");
            } catch (error) {
                notifyError("Neuspješno dodavanje videoigre na listu želja!");
                console.error(
                    "Pogreška prilikom dodavanja videoigre na listu želja:",
                    error
                );
            }
        } catch (error) {
            console.error(
                "Pogreška prilikom dohvaćanja podataka o videoigrama i platformama iz baze:",
                error
            );
        }
    };

    const handleWishListRemove = async () => {
        try {
            const res = await checkNotification(gameID, session.user.id);

            if (res.isAlerted) {
                await deleteNotification(gameID, session.user.id);
            }

            await removeFromWishlist(gameID, session.user.id);
            setIsWishlisted(false);
            onOpenChange();
            notifySuccess("Videoigra uklonjena s liste želja!");
        } catch (error) {
            notifyError("Neuspješno uklanjanje videoigre s liste želja!");
            console.error(
                "Pogreška prilikom uklanjanja videoigre s liste želja:",
                error
            );
        }
    };

    return (
        <>
            <div className="flex gap-4 items-center">
                <Tooltip
                    color="danger"
                    showArrow
                    closeDelay={0}
                    className="text-foreground font-medium"
                    {...(isWishlisted
                        ? { content: "Ukloni s liste želja" }
                        : { content: "Dodaj na listu želja" })}
                >
                    <Button
                        isIconOnly
                        color="danger"
                        aria-label="Wishlist"
                        {...(isWishlisted
                            ? { variant: "solid", onClick: onOpen }
                            : {
                                  variant: "bordered",
                                  onClick: handleWishListAdd,
                              })}
                    >
                        <HeartIcon />
                    </Button>
                </Tooltip>
                <ConfirmRemoveModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleOkClick={handleWishListRemove}
                    target="wishlist"
                />
                <Toast />
            </div>
        </>
    );
}
