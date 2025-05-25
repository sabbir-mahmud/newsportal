"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-600 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center space-y-6"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block"
                >
                    <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
                </motion.div>

                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-lg text-gray-200">
                    Sorry, we couldn’t find that page.
                </p>

                <Link
                    href="/"
                    className="inline-block px-6 py-2 bg-white text-gray-600 font-semibold rounded hover:bg-gray-100 transition"
                >
                    Go Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
