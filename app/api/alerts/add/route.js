import { NextResponse } from "next/server";
import { NotificationDAO } from "@models/NotificationDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const notificationDAO = new NotificationDAO();

        const notificationData = await req.json();
        const missingField = !notificationData.price
            ? "Željena cijena nije definirana!"
            : !notificationData.user_id
            ? "ID korisnika nije definiran!"
            : !notificationData.game_id
            ? "ID videoigre nije definiran!"
            : null;

        if (
            notificationData.user_id != session.user.id &&
            session.user.role != "admin"
        ) {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        await notificationDAO.addNotification(notificationData);

        return NextResponse.json(
            { message: "Obavijest o videoigri dodana!" },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json(
                { message: "Obavijest o videoigri je već dodana!" },
                { status: 200 }
            );
        } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return NextResponse.json(
                { message: "Korisnik i/ili videoigra ne postoji!" },
                { status: 400 }
            );
        }

        console.error("Interna pogreška prilikom dodavanja obavijesti:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom dodavanja obavijesti!" },
            { status: 500 }
        );
    }
}
