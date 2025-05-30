import { NextResponse } from "next/server";
import { GameDAO } from "@models/GameDAO";

export async function GET(req) {
    try {
        const gameDAO = new GameDAO();
        const games = await gameDAO.getGames();

        return NextResponse.json(games, { status: 200 });
    } catch (error) {
        console.error(
            "Interna pogreška prilikom dohvaćanja videoigara:",
            error
        );
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćanja videoigara!",
            },
            { status: 500 }
        );
    }
}
