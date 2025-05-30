import { NextResponse } from "next/server";
import { CommentDAO } from "@models/CommentDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const userID = params.userID;
        const commentDAO = new CommentDAO();

        if (session.user.id != userID && session.user.role != "admin") {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (!userID) {
            return NextResponse.json(
                { error: "ID korisnika nije definiran!" },
                { status: 400 }
            );
        }

        const commentsNumber = await commentDAO.getCommentsNumberByUserId(
            userID
        );

        return NextResponse.json(commentsNumber[0], { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom dohvaćanja podataka komentara:",
            error
        );
        return NextResponse.json(
            { error: "Interna pogreška prilikom dohvaćanja komentara!" },
            { status: 500 }
        );
    }
}
