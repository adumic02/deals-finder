import "@styles/globals.css";
import Nav from "@components/Navigation/Nav";
import Providers from "@components/Providers";

export const metadata = {
    title: "Deals Finder",
    description: "Pronađi najbolje ponude videoigara!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="hr" className="dark">
            <body className="min-h-screen flex flex-col">
                <Providers>
                    <header className="md:px-10">
                        <Nav />
                    </header>
                    <main className="flex-grow py-10 px-5 sm:px-16">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
