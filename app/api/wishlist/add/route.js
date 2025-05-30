import { NextResponse } from "next/server";
import { WishlistDAO } from "@models/WishlistDAO";
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
        const wishlistDAO = new WishlistDAO();
        const { gameID, userID } = await req.json();
        const missingField = !gameID
            ? "ID videoigre nije definiran!"
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

        await wishlistDAO.addToWishlist(gameID, userID);

        return NextResponse.json(
            { message: "Videoigra dodana na listu želja!" },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json(
                { message: "Videoigra je već dodana na listu želja!" },
                { status: 200 }
            );
        } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return NextResponse.json(
                { message: "Videoigra i/ili korisnik ne postoji!" },
                { status: 400 }
            );
        }

        console.error("Interna pogreška prilikom dodavanja videoigre:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom dodavanja videoigre!" },
            { status: 500 }
        );
    }
}
