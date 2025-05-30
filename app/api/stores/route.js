import { NextResponse } from "next/server";
import { StoreDAO } from "@models/StoreDAO";

export async function GET(req) {
    try {
        const storeDAO = new StoreDAO();
        const stores = await storeDAO.getStores();

        return NextResponse.json(stores, { status: 200 });
    } catch (error) {
        console.error("Interna pogreška prilikom dohvaćanja platformi:", error);
        return NextResponse.json(
            {
                error: "Interna pogreška prilikom dohvaćanja platformi!",
            },
            { status: 500 }
        );
    }
}
