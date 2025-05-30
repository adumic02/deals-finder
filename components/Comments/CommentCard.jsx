import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
} from "@nextui-org/react";
import ReactStars from "react-rating-stars-component";
import RemoveButton from "@components/Comments/RemoveButton";
import { useSession } from "next-auth/react";

export default function CommentCard({ comment, setComments }) {
    const { data: session } = useSession();

    return (
        <Card className="w-full">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar
                        isBordered
                        color="primary"
                        radius="full"
                        size="md"
                        src={comment.picture}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="font-semibold text-foreground">
                            {comment.username}
                        </h4>
                    </div>
                </div>
                <div className="text-sm">
                    {new Date(comment.date).toLocaleDateString("hr-HR")}
                </div>
            </CardHeader>
            <CardBody className="p-3 text-medium text-foreground">
                <p>{comment.text}</p>
            </CardBody>
            <CardFooter className="flex gap-3 items-center">
                <div className="flex gap-1">
                    <p className="text-sm text-foreground">Rating:</p>
                </div>
                <ReactStars
                    count={5}
                    value={comment.rating}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                />
                <span className="text-sm text-foreground">
                    {comment.rating} / 5
                </span>
                <div className="ml-auto">
                    {}
                    {session &&
                        (session.user.role === "admin" ||
                            session.user.id === comment.user_id) && (
                            <RemoveButton
                                commentID={comment.id}
                                setComments={setComments}
                                gameID={comment.game_id}
                                userID={comment.user_id}
                            />
                        )}
                </div>
            </CardFooter>
        </Card>
    );
}
