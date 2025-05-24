"use client";

import { useUpdateUserMutation } from "@/lib/api/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { toast } from "react-toastify";

const UserForm = ({ onClose }) => {
    const user = useAppSelector((state) => state.user.user);
    const [mutation, { isLoading: isUpdating }] = useUpdateUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedFields = {};

        for (let [key, value] of formData.entries()) {
            if (value !== String(user[key])) {
                updatedFields[key] = value;
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes detected.");
            return;
        }

        const response = await mutation({ id: user.id, data: updatedFields });
        if (response.data) {
            toast.success("User details updated successfully.");
            onClose();
        }
        if (response.error) {
            toast.error("Failed to update user details.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Update User Details</h2>

            <div className="space-y-1">
                <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                >
                    First Name
                </label>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    defaultValue={user.first_name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Last Name
                </label>
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    defaultValue={user.last_name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isUpdating}
                className={`w-full py-2 rounded transition text-white ${
                    isUpdating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                }`}
            >
                {isUpdating ? "Updating user..." : "Update User"}
            </button>
        </form>
    );
};

export default UserForm;
