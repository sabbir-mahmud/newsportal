"use client";
import { useRegisterMutation } from "@/lib/api/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthModalType } from "@/lib/slices/authModalSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const [mutation, { isLoading: isRegistering }] = useRegisterMutation();

    const switchToLogin = () => {
        dispatch(setAuthModalType({ type: "login" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.target);
        const email = formData.get("email")?.trim();
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm_password");
        const firstName = formData.get("first_name")?.trim();
        const lastName = formData.get("last_name")?.trim();
        const username = formData.get("username")?.trim();

        if (
            !email ||
            !password ||
            !confirmPassword ||
            !firstName ||
            !lastName ||
            !username
        ) {
            return setError("All fields are required.");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            return setError(
                "Password must be at least 8 characters and include uppercase, lowercase, and a number."
            );
        }

        if (!/^[a-zA-Z0-9-_]+$/.test(username)) {
            return setError(
                "Username can only contain letters, numbers, hyphens, and underscores."
            );
        }

        const payload = {
            email,
            password,
            confirm_password: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            username,
        };

        const response = await mutation(payload);

        if (response.error) {
            setError(response.error.data.message);
        }
        if (response.data) {
            toast.success("Registration successful! You can now log in.");
            switchToLogin();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Register</h2>

            {error && (
                <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="text"
                name="username"
                placeholder="Username"
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

            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
                type="submit"
                disabled={isRegistering}
                className={`w-full py-2 rounded transition text-white ${
                    isRegistering
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                }`}
            >
                {isRegistering ? "Registering..." : "Register"}
            </button>
            <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                    className="text-indigo-600 hover:underline"
                    onClick={switchToLogin}
                >
                    Login
                </button>
            </p>
        </form>
    );
};

export default Register;
