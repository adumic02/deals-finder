"use client";

import AuthForm from "@components/Navigation/AuthForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (!res.ok) {
            setError("Netočno korisničko ime ili lozinka!");
        } else {
            setSuccess("Prijava uspješna!");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        }
    };

    return (
        <AuthForm
            formTitle="Prijava"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            success={success}
            buttonText="Prijave se"
            onSubmit={handleSubmit}
        />
    );
}
