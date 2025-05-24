import UserForm from "../Forms/Profile/UserForm";
import BaseModal from "./BaseModal";

const UserModal = ({ isOpen, handleClose }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={handleClose}>
            <UserForm onClose={handleClose} />
        </BaseModal>
    );
};

export default UserModal;
