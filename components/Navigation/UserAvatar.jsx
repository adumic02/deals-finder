import React from "react";
import {
    User,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Avatar,
    DropdownSection,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import CurrencyButton from "@components/Navigation/CurrencyButton";
export default function UserAvatar() {
    const { data: session } = useSession();

    return session ? (
        <div className="flex items-center">
            <Dropdown>
                <DropdownTrigger>
                    <User
                        key={session.user.id}
                        name={session.user.name}
                        avatarProps={{
                            src: session.user.picture,
                        }}
                        className="cursor-pointer"
                    />
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownSection
                        aria-label="Stranice korisnika"
                        showDivider
                    >
                        <DropdownItem key="profile" href="/profile">
                            Profil
                        </DropdownItem>

                        <DropdownItem key="wishlist" href="/wishlist">
                            Lista želja
                        </DropdownItem>

                        <DropdownItem key="badges" href="/badges">
                            Značke
                        </DropdownItem>
                    </DropdownSection>

                    <DropdownSection aria-label="Valuta" showDivider>
                        <DropdownItem
                            key="currency"
                            className="cursor-default"
                            isReadOnly
                            endContent={<CurrencyButton />}
                        >
                            Valuta
                        </DropdownItem>
                    </DropdownSection>

                    <DropdownSection aria-label="Odjava">
                        <DropdownItem
                            key="sign-out"
                            color="danger"
                            className="text-danger"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Odjava
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    ) : (
        <div className="flex items-center">
            <Dropdown>
                <DropdownTrigger>
                    <Avatar src="/images/profiles/default-avatar.png" />
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownSection aria-label="Valuta" showDivider>
                        <DropdownItem
                            key="currency"
                            className="cursor-default"
                            isReadOnly
                            endContent={<CurrencyButton />}
                        >
                            Valuta
                        </DropdownItem>
                    </DropdownSection>

                    <DropdownSection aria-label="Prijava i registracija">
                        <DropdownItem key="login" href="/auth/login">
                            Prijava
                        </DropdownItem>

                        <DropdownItem key="register" href="/auth/register">
                            Registracija
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
