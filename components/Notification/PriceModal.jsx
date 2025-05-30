import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";

export default function PriceModal({
    isOpen,
    onOpenChange,
    handleOkClick,
    price,
    setPrice,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="flex justify-center max-w-fit"
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col">
                        <p className="text-foreground">
                            Unesite najnižu cijenu
                        </p>
                    </ModalHeader>
                    <ModalBody className="flex flex-col">
                        <Input
                            type="number"
                            placeholder="0.00"
                            labelPlacement="outside-left"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">
                                        $
                                    </span>
                                </div>
                            }
                            value={price}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value >= 0 || e.target.value === "") {
                                    setPrice(e.target.value);
                                }
                            }}
                        />
                        <p className="text-foreground font-medium text-center">
                            Cijena mora biti u dolarima.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="justify-self-end"
                            color="primary"
                            onPress={handleOkClick}
                        >
                            <p className="text-black font-medium">
                                Postavi obavijest
                            </p>
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
