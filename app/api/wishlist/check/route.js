import { NextResponse } from "next/server";
import { WishlistDAO } from "@models/WishlistDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const wishlistDAO = new WishlistDAO();
        const { gameID, userID } = Object.fromEntries(searchParams);

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

        const isWishlisted = await wishlistDAO.checkWishlist(gameID, userID);
        return NextResponse.json({ isWishlisted }, { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom provjere statusa igre za listu želja korisnika:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom provjere statusa igre za listu želja korisnika!",
            },
            { status: 500 }
        );
    }
}
