"use client";
import AuthModal from "@/components/modules/ui/Modals/AuthModal";
import { useGetCategoriesQuery } from "@/lib/api/articleSlice";
import { useGetUserQuery } from "@/lib/api/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openAuthModal } from "@/lib/slices/authModalSlice";
import { setCategory } from "@/lib/slices/filterSlice";
import { setUserData } from "@/lib/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
    { label: "Politics", href: "#" },
    { label: "Health", href: "#" },
    { label: "Business", href: "#" },
    { label: "Travels", href: "#" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.token?.access_token);
    const user = useAppSelector((state) => state.user);
    const isAuthModalOpen = useAppSelector((state) => state.authModal.open);
    const router = useRouter();

    const { data: userData, isLoading: userLoading } = useGetUserQuery(
        undefined,
        {
            skip: !token,
        }
    );

    const { data: categories, isLoading: categoriesLoading } =
        useGetCategoriesQuery();

    useEffect(() => {
        if (userData && !userLoading) {
            dispatch(setUserData(userData.results[0]));
        }
    }, [userData, userLoading, dispatch]);

    const openLoginModal = () => dispatch(openAuthModal({ type: "login" }));
    const openRegisterModal = () =>
        dispatch(openAuthModal({ type: "register" }));

    return (
        <>
            <div className="bg-gray-700">
                <nav className="container mx-auto text-white shadow-sm py-3 px-4 flex justify-between items-center relative">
                    {/* Left - Logo + Mobile Menu */}
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
                        <Link className="text-xl font-semibold" href="/">
                            News Portal
                        </Link>
                    </div>

                    <ul className="hidden lg:flex space-x-6 items-center">
                        {!categoriesLoading && categories?.results?.length > 0
                            ? categories.results.slice(0, 5).map((category) => (
                                  <li key={category.id}>
                                      <button
                                          className="hover:text-gray-300"
                                          onClick={() => {
                                              dispatch(
                                                  setCategory({
                                                      category: category.id,
                                                  })
                                              );
                                              router.push("/");
                                          }}
                                      >
                                          {category.name}
                                      </button>
                                  </li>
                              ))
                            : navItems.map((item, index) => (
                                  <li key={index}>
                                      <a
                                          href={item.href}
                                          className="hover:text-gray-300"
                                      >
                                          {item.label}
                                      </a>
                                  </li>
                              ))}
                    </ul>

                    {!userLoading && (
                        <div className="flex items-center gap-2">
                            {!user ? (
                                <>
                                    <button
                                        onClick={openRegisterModal}
                                        className="hidden lg:inline-block bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                                    >
                                        Register
                                    </button>
                                    <button
                                        onClick={openLoginModal}
                                        className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/profile"
                                    className="hidden lg:flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                                >
                                    <img
                                        src={`https://picsum.photos/40?random=${Math.floor(
                                            Math.random() * 1000
                                        )}`}
                                        alt="User Avatar"
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span>Profile</span>
                                </Link>
                            )}
                        </div>
                    )}

                    {isOpen && (
                        <ul className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-md rounded-md p-4 space-y-2 lg:hidden z-20">
                            {categories?.results
                                ?.slice(0, 5)
                                .map((category) => (
                                    <li key={category.id}>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                            onClick={() => {
                                                dispatch(
                                                    setCategory({
                                                        category: category.id,
                                                    })
                                                );
                                                setIsOpen(false);
                                                router.push("/");
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            {!userLoading && !user && (
                                <>
                                    <li>
                                        <button
                                            onClick={() => {
                                                openLoginModal();
                                                setIsOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                        >
                                            Login
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                openRegisterModal();
                                                setIsOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                        >
                                            Register
                                        </button>
                                    </li>
                                </>
                            )}
                            {!userLoading && user && (
                                <li>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <img
                                            src={`https://picsum.photos/40?random=${Math.floor(
                                                Math.random() * 1000
                                            )}`}
                                            alt="User Avatar"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span>Profile</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                </nav>
            </div>

            {/* Auth Modal */}
            {isAuthModalOpen && <AuthModal />}
        </>
    );
};

export default Navbar;
