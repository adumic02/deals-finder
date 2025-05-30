"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import UserAvatar from "@components/Navigation/UserAvatar";

export default function Nav() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        switch (pathname) {
            case "/":
                setActiveTab("Deals");
                break;
            case "/games":
                setActiveTab("Games");
                break;
            default:
                setActiveTab("");
        }
    }, [pathname]);

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}
            maxWidth="full"
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        >
            {/* Dropdown za male ekrane */}
            <NavbarContent className="md:hidden">
                <NavbarMenuToggle />
            </NavbarContent>

            {/* Meni za mobitele */}
            <NavbarMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            >
                <NavbarMenuItem>
                    <Link
                        color={activeTab === "Deals" ? "primary" : "foreground"}
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Ponude
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        color={activeTab === "Games" ? "primary" : "foreground"}
                        href="/games"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Videoigre
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>

            {/* Centrirani logo */}
            <NavbarBrand className="flex justify-center md:justify-start">
                <Link href="/" color="foreground">
                    <p className="logo_text text-xl md:text-2xl">
                        DEALS FINDER
                    </p>
                </Link>
            </NavbarBrand>

            {/* Tabovi za desktop */}
            <NavbarContent className="hidden md:flex" justify="center">
                <NavbarItem isActive={activeTab === "Deals"}>
                    <Link
                        color={activeTab === "Deals" ? "primary" : "foreground"}
                        href="/"
                    >
                        Ponude
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeTab === "Games"}>
                    <Link
                        color={activeTab === "Games" ? "primary" : "foreground"}
                        href="/games"
                    >
                        Videoigre
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {/* Desni dio */}
            <NavbarContent justify="end">
                <NavbarItem>
                    <UserAvatar />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
