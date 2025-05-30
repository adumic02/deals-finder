import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

export default function ConfirmRemoveModal({
    isOpen,
    onOpenChange,
    handleOkClick,
    target,
}) {
    const handleContent = () => {
        switch (target) {
            case "comments":
                return (
                    <ModalBody className="flex flex-col">
                        <p className="text-foreground font-normal">
                            Jeste li sigurni da želite ukloniti komentar?
                        </p>
                    </ModalBody>
                );
            case "wishlist":
                return (
                    <ModalBody className="flex flex-col">
                        <p className="text-foreground font-normal">
                            Jeste li sigurni da želite ukloniti videoigru sa
                            liste želja?
                        </p>
                        <p className="text-foreground font-medium">
                            Ukoliko ste postavili obavijest za ovu videoigru,
                            ona će također biti uklonjena.
                        </p>
                    </ModalBody>
                );
            default:
                return;
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="flex justify-center max-w-fit"
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col">
                        <p className="text-danger">Potvrda</p>
                    </ModalHeader>
                    {handleContent()}
                    <ModalFooter>
                        <Button
                            className="justify-self-end"
                            color="danger"
                            onPress={handleOkClick}
                        >
                            <p className="text-foreground-50 font-medium">
                                Ukloni
                            </p>
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
