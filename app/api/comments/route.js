import { NextResponse } from "next/server";
import { CommentDAO } from "@models/CommentDAO";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    try {
        const commentDAO = new CommentDAO();
        const gameID = searchParams.get("gameID");

        if (!gameID) {
            return NextResponse.json(
                {
                    error: "ID videoigre nije definiran!",
                },
                { status: 400 }
            );
        }

        const comments = await commentDAO.getComments(gameID);

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error("Interna pogreška prilikom dohvaćana komentara:", error);
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćana komentara videoigre!",
            },
            { status: 500 }
        );
    }
}
