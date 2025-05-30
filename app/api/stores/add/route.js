import { NextResponse } from "next/server";
import { StoreDAO } from "@models/StoreDAO";
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
        const storeDAO = new StoreDAO();
        const { storeID, storeData } = await req.json();
        const missingField = !storeID
            ? "ID platforme nije definiran!"
            : !storeData.name
            ? "Naziv platforme nije definiran!"
            : !storeData.logo
            ? "Logo platforme nije definiran!"
            : !storeData.banner
            ? "Banner platforme nije definiran!"
            : !storeData.icon
            ? "Ikona platforme nije definirana!"
            : null;

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        await storeDAO.addStore(storeID, storeData);

        return NextResponse.json(
            { message: "Platforma uspješno dodana!" },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return NextResponse.json(
                { message: "Platforma je već dodana!" },
                { status: 200 }
            );
        }

        console.error("Interna pogreška prilikom dodavanja platforme:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom dodavanja platforme!" },
            { status: 500 }
        );
    }
}
