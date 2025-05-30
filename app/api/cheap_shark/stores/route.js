import { NextResponse } from "next/server";

export async function GET() {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_CHEAP_SHARK_API_URL;
        const res = await fetch(`${BASE_URL}/stores`);

        if (!res.ok) {
            throw new Error("Dohvaćanje podataka platformi neuspješno!");
        }

        const parsedData = await res.json();
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Interna pogreška kod dohvaćanja podataka platformi!" },
            { status: 500 }
        );
    }
}
