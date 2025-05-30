import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    try {
        const BASE_URL = process.env.NEXT_PUBLIC_CHEAP_SHARK_API_URL + "/deals";

        let url = `${BASE_URL}?`;

        const { storeID, pageNumber, lowerPrice, upperPrice, sortBy, desc } =
            Object.fromEntries(searchParams);

        if (pageNumber) url += `pageNumber=${pageNumber}&`;
        if (storeID) url += `storeID=${storeID}&`;
        if (lowerPrice) url += `lowerPrice=${lowerPrice}&`;
        if (upperPrice) url += `upperPrice=${upperPrice}&`;
        if (sortBy) url += `sortBy=${sortBy}&`;
        if (desc) url += `desc=${desc}&`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Dohvaćanje podataka ponuda neuspješno!");
        }

        const parsedData = await res.json();
        const totalPageCount = res.headers.get("X-Total-Page-Count");

        const response = NextResponse.json(parsedData);
        response.headers.set("total-page-count", totalPageCount);

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Interna pogreška kod dohvaćanja ponuda!" },
            { status: 500 }
        );
    }
}
