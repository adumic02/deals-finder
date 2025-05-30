"use client";

import React, { useState, useEffect } from "react";
import BadgeCard from "@components/Badges/BadgeCard";
import {
    getBadges,
    getCommentsNumberByUserId,
    getWishlistNumberByUserId,
    getUserBadges,
} from "@utils/fetchManager";
import { useSession } from "next-auth/react";
import withAuth from "@libs/withAuth";

const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [userBadges, setUserBadges] = useState([]);
    const [userProgress, setUserProgress] = useState({
        comments: 0,
        wishlist: 0,
    });
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const [
                        badgeData,
                        commentsNumber,
                        wishlistNumber,
                        fetchedUserBadges,
                    ] = await Promise.all([
                        getBadges(),
                        getCommentsNumberByUserId(session.user.id),
                        getWishlistNumberByUserId(session.user.id),
                        getUserBadges(session.user.id),
                    ]);

                    const userProgressData = {
                        comments: commentsNumber.comments_number,
                        wishlist: wishlistNumber.wishlist_number,
                    };

                    setBadges(badgeData);
                    setUserProgress(userProgressData);
                    setUserBadges(fetchedUserBadges);
                } catch (error) {
                    console.error("Dohvaćanje podataka neuspješno:", error);
                }
            }
        };

        fetchData();
    }, [session]);

    return (
        <div className="flex justify-center items-center">
            <div className="grid gap-5 w-2/3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {badges.map((badge) => (
                    <BadgeCard
                        key={badge.ID}
                        badge={badge}
                        userProgress={userProgress}
                        userBadges={userBadges}
                        userId={session.user.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default withAuth(Badges);
