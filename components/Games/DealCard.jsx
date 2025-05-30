import React, { useCallback } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Divider,
    Chip,
    CardFooter,
} from "@nextui-org/react";
import BuyNowButton from "@components/BuyNowButton";

const DealCard = ({ deal, store, convertPriceWithSymbol }) => {
    const renderData = useCallback(
        (deal) => {
            if (parseFloat(deal.price) < parseFloat(deal.retailPrice)) {
                return (
                    <div className="grid grid-cols-3">
                        <div>
                            <span className="text-primary font-semibold">
                                {convertPriceWithSymbol(deal.price)}
                            </span>
                        </div>
                        <div>
                            <span className="line-through text-gray-400">
                                {convertPriceWithSymbol(deal.retailPrice)}
                            </span>
                        </div>
                        <div className="justify-self-end">
                            <Chip
                                variant="flat"
                                className="text-primary font-semibold"
                            >
                                - {parseFloat(deal.savings).toFixed()} %
                            </Chip>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid grid-cols-2">
                        <p>{convertPriceWithSymbol(deal.retailPrice)}</p>
                    </div>
                );
            }
        },
        [convertPriceWithSymbol]
    );

    return (
        <Card className="p-3">
            <CardHeader className="grid grid-cols-3">
                <Image
                    alt={store.name}
                    src={"https://www.cheapshark.com" + store.logo}
                    width={50}
                />
                <h1 className="col-span-2">{store.name}</h1>
            </CardHeader>
            <div className="py-3">
                <Divider />
            </div>
            <CardBody>{renderData(deal)}</CardBody>
            <div className="py-3">
                <Divider />
            </div>
            <CardFooter className="flex justify-end">
                <BuyNowButton className="justify-start" deal={deal.dealID} />
            </CardFooter>
        </Card>
    );
};

export default DealCard;
