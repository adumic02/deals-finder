import { NextResponse } from "next/server";
import { BadgeDAO } from "@models/BadgeDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const badgeDAO = new BadgeDAO();
        const badges = await badgeDAO.getBadges();

        return NextResponse.json(badges, { status: 200 });
    } catch (error) {
        console.error("Interna pogreška prilikom dohvaćanja značaka:", error);
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćanja značaka!",
            },
            { status: 500 }
        );
    }
}
