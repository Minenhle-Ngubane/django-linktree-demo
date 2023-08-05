import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';

const Information = () => {
    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);
    const [name, setName] = useState(user?.user.name);
    const [email, setEmail] = useState(user?.user.email);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [nameSuccessMessage, setNameSuccessMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [emailSuccessMessage, setEmailSuccessMessage] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleNameandEmailUpdate = async () => {
        const updatedUserData = {
            user: {
                email: email,
                name: name,
            },
        };

        try {
            await updateUser(updatedUserData);
            setNameSuccessMessage("Name Updated successfully");
            setEmailSuccessMessage("Email Updated successfully");
        } catch (error) {
            setNameErrorMessage(error.data.name);
            setEmailErrorMessage(error.data.email);
        }
    
        setTimeout(() => {
            setNameErrorMessage("");
            setEmailErrorMessage("");
            setNameSuccessMessage("");
            setEmailSuccessMessage("");
        }, 3000);
    }


    return (
        <div className="col-xxl-7 col-xl-7 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
            <h6>My information</h6>
            <div className="card" id="">
                <div className="card-body">
                    <div className="form-group mb-3">
                        <small className="small">Full Name</small>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control border-0 border-bottom rounded-0 pt-0 pb-1 px-0" 
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameErrorMessage && <small className="text-danger mb-0">{nameErrorMessage}</small>}
                        {nameSuccessMessage && <small className="text-success mb-0">{nameSuccessMessage}</small>}
                    </div> 
                    <div className="form-group">
                        <small className="small">Email</small>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control border-0 border-bottom rounded-0 pt-0 pb-1 px-0" 
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailErrorMessage && <small className="text-danger mb-0">{emailErrorMessage}</small>}
                        {emailSuccessMessage && <small className="text-success mb-0">{emailSuccessMessage}</small>}
                    </div> 
                </div>
            </div>
            <div className="mt-3">
                <button 
                    className="btn btn-light-dark" 
                    onClick={handleNameandEmailUpdate}
                >
                    Save details
                </button>
            </div>
        </div>
    )
}

export default Information;