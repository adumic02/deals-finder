"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Image,
} from "@nextui-org/react";
import ProgressBar from "@components/Badges/ProgressBar";
import { addUserBadge } from "@utils/fetchManager";

export default function BadgeCard({ badge, userProgress, userBadges, userId }) {
    const [achieved, setAchieved] = useState(false);
    const badgeMaxValue = badge.max_value;
    const progressValue = achieved
        ? badgeMaxValue
        : Math.min(userProgress[badge.type], badgeMaxValue);
    const isBadgeAdded = useRef(false);

    useEffect(() => {
        const checkAndAddBadge = async () => {
            const isAchieved = userBadges.some(
                (userBadge) => userBadge.badge_ID === badge.ID
            );

            setAchieved(isAchieved);

            if (
                !isAchieved &&
                !isBadgeAdded.current &&
                progressValue >= badgeMaxValue
            ) {
                try {
                    await addUserBadge(userId, badge.ID);
                    setAchieved(true);
                    isBadgeAdded.current = true;
                } catch (error) {
                    console.error(
                        `Neuspješno dodavanje značke ID-a: ${badge.ID} korisniku ID-a: ${userId}!`,
                        error
                    );
                }
            }
        };

        checkAndAddBadge();
    }, [badge, progressValue, badgeMaxValue, userBadges, userId]);

    return (
        <Card
            className={
                ("p-4 flex flex-col items-center",
                achieved ? "" : "grayscale bg-transparent")
            }
        >
            <CardHeader className="flex justify-center">
                <Image alt={badge.title} src={badge.picture} />
            </CardHeader>
            <div className="py-3"></div>
            <CardBody className="flex flex-col items-center space-y-5 text-center">
                <h1 className="font-semibold text-xl">{badge.title}</h1>
                <p>{badge.description}</p>
            </CardBody>
            <div className="py-3"></div>
            <CardFooter className="flex justify-between">
                <ProgressBar value={progressValue} maxValue={badgeMaxValue} />
            </CardFooter>
        </Card>
    );
}
