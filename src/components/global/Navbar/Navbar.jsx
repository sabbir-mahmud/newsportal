"use client";
import { useState } from "react";

const navItems = [
    { label: "Politics", href: "#" },
    { label: "Health", href: "#" },
    { label: "Business", href: "#" },
    { label: "Travels", href: "#" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-700">
            <nav className="container mx-auto text-white shadow-sm py-3 px-4 flex justify-between items-center relative">
                {/* Navbar Start */}
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    <a className="text-xl font-semibold" href="#">
                        News Portal
                    </a>
                </div>

                {/* Navbar Center (Desktop Menu) */}
                <ul className="hidden lg:flex space-x-6 items-center">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href} className="hover:text-gray-300">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Navbar End */}
                <div className="flex items-center gap-2">
                    {/* Show only on desktop */}
                    <a
                        href="#"
                        className="hidden lg:inline-block bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Register
                    </a>
                    <a
                        href="#"
                        className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Login
                    </a>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <ul className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-md rounded-md p-4 space-y-2 lg:hidden z-20">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
