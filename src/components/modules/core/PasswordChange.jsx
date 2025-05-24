import { useUpdatePasswordMutation } from "@/lib/api/authSlice";
import { toast } from "react-toastify";

const PasswordChange = () => {
    const [mutation, { isLoading: loading }] = useUpdatePasswordMutation();
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get("current_password");
        const newPassword = formData.get("new_password");
        const confirmPassword = formData.get("confirm_password");

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill out all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        const response = await mutation({
            old_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        });
        if (response.error) {
            toast.error("Error updating password.");
            return;
        }
        if (response.data) {
            toast.success("Password updated successfully!");
            e.target.reset();
            return;
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <form className="space-y-4" onSubmit={handlePasswordChange}>
                <div>
                    <label className="block text-sm font-medium">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="current_password"
                        className="mt-1 p-3 border block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="new_password"
                        className="mt-1 p-3 border block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        name="confirm_password"
                        className="mt-1 p-3 border block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default PasswordChange;
