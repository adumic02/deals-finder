import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Pristup zabranjen!" },
            { status: 401 }
        );
    }

    try {
        const BASE_URL = process.env.NEXT_PUBLIC_CHEAP_SHARK_API_URL;

        const { action, email, gameID } = Object.fromEntries(searchParams);

        const missingField = !action
            ? "Tip akcije nije definiran!"
            : !email
            ? "E-mail nije definiran!"
            : !gameID
            ? "ID videoigre nije definiran!"
            : null;

        if (session.user.email != email && session.user.role != "admin") {
            return NextResponse.json(
                { error: "Nedovoljno prava!" },
                { status: 403 }
            );
        }

        if (missingField) {
            return NextResponse.json({ error: missingField }, { status: 400 });
        }

        let url = `${BASE_URL}/alerts?action=${action}&email=${email}&gameID=${gameID}`;

        if (action === "set") {
            const price = searchParams.get("price");

            if (!price) {
                return NextResponse.json(
                    { error: "Cijena nije definirana!" },
                    { status: 400 }
                );
            }

            url += `&price=${price}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(
                "Postavljanje / ukidanje obavijesti za videoigru neuspješno!"
            );
        }

        const parsedData = await res.json();
        return NextResponse.json(parsedData);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Interna pogreška kod postavljanja / ukidanja obavijesti za videoigru!",
            },
            { status: 500 }
        );
    }
}
