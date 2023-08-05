import axios from 'axios';
import React, { useState } from 'react';
import Alert from '../components/common/Alert';


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isRequestSuccessfull, setIsRequestSuccesfull] = useState(false);
    const baseUrl = window.location.origin;

    const disableButton = email.trim() === "" || !isValidEmail;

    const validateEmailFormat = (input) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(input);
    };

    const handlePasswordForgot = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${baseUrl}/auth/api/password/reset/`, { email });
            setIsRequestSuccesfull(true);
            setErrorMessage("");
        } catch (error) {
            console.log(error)
            setErrorMessage("User not found. Please check your email.");
        }
    };

    if (isRequestSuccessfull) {
        return (
            <div className="col-md-12 mb-3 px-2">
                <h1 className="fw-bolder">Password reset email sent</h1>
                <p>We've sent you a link to reset your password. The link expires in one day (24 hours).</p>
                <p>You can close this window now</p>
            </div>
        )
    }

    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-2">
                        <h2>Password Reset</h2>
                        <p>Enter your email to reset your password</p>
                        {errorMessage && <Alert type="danger" message={errorMessage} dismissible={false} />}
                    </div>
                    <form onSubmit={handlePasswordForgot}>
                        <div className="col-md-12">
                            <div className="mb-4">
                                <input 
                                    type="email" 
                                    className={`form-control ${ errorMessage || !isValidEmail ? "border-danger": ""}`} 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setIsValidEmail(validateEmailFormat(e.target.value));
                                    }}
                                />
                                {!isValidEmail && <small className="text-danger">Enter a valid email</small>} 
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-4">
                                <button className="btn btn-secondary w-100" disabled={disableButton}>RESET PASSWORD</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;