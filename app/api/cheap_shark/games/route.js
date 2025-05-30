import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    try {
        const BASE_URL = process.env.NEXT_PUBLIC_CHEAP_SHARK_API_URL;

        let url = `${BASE_URL}/games?title=${searchParams.get("title")}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Dohvaćanje podataka videoigara neuspješno!");
        }

        const parsedData = await res.json();
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Interna pogreška kod dohvaćanja podataka videoigara!" },
            { status: 500 }
        );
    }
}
