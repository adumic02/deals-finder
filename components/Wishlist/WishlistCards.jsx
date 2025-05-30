import React, { useCallback } from "react";
import {
    Card,
    CardBody,
    Image,
    Chip,
    Tooltip,
    Spinner,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import BuyNowButton from "@components/BuyNowButton";
import NotificationButton from "@components/Notification/NotificationButton";
import RemoveButton from "@components/Wishlist/RemoveButton";

const WishlistCards = ({ wishlistedGames, loading, onWishlistChange }) => {
    const renderCard = useCallback(
        (game) => {
            return (
                <div key={game.id} className="w-full md:px-20 lg:px-36">
                    <Card className="p-3">
                        <CardBody className="flex items-center flex-row gap-4">
                            <div className="flex items-center h-[130px]">
                                <Image
                                    alt={game.title}
                                    src={game.thumb}
                                    width={100}
                                />
                            </div>

                            <div className="ml-4 xl:grid xl:items-center xl:gap-16 xl:grid-cols-2">
                                <span className="w-52">{game.title}</span>

                                <div className="flex flex-col gap-3">
                                    <div className="mt-3 xl:mt-0">
                                        <span className="text-primary font-semibold">
                                            {game.sale_price}
                                        </span>

                                        <span className="ml-4 line-through text-gray-400">
                                            {game.normal_price}
                                        </span>
                                    </div>

                                    <Chip
                                        size="md"
                                        variant="flat"
                                        className="text-primary font-semibold"
                                    >
                                        - {parseFloat(game.savings).toFixed()}%
                                    </Chip>
                                </div>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <NotificationButton gameID={game.id} />
                                <RemoveButton
                                    gameID={game.id}
                                    onWishlistChange={onWishlistChange}
                                />
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
                                content={game.name}
                                className="font-medium"
                            >
                                <Image
                                    width={50}
                                    height={50}
                                    alt={game.name}
                                    src={
                                        "https://www.cheapshark.com" + game.logo
                                    }
                                />
                            </Tooltip>
                            <BuyNowButton deal={game.deal_id} />
                        </CardFooter>
                    </Card>
                </div>
            );
        },
        [onWishlistChange]
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
            <div className="flex flex-col gap-3 py-10 items-center text-center">
                {loading
                    ? renderEmptyContent()
                    : wishlistedGames.length === 0
                    ? "Nemate videoigra na listi želja!"
                    : wishlistedGames.map((game) => renderCard(game))}
            </div>
        </div>
    );
};

export default WishlistCards;
