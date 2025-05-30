import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_CHEAP_SHARK_API_URL;
        const { dealID } = params;

        if (!dealID) {
            return NextResponse.json(
                { error: "ID ponude nije definiran!" },
                { status: 400 }
            );
        }

        const url = `${BASE_URL}/deals?id=${encodeURIComponent(dealID)}`;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(
                    "Dohvaćanje podataka detalja ponude neuspješno!"
                );
            }

            const parsedData = await res.json();
            return NextResponse.json(parsedData);
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Interna pogreška kod dohvaćanja detalja ponude!" },
            { status: 500 }
        );
    }
}
