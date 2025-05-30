import { NextResponse } from "next/server";
import { NotificationDAO } from "@models/NotificationDAO";
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
        const notificationDAO = new NotificationDAO();

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

        const isAlerted = await notificationDAO.checkNotification(
            gameID,
            userID
        );

        return NextResponse.json({ isAlerted }, { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom provjere statusa obavijesti za videoigru:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom provjere statusa obavijesti za videoigru!",
            },
            { status: 500 }
        );
    }
}
