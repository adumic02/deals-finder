import { NextResponse } from "next/server";
import { NotificationDAO } from "@models/NotificationDAO";
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
        const notificationDAO = new NotificationDAO();
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

        await notificationDAO.deleteNotification(gameID, userID);

        return NextResponse.json(
            { message: "Obavijest uklonjena!" },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Interna pogreška prilikom uklanjanja obavijesti:",
            error
        );
        return NextResponse.json(
            { error: "Interna pogreška prilikom uklanjanja obavijesti!" },
            { status: 500 }
        );
    }
}
