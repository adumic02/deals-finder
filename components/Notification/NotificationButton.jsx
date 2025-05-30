import React, { useState, useEffect } from "react";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { NotificationIcon } from "@public/icons/NotificationIcon";
import {
    addNotification,
    fetchAlerts,
    deleteNotification,
    checkNotification,
} from "@utils/fetchManager";
import PriceModal from "@components/Notification/PriceModal";
import Toast, { notifyError, notifySuccess } from "@components/Toast";

export default function NotificationButton({ gameID }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [price, setPrice] = useState("0");
    const { data: session } = useSession();
    const [isAlerted, setIsAlerted] = useState(false);

    useEffect(() => {
        const checkNotificationStatus = async () => {
            if (session) {
                try {
                    const res = await checkNotification(
                        gameID,
                        session.user.id
                    );
                    setIsAlerted(res.isAlerted);
                } catch (error) {
                    console.error(
                        "Pogreška prilikom provjere notifikacije:",
                        error
                    );
                }
            }
        };

        checkNotificationStatus();
    }, [gameID, session]);

    const handleOkClick = async () => {
        try {
            await fetchAlerts("set", session.user.email, gameID, price);
            await addNotification({
                price,
                game_id: gameID,
                user_id: session.user.id,
            });

            onOpenChange();
            setIsAlerted(true);
            notifySuccess("Obavijest uspješno dodana!");
        } catch (error) {
            notifyError("Neuspješno dodavanje obavijesti!");
            console.error("Pogreška prilikom dodavanja obavijesti:", error);
        }
    };

    const handleDeleteAlert = async () => {
        try {
            await fetchAlerts("delete", session.user.email, gameID);
            await deleteNotification(gameID, session.user.id);
            setIsAlerted(false);
            notifySuccess("Obavijest uspješno uklonjena!");
        } catch (error) {
            notifyError("Neuspješno uklanjanje obavijesti!");
            console.error("Pogreška prilikom uklanjanja obavijesti:", error);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <Tooltip
                showArrow
                closeDelay={0}
                className="text-black font-medium"
                content={isAlerted ? "Ukloni obavijest" : "Postavi obavijest"}
                color={isAlerted ? "warning" : "foreground"}
            >
                <Button
                    isIconOnly
                    variant="light"
                    aria-label="Notification"
                    {...(isAlerted
                        ? { color: "warning", onClick: handleDeleteAlert }
                        : {
                              color: "foreground",
                              onClick: onOpen,
                          })}
                >
                    <NotificationIcon filled />
                </Button>
            </Tooltip>
            <PriceModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleOkClick={handleOkClick}
                price={price}
                setPrice={setPrice}
            />
            <Toast />
        </div>
    );
}
