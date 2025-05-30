import React from "react";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "@public/icons/DeleteIcon";
import ConfirmRemoveModal from "@components/ConfirmRemoveModal";
import { getComments, removeComment } from "@utils/fetchManager";
import Toast, { notifyError, notifySuccess } from "@components/Toast";

export default function RemoveButton({
    commentID,
    setComments,
    gameID,
    userID,
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleCommentRemove = async () => {
        try {
            await removeComment(commentID, userID);
            const updatedComments = await getComments(gameID);
            setComments(updatedComments);
            onOpenChange();
            notifySuccess("Komentar uspješno uklonjen!");
        } catch (error) {
            notifyError("Neuspješno uklanjanje komentara!");
            console.error("Pogreška prilikom uklanjanja komentara:", error);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <Tooltip
                color="danger"
                showArrow
                closeDelay={0}
                content="Ukloni komentar"
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
                handleOkClick={handleCommentRemove}
                target="comments"
            />
            <Toast />
        </div>
    );
}
