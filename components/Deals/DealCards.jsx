import React, { useCallback } from "react";
import {
    Card,
    CardBody,
    Image,
    Button,
    Chip,
    Tooltip,
    Spinner,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import { DetailsIcon } from "@public/icons/DetailsIcon";
import { useRouter } from "next/navigation";
import BuyNowButton from "@components/BuyNowButton";
import staticValues from "@helpers/StaticValues";

const DealCards = ({
    deals,
    stores,
    topContent,
    bottomContent,
    loading,
    convertPriceWithSymbol,
}) => {
    const router = useRouter();
    const statusColorMap = staticValues.statusColorMap;

    const handleDetailsClick = useCallback(
        (dealID, deal, store) => {
            const dealWithStore = {
                ...deal,
                store: {
                    name: store.name,
                    logo: store.logo,
                    banner: store.banner,
                    icon: store.icon,
                },
            };
            localStorage.setItem("selectedDeal", JSON.stringify(dealWithStore));
            router.push(`/deals/${dealID}`);
        },
        [router]
    );

    const renderCard = useCallback(
        (deal) => {
            const store = stores[deal.storeID];
            const salePrice = convertPriceWithSymbol(deal.salePrice);
            const normalPrice = convertPriceWithSymbol(deal.normalPrice);

            const statusValue =
                statusColorMap.find(
                    (item) => item.status === deal.steamRatingText
                ) || {};
            const translationValue =
                statusValue.translation || deal.steamRatingText || null;
            const classValue = statusValue.class || "bg-content2";

            return (
                <div key={deal.dealID} className="w-full md:px-20 lg:px-36">
                    <Card className="p-3">
                        <CardBody className="flex items-center flex-row gap-4">
                            <div className="flex items-center h-[130px]">
                                <Image
                                    alt={deal.title}
                                    src={deal.thumb}
                                    width={100}
                                />
                            </div>

                            <div className="ml-4 xl:grid xl:items-center xl:gap-16 xl:grid-cols-3">
                                <span className="w-52">{deal.title}</span>

                                <div className="flex flex-col gap-3">
                                    <div className="mt-3 xl:mt-0">
                                        <span className="text-primary font-semibold">
                                            {salePrice}
                                        </span>

                                        <span className="ml-4 line-through text-gray-400">
                                            {normalPrice}
                                        </span>
                                    </div>

                                    <Chip
                                        size="md"
                                        variant="flat"
                                        className="text-primary font-semibold"
                                    >
                                        - {parseFloat(deal.savings).toFixed()}%
                                    </Chip>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="mt-3 xl:mt-0">
                                        <Chip size="md" variant="flat">
                                            Ocjena ponude:{" "}
                                            {parseFloat(
                                                deal.dealRating
                                            ).toFixed()}
                                        </Chip>
                                    </div>

                                    {translationValue !== null && (
                                        <div>
                                            <Chip
                                                size="md"
                                                variant="flat"
                                                className={classValue}
                                            >
                                                {translationValue}
                                            </Chip>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="ml-auto">
                                <Tooltip
                                    color="primary"
                                    className="text-black font-medium"
                                    showArrow
                                    closeDelay={0}
                                    content={"Detalji ponude"}
                                >
                                    <Button
                                        onClick={() =>
                                            handleDetailsClick(
                                                deal.dealID,
                                                deal,
                                                store
                                            )
                                        }
                                        isIconOnly
                                        color="primary"
                                        variant="light"
                                    >
                                        <DetailsIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        </CardBody>
                        <div className="py-4">
                            <Divider />
                        </div>
                        <CardFooter className="flex justify-between">
                            <Tooltip
                                color="foreground"
                                showArrow
                                closeDelay={0}
                                content={store.name}
                                className="font-medium"
                            >
                                <Image
                                    width={50}
                                    height={50}
                                    alt={store.name}
                                    src={
                                        "https://www.cheapshark.com" +
                                        store.logo
                                    }
                                />
                            </Tooltip>
                            <BuyNowButton deal={deal.dealID} />
                        </CardFooter>
                    </Card>
                </div>
            );
        },
        [stores, statusColorMap, handleDetailsClick, convertPriceWithSymbol]
    );

    const renderEmptyContent = useCallback(() => {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner size="md" color="primary" />
            </div>
        );
    }, []);

    return (
        <div>
            {topContent}
            <div className="flex flex-col gap-3 py-10 items-center text-center">
                {loading
                    ? renderEmptyContent()
                    : deals.length === 0
                    ? "Nema rezultata!"
                    : deals.map((deal) => renderCard(deal))}
            </div>
            {bottomContent}
        </div>
    );
};

export default DealCards;
