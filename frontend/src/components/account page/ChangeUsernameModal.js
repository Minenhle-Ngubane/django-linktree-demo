import axios from 'axios';
import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';

const ChangeUsernameModal = ({ setIsUsernameModalOpen }) => {
    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);
    const [username, setUsername] = useState(user?.user.username);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [usernameSuccessMessage, setUsernameSuccessMessage] = useState("");
    const [isSaveBtnDisbaled, setIsSaveBtnDisabled] =  useState(true);
    const baseUrl = window.location.origin;

    const checkUsernameAvailability = async (value) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/api/check-username/`, { username: value });
            const { available } = response.data;

            if (!value.trim()) {
                setUsernameErrorMessage("Please enter a username");
                setUsernameSuccessMessage("");
                setIsSaveBtnDisabled(true);
            } else if (!available && value !== user?.user.username) {
                setUsernameErrorMessage("That username is already taken.");
                setUsernameSuccessMessage("");
                setIsSaveBtnDisabled(true);
            } else if (!available && value === user?.user.username) {
                setUsernameErrorMessage("");
                setUsernameSuccessMessage("");
                setIsSaveBtnDisabled(true);
            } else {
                setUsernameErrorMessage("");
                setUsernameSuccessMessage(available ? "Username available" : "");
                setIsSaveBtnDisabled(false);
            }
        } catch (error) {
            setUsernameErrorMessage("Failed to check username availability. Please try again.");
            setUsernameSuccessMessage("");
        }
    };
      

    const handleUsernameUpdate = async () => {
        const updatedUserData = {
            user: {
                username: username,
            },
        };

        const { error } = await updateUser(updatedUserData);

        if (error) {
            setUsernameErrorMessage(error.data.username);
        } else {
            closeUserNameModal()
        }
    }

    const closeUserNameModal = () => setIsUsernameModalOpen(false);
    

    return (
        <div className="modal modal-overlay fade show" style={{ display: "block"}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content">
                    <div className="modal-header border-0 d-flex justify-content-between">
                        <h5 className="modal-title">Change username</h5>
                        <button type="button" className="btn-close" onClick={closeUserNameModal} />
                    </div>
                    <div className="modal-body">
                        <div className="mb-0">
                            <input 
                                type="text" 
                                className={`form-control bg-light ${usernameErrorMessage ? "border-danger" : usernameSuccessMessage? "border-success": "border-0"}`} 
                                placeholder="username"
                                value={username}
                                onChange={(e) => {
                                    e.persist();
                                    setUsername(e.target.value);
                                    checkUsernameAvailability(e.target.value);
                                }}
                                autoFocus  
                            />
                            {usernameErrorMessage && 
                                <small className="text-danger mb-0">
                                    {usernameErrorMessage}
                                </small>
                            }
                            {usernameSuccessMessage && 
                                <small className="text-success mb-0">
                                    {usernameSuccessMessage}
                                </small>
                            }
                        </div>
                        <p className="mt-3">Note: changing your username will also change your URL</p>
                        <button 
                            type="button" 
                            className="btn btn-secondary w-100" 
                            onClick={handleUsernameUpdate}
                            disabled={isSaveBtnDisbaled}
                        >
                            Save username change
                        </button>
                        <button type="button" className="btn btn-light-dark w-100 mt-3" onClick={closeUserNameModal} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeUsernameModal;