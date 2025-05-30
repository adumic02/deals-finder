import { NextResponse } from "next/server";
import { UserBadgesDAO } from "@models/UserBadgesDAO";
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
        const userBadgesDAO = new UserBadgesDAO();
        const userID = params.userID;

        if (session.user.id != userID && session.user.role != "admin") {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        const userBadges = await userBadgesDAO.getUserBadges(userID);

        return NextResponse.json(userBadges, { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom dohvaćanja značaka korisnika:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćanja značaka korisnika!",
            },
            { status: 500 }
        );
    }
}
