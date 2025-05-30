import { NextResponse } from "next/server";
import { CommentDAO } from "@models/CommentDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const commentDAO = new CommentDAO();
        const commentData = await req.json();
        const missingField = !commentData.text
            ? "Tekst komentara nije definiran!"
            : !commentData.rating
            ? "Ocjena videoigre nije definirana!"
            : !commentData.date
            ? "Datum postavljanja komentara nije definiran!"
            : !commentData.gameID
            ? "ID videoigre nije definiran!"
            : !commentData.userID
            ? "ID korisnika nije definiran!"
            : null;

        if (commentData.userID != session.user.id) {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        await commentDAO.addComment(commentData);

        return NextResponse.json(
            { message: "Komentar uspješno dodan!" },
            { status: 201 }
        );
    } catch (error) {
        const errorCode =
            error.code === "ER_DUP_ENTRY"
                ? "Komentar je već dodan!"
                : error.code === "ER_TRUNCATED_WRONG_VALUE"
                ? "Vrijednost nekog polja nije valjana!"
                : error.code === "ER_NO_REFERENCED_ROW_2"
                ? "ID videoigre ne postoji!"
                : null;

        if (errorCode) {
            return NextResponse.json({ error: errorCode }, { status: 400 });
        }

        console.error("Interna pogreška prilikom dodavanja komentara:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom dodavanja komentara!" },
            { status: 500 }
        );
    }
}
