import { NextResponse } from "next/server";
import { GameDAO } from "@models/GameDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function PUT(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const { gameID, gameData } = await req.json();
        const gameDAO = new GameDAO();
        const missingField = !gameID
            ? "ID videoigre nije definiran!"
            : !gameData.info.title
            ? "Naziv videoigre nije definiran!"
            : !gameData.info.thumb
            ? "Slika videoigre nije definirana!"
            : !gameData.deals[0].storeID
            ? "ID platforme nije definiran!"
            : !gameData.deals[0].dealID
            ? "ID ponude nije definiran!"
            : !gameData.deals[0].price
            ? "Snižena cijena videoigre nije definirana!"
            : !gameData.deals[0].retailPrice
            ? "Originalna cijena videoigre nije definirana!"
            : !gameData.deals[0].savings
            ? "Ušteda na videoigri nije definirana!"
            : null;

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        await gameDAO.updateGame(gameID, gameData);

        return NextResponse.json(
            { message: "Videigra uspješno ažurirana!" },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return NextResponse.json(
                { error: "ID platforme ne postoji!" },
                { status: 400 }
            );
        }

        console.error("Interna pogreška prilikom ažuriranja videoigre:", error);
        return NextResponse.json(
            { error: "Interna pogreška prilikom ažuriranja videoigre!" },
            { status: 500 }
        );
    }
}
