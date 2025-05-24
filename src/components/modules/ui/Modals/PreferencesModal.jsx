"use client";

import PreferencesForm from "../Forms/Profile/PreferencesForm";
import BaseModal from "./BaseModal";

const PreferencesModal = ({ isOpen, handleClose }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={handleClose}>
            <PreferencesForm onClose={handleClose} />
        </BaseModal>
    );
};

export default PreferencesModal;
