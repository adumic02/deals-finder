import { NextResponse } from "next/server";
import { UserBadgesDAO } from "@models/UserBadgesDAO";
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
        const userBadgesDAO = new UserBadgesDAO();
        const { badgeID, userID } = await req.json();
        const missingField = !badgeID
            ? "ID značke nije definiran!"
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

        await userBadgesDAO.addUserBadge(userID, badgeID);

        return NextResponse.json(
            { message: "Značka uspješno dodana korisniku!" },
            { status: 200 }
        );
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json(
                { message: "Značka je već dodana korisniku!" },
                { status: 200 }
            );
        } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return NextResponse.json(
                { message: "Korisnik i/ili značka ne postoji!" },
                { status: 400 }
            );
        }

        console.error(
            "Interna pogreška prilikom dodavanja značke korisnika:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dodavanja značke korisnika!",
            },
            { status: 500 }
        );
    }
}
