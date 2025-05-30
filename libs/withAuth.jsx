import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "loading") return;

            if (!session) {
                router.push("auth/login");
            }
        }, [session, status, router]);

        if (session) {
            return <Component {...props} />;
        }
    };

    return AuthenticatedComponent;
};

export default withAuth;
