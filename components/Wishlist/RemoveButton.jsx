import React from "react";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "@public/icons/DeleteIcon";
import {
    removeFromWishlist,
    deleteNotification,
    checkNotification,
} from "@utils/fetchManager";
import { useSession } from "next-auth/react";
import ConfirmRemoveModal from "@components/ConfirmRemoveModal";
import Toast, { notifyError } from "@components/Toast";

export default function RemoveButton({ gameID, onWishlistChange }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session } = useSession();

    const handleWishListRemove = async () => {
        try {
            const res = await checkNotification(gameID, session.user.id);

            if (res.isAlerted) {
                await deleteNotification(gameID, session.user.id);
            }

            await removeFromWishlist(gameID, session.user.id);
            onWishlistChange();
            onOpenChange();
        } catch (error) {
            notifyError("Neuspješno uklanjanje videoigre s liste želja!");
            console.error(
                "Pogreška prilikom uklanjanja videoigre s liste želja:",
                error
            );
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <Tooltip
                color="danger"
                showArrow
                closeDelay={0}
                content="Ukloni s liste želja"
                className="font-medium"
            >
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={onOpen}
                >
                    <DeleteIcon />
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
    );
}
