import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import ChangeUsernameModal from './ChangeUsernameModal';

const Actions = () => {
    const user = useAuthStore((state) => state.user);
    const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

    const openUsernameModal = () => {
        setIsUsernameModalOpen(true);
    } 

    return (
        <div className="col-xxl-7 col-xl-7 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
            <h6>Account actions for <span className="text-secondary">{user.user.username}</span></h6>
            <div className="card" id="">
                <div className="card-body d-flex">
                    <button className="btn btn-outline-dark me-3" onClick={openUsernameModal}>Change username</button>
                    <button className="btn btn-dark">Reset password</button>
                </div>
            </div>
            {isUsernameModalOpen && (
                <ChangeUsernameModal 
                    setIsUsernameModalOpen={setIsUsernameModalOpen} 
                />
            )}
        </div>
    )
}

export default Actions