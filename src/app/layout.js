import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
    title: "News App",
    description: "Read the news.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
