import React from "react";
import WishlistButton from "@components/Wishlist/WishlistButton";
import { Card, CardBody, Image } from "@nextui-org/react";

export default function GameCard({ gameInfo, gameID }) {
    return (
        <div className="flex justify-center">
            <Card className="w-full p-5 sm:w-3/4">
                <CardBody className="flex sm:grid sm:grid-cols-3 items-center gap-5">
                    <Image
                        alt={gameInfo.title}
                        src={gameInfo.thumb}
                        className=" justify-start"
                        width={200}
                    />

                    <h1 className="font-semibold text-lg text-center justify-center">
                        {gameInfo.title}
                    </h1>

                    <div className="sm:grid sm:justify-end">
                        <WishlistButton gameID={gameID} />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
