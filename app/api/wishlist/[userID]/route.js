import { NextResponse } from "next/server";
import { WishlistDAO } from "@models/WishlistDAO";
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
        const wishlistDAO = new WishlistDAO();
        const userID = params.userID;

        if (session.user.id != userID && session.user.role != "admin") {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (!userID) {
            return NextResponse.json(
                {
                    error: "ID korisnika nije definiran!",
                },
                { status: 400 }
            );
        }

        const wishlistedGames = await wishlistDAO.getWishlist(userID);

        return NextResponse.json(wishlistedGames, { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom dohvaćana videoigara na listi želja:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćana videoigara na listi želja!",
            },
            { status: 500 }
        );
    }
}
