import React, { useCallback } from "react";
import { Card, CardBody, CardHeader, Image, Divider } from "@nextui-org/react";
import BuyNowButton from "@components/BuyNowButton";

const CheaperStoresCards = ({ cheaperStores, convertPriceWithSymbol }) => {
    const stores = JSON.parse(localStorage.getItem("stores"));

    const renderCard = useCallback(
        (deal) => {
            const store = stores[deal.storeID];
            const salePrice = convertPriceWithSymbol(deal.salePrice);
            const retailPrice = convertPriceWithSymbol(deal.retailPrice);

            return (
                <Card key={deal.dealID} className=" p-3 mb-5">
                    <CardBody className="flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <Image
                                width={50}
                                height={50}
                                alt={store.name}
                                src={"https://www.cheapshark.com" + store.logo}
                            />

                            <div>
                                <h2 className="font-semibold">{store.name}</h2>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex gap-3">
                                <span className="text-primary font-semibold">
                                    {salePrice}
                                </span>

                                {parseFloat(deal.salePrice) <
                                    parseFloat(deal.retailPrice) && (
                                    <span className="line-through text-gray-400">
                                        {retailPrice}
                                    </span>
                                )}
                            </div>
                            <div className="ml-auto">
                                <BuyNowButton deal={deal.dealID} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
        },
        [stores, convertPriceWithSymbol]
    );

    return (
        <Card className="p-5 min-h-[350px]">
            <CardHeader className="flex justify-center">
                <h1 className="font-semibold text-lg">JEFTINIJE PLATFORME</h1>
            </CardHeader>
            <Divider className="mb-5" />
            <CardBody>
                {cheaperStores.length === 0 ? (
                    <p className="text-center">
                        Nema ponuda na drugim platformama!
                    </p>
                ) : (
                    cheaperStores.map((deal) => renderCard(deal))
                )}
            </CardBody>
        </Card>
    );
};

export default CheaperStoresCards;
