"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@components/Navigation/AuthForm";
import { addUser } from "@utils/fetchManager";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;
        return validateEmail(email) ? false : true;
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", "user");
        if (picture !== null) {
            formData.append("picture", picture);
        }

        try {
            const { res, data } = await addUser(formData);

            if (!res.ok) {
                setError(data.error);
            } else {
                setSuccess(data.message);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1000);
            }
        } catch (error) {
            throw new Error("Pogreška prilikom registracije: ", error);
        }
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            const image = new Image();

            reader.onload = (event) => {
                image.src = event.target.result;
                image.onload = () => {
                    if (image.width > 500 || image.height > 500) {
                        setError("Slika ne smije biti veća od 500x500px!");
                    } else {
                        setError("");
                        setPicture(file);
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthForm
            formTitle="Registracija"
            email={email}
            setEmail={setEmail}
            isInvalidEmail={isInvalidEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            success={success}
            buttonText="Registriraj me"
            onPictureChange={handlePictureChange}
            onSubmit={handleSubmit}
        />
    );
}
