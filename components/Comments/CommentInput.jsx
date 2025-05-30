import React, { useState, useEffect } from "react";
import { Button, Textarea } from "@nextui-org/react";
import ReactStars from "react-rating-stars-component";
import { useSession } from "next-auth/react";
import {
    addComment,
    getGames,
    getStores,
    fetchGameID,
    addGame,
    addStore,
    getComments,
} from "@utils/fetchManager";
import Toast, { notifyError, notifySuccess } from "@components/Toast";

export default function CommentInput({ gameID, setComments }) {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const [existingGames, setExistingGames] = useState([]);
    const [existingStores, setExistingStores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const games = await getGames();
                const stores = await getStores();

                setExistingGames(games);
                setExistingStores(stores);
            } catch (error) {
                console.error(
                    "Pogreška prilikom dohvaćanja podataka o videoigrama i platformama iz baze:",
                    error
                );
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!rating) {
            notifyError("Niste unijeli ocjenu!");
        } else if (!message) {
            notifyError("Niste unijeli komentar!");
        } else {
            const dateNow = new Date().toISOString().slice(0, 10);
            try {
                const gameExists = existingGames.some(
                    (game) => game.ID === Number(gameID)
                );

                if (!gameExists) {
                    const gameData = await fetchGameID(gameID);
                    const storesData = JSON.parse(
                        localStorage.getItem("stores")
                    );

                    const storeID = gameData.deals[0].storeID;
                    const storeData = storesData[storeID];

                    const storeExists = existingStores.some(
                        (store) => store.id === storeID
                    );

                    if (!storeExists) {
                        await addStore(storeID, storeData);
                    }

                    await addGame(gameID, gameData);
                }

                const commentData = {
                    text: message,
                    rating,
                    date: dateNow,
                    gameID,
                    userID: session.user.id,
                };

                await addComment(commentData);
                const updatedComments = await getComments(gameID);

                setComments(updatedComments);
                setMessage("");
                notifySuccess("Komentar uspješno dodan!");
            } catch (error) {
                console.error(
                    "Pogreška prilikom objavljivanja komentara i ocjene videoigre:",
                    error
                );
            }
        }
    };

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center self-start">
                <span className="text-foreground mr-2">Ocjena: </span>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                    value={rating}
                />
            </div>
            <Textarea
                placeholder="Komentar (max. 500 znakova) ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                className="w-full"
            />
            <Button
                className="w-fit self-end"
                variant="flat"
                color="primary"
                onClick={handleSubmit}
            >
                Objavi
            </Button>
            <Toast />
        </div>
    );
}
