import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
} from "@nextui-org/react";

const StoresModal = ({
    isOpen,
    onOpenChange,
    stores,
    selectedStores,
    handleCheckboxChange,
    handleOkClick,
    handleUncheckAll,
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="m-5">
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    <p className="text-white">Odabir platformi</p>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-3">
                        {stores.map(
                            (store) =>
                                store.isActive == 1 && (
                                    <Checkbox
                                        key={store.storeID}
                                        isSelected={selectedStores.has(
                                            store.storeID
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(store.storeID)
                                        }
                                    >
                                        {store.storeName}
                                    </Checkbox>
                                )
                        )}
                    </div>
                </ModalBody>
                <ModalFooter className="grid grid-cols-2">
                    <div>
                        <Button
                            color="danger"
                            variant="light"
                            onClick={handleUncheckAll}
                        >
                            Ukloni odabir
                        </Button>
                    </div>

                    <Button
                        className="justify-self-end"
                        color="primary"
                        onPress={handleOkClick}
                    >
                        <p className="text-black font-medium">U redu</p>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StoresModal;
