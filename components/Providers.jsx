"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { CurrencyProvider } from "@context/CurrencyContext";

export default function Providers({ children }) {
    return (
        <NextUIProvider>
            <SessionProvider>
                <Suspense>
                    <CurrencyProvider>{children}</CurrencyProvider>
                </Suspense>
            </SessionProvider>
        </NextUIProvider>
    );
}
