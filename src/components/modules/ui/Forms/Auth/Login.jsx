"use client";

import { useLoginMutation } from "@/lib/api/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { closeAuthModal, setAuthModalType } from "@/lib/slices/authModalSlice";
import { setToken } from "@/lib/slices/tokenReducer";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();

    const switchToRegister = () => {
        dispatch(setAuthModalType({ type: "register" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.target);
        const email = formData.get("email")?.trim();
        const password = formData.get("password");

        if (!email || !password) {
            return setError("Both email and password are required.");
        }

        const response = await loginMutation({ email, password });

        if (response.error) {
            setError(response.error.data.message);
        }

        if (response.data) {
            toast.success("Login successful!");
            dispatch(setToken(response.data.token));
            dispatch(closeAuthModal());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Login</h2>

            {error && (
                <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-2 rounded transition text-white ${
                    isLoggingIn
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                }`}
            >
                {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={switchToRegister}
                    className="text-indigo-600 hover:underline"
                >
                    Register
                </button>
            </p>
        </form>
    );
};

export default Login;
