import { NextResponse } from "next/server";
import { CommentDAO } from "@models/CommentDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const commentDAO = new CommentDAO();
        const { commentID, userID } = await req.json();
        const missingField = !commentID
            ? "ID komentara nije definiran!"
            : !userID
            ? "ID korisnika nije definiran!"
            : null;

        if (session.user.id != userID && session.user.role != "admin") {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        await commentDAO.removeComment(commentID, userID);

        return NextResponse.json(
            { message: "Komentar uspješno uklonjen!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Interna pogreška prilikom brisanja komentara:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom brisanja komentara!" },
            { status: 500 }
        );
    }
}
