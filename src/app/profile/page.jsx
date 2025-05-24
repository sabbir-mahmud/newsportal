"use client";

import Loading from "@/components/global/Loading/Loading";
import PasswordChange from "@/components/modules/core/PasswordChange";
import PreferencesModal from "@/components/modules/ui/Modals/PreferencesModal";
import UserModal from "@/components/modules/ui/Modals/UserModal";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

const Profile = () => {
    const profile = useAppSelector((state) => state.user);
    const [preferencesModal, setPreferencesModal] = useState(false);
    const [userUpdateModal, setUserUpdateModal] = useState(false);
    const avatar = `https://i.pravatar.cc/150?img=${
        Math.floor(Math.random() * 70) + 1
    }`;

    if (!profile || !profile.user) {
        return (
            <div className="mt-24 flex justify-center">
                <Loading />
            </div>
        );
    }

    const {
        user,
        bio,
        source_preferences,
        country_preferences,
        category_preferences,
    } = profile;

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg border shadow-md p-8">
                <div>
                    <div className="flex items-center space-x-4 mb-6">
                        <img
                            src={avatar}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p className="text-gray-600">@{user.username}</p>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">Bio</h3>
                        <p className="text-gray-700 mr-10 whitespace-pre-line bg-gray-50 p-3 rounded-md border">
                            {bio}
                        </p>
                        <div className="flex space-x-3 mt-3">
                            <button
                                className="px-4 py-2 bg-gray-100 border text-sm rounded-md hover:bg-gray-200"
                                onClick={() => setPreferencesModal(true)}
                            >
                                Manage Preferences
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
                                onClick={() => setUserUpdateModal(true)}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">
                            Source Preferences
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {source_preferences.map((src) => (
                                <li key={src.id}>{src.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">
                            Country Preferences
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {country_preferences.map((country) => (
                                <li key={country.id}>
                                    {country.name} ({country.code})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">
                            Category Preferences
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {category_preferences.map((cat) => (
                                <li key={cat.id}>{cat.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <PasswordChange />
            </div>

            {preferencesModal && (
                <PreferencesModal
                    isOpen={preferencesModal}
                    handleClose={() => setPreferencesModal(false)}
                />
            )}

            {userUpdateModal && (
                <UserModal
                    isOpen={userUpdateModal}
                    handleClose={() => setUserUpdateModal(false)}
                />
            )}
        </div>
    );
};

export default Profile;
