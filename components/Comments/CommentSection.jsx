import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import CommentCard from "@components/Comments/CommentCard";
import React, { useState, useEffect } from "react";
import CommentInput from "@components/Comments/CommentInput";
import { useSession } from "next-auth/react";
import { getComments } from "@utils/fetchManager";

export default function CommentSection({ gameID }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsData = await getComments(gameID);
                if (commentsData) {
                    setComments(commentsData);
                }
            } catch (error) {
                console.error("Dohvaćanje podataka neuspješno:", error);
            }
        };

        fetchData();
    }, [gameID]);

    return (
        <Card className="w-full flex flex-col p-5 h-full">
            <CardHeader className="flex justify-center">
                <h2 className="font-semibold text-lg">KOMENTARI I OCJENE</h2>
            </CardHeader>
            <div className="mb-5">
                <Divider />
            </div>
            <CardBody className="gap-5">
                {session ? (
                    <CommentInput gameID={gameID} setComments={setComments} />
                ) : (
                    <p className="text-medium text-center">
                        Morate biti prijavljeni kako biste postavili komentar i
                        ocjenu!
                    </p>
                )}

                {comments.length > 0 ? (
                    <div className="w-full space-y-5 flex flex-col justify-center text-center">
                        {comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                setComments={setComments}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-medium text-center">
                        Trenutno nema komentara i ocjena za ovu videoigru!
                    </p>
                )}
            </CardBody>
        </Card>
    );
}
