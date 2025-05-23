"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeAuthModal } from "@/lib/slices/authModalSlice";
import Login from "../Forms/Auth/Login";
import Register from "../Forms/Auth/Register";
import BaseModal from "./BaseModal";

const AuthModal = () => {
    const type = useAppSelector((state) => state.authModal.type);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(closeAuthModal());
    };

    return (
        <div>
            {type === "login" && (
                <BaseModal isOpen={type === "login"} onClose={handleClose}>
                    <Login />
                </BaseModal>
            )}
            {type === "register" && (
                <BaseModal isOpen={type === "register"} onClose={handleClose}>
                    <Register />
                </BaseModal>
            )}
        </div>
    );
};

export default AuthModal;
