import React, { useCallback } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Tooltip,
    Chip,
    Tabs,
    Tab,
} from "@nextui-org/react";
import staticValues from "@helpers/StaticValues";
import BuyNowButton from "@components/BuyNowButton";
import WishlistButton from "@components/Wishlist/WishlistButton";

const DealDetailsCard = ({
    selectedDeal,
    gameInfo,
    cheapestPrice,
    convertPriceWithSymbol,
}) => {
    const { statusColorMap } = staticValues;

    const renderPriceInfo = useCallback(
        (selectedDeal) => {
            if (
                parseFloat(selectedDeal.salePrice) <
                parseFloat(selectedDeal.normalPrice)
            ) {
                return (
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <div>
                            <span className="text-primary font-semibold">
                                {convertPriceWithSymbol(selectedDeal.salePrice)}
                            </span>
                        </div>
                        <div>
                            <span className="line-through text-gray-400">
                                {convertPriceWithSymbol(
                                    selectedDeal.normalPrice
                                )}
                            </span>
                        </div>
                        <div className="justify-self-end">
                            <Chip
                                variant="flat"
                                className="text-primary font-semibold"
                            >
                                - {parseFloat(selectedDeal.savings).toFixed()} %
                            </Chip>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <p>
                            ${parseFloat(selectedDeal.normalPrice).toFixed(2)}
                        </p>
                    </div>
                );
            }
        },
        [convertPriceWithSymbol]
    );

    const handleGameRating = useCallback(() => {
        const statusValue =
            statusColorMap.find(
                (item) => item.status === selectedDeal.steamRatingText
            ) || {};
        const translationValue =
            statusValue.translation || selectedDeal.steamRatingText || null;
        const classValue = statusValue.class || "bg-default";

        return (
            translationValue !== null && (
                <Chip className={classValue} size="sm" variant="flat">
                    {translationValue}
                </Chip>
            )
        );
    }, [statusColorMap, selectedDeal]);

    return (
        <div className="w-full md:mx-auto lg:flex-row lg:w-full lg:flex lg:justify-center lg:space-x-5 lg:h-52">
            {/* Informacije o videoigri */}
            <Card className="p-3 lg:w-[55%] xl:w-[60%]">
                <CardBody className="flex items-center flex-row gap-4">
                    <div className="flex items-center">
                        <Image
                            alt={selectedDeal.title}
                            src={selectedDeal.thumb}
                            width={100}
                        />
                    </div>

                    <div className="ml-4">
                        <span className="w-52">{selectedDeal.title}</span>

                        <div className="flex flex-col gap-3 mt-3">
                            {handleGameRating()}
                            {gameInfo.publisher != "N/A" && (
                                <Chip variant="flat">
                                    Izdavač: {gameInfo.publisher}
                                </Chip>
                            )}
                            {gameInfo.releaseDate > 0 && (
                                <Chip variant="flat">
                                    Izlazak:{" "}
                                    {new Date(
                                        gameInfo.releaseDate * 1000
                                    ).toLocaleDateString("hr-HR")}
                                </Chip>
                            )}
                        </div>
                    </div>
                    <div className="ml-auto">
                        <WishlistButton gameID={gameInfo.gameID} />
                    </div>
                </CardBody>
            </Card>

            <div className="hidden lg:flex">
                <Divider orientation="vertical" />
            </div>

            {/* Cijene */}
            <Card className="mt-5 p-3 flex flex-col h-52 lg:w-[45%] lg:mt-0 xl:w-[40%]">
                <Tabs
                    variant="underlined"
                    color="primary"
                    className="justify-center"
                >
                    <Tab key="dealInfo" title="Trenutna ponuda">
                        <CardBody>
                            <div className="flex flex-row gap-5 justify-center items-center">
                                <Tooltip
                                    showArrow
                                    color="foreground"
                                    closeDelay={0}
                                    content={selectedDeal.store.name}
                                    className="font-medium"
                                >
                                    <Image
                                        alt={selectedDeal.store.name}
                                        width={50}
                                        src={
                                            "https://www.cheapshark.com" +
                                            selectedDeal.store.logo
                                        }
                                    />
                                </Tooltip>

                                {renderPriceInfo(selectedDeal)}
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-8 items-center">
                            <Chip variant="flat">
                                Ocjena ponude: {selectedDeal.dealRating}
                            </Chip>

                            <BuyNowButton deal={selectedDeal.dealID} />
                        </CardFooter>
                    </Tab>

                    <Tab key="cheapestPrice" title="Najniža cijena ikad">
                        <CardBody className="pt-7">
                            {cheapestPrice &&
                            cheapestPrice.price &&
                            cheapestPrice.date ? (
                                <div className="flex flex-row gap-3">
                                    <Card className="w-1/2 h-full bg-content2">
                                        <CardBody className="flex flex-col text-center items-center">
                                            <span>Cijena:</span>
                                            {convertPriceWithSymbol(
                                                cheapestPrice.price
                                            )}
                                        </CardBody>
                                    </Card>
                                    <Card className="w-1/2 h-full bg-content2">
                                        <CardBody className="flex flex-col text-center items-center">
                                            <span>Datum:</span>
                                            {new Date(
                                                cheapestPrice.date * 1000
                                            ).toLocaleDateString("hr-HR")}
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                <p className="text-center">
                                    Nema podataka o najnižoj cijeni.
                                </p>
                            )}
                        </CardBody>
                    </Tab>
                </Tabs>
            </Card>
        </div>
    );
};

export default DealDetailsCard;
