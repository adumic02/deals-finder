import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_URL;
        const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

        if (!API_KEY) {
            return NextResponse.json(
                { error: "API KEY za dohvaćanje podataka nije definiran!" },
                { status: 400 }
            );
        }

        const url = `${BASE_URL}?app_id=${API_KEY}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Dohvaćanje valutnih tečajeva neuspješno!");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Interna pogreška kod dohvaćanja valutnih tečajeva!" },
            { status: 500 }
        );
    }
}
