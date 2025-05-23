import Footer from "@/components/global/Footer/Footer";
import Navbar from "@/components/global/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
                <StoreProvider>
                    <Navbar />
                    {children}
                    <Footer />
                    <ToastContainer />
                </StoreProvider>
            </body>
        </html>
    );
}
