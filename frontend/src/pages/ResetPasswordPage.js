import axios from 'axios';
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/common/Alert';


const ResetPasswordPage = () => {
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
    const [passwordsMatched, setPasswordsMatched] = useState(false);
    const [isRequestSuccessfull, setIsRequestSuccesfull] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const baseUrl = window.location.origin;


    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsValidated(true);
    
        if (!e.target.value) {
            setConfirmPasswordMessage('Please confirm your password.');
            setPasswordsMatched(false);
        } else if (password !== e.target.value) {
            setConfirmPasswordMessage('Passwords do not match. Please try again.');
            setPasswordsMatched(false);
        } else {
            setConfirmPasswordMessage('Passwords match.');
            setPasswordsMatched(true);
        }
    };
    

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!passwordsMatched) {
            setConfirmPasswordMessage('Please make sure the passwords match.');
            return;
        }

        try {
            await axios.post(`${baseUrl}/auth/api/password/reset/confirm/${uidb64}/${token}/`, { password, token });
            setIsRequestSuccesfull(true);
            setMessage("Password reset successful. You can now log in with your new password.");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if(error.response.data.password) {
                setMessage(error.response.data.password);
            } else {
                setMessage("Invalid Token. Please try again");
            }
            setIsRequestSuccesfull(false);
        }
    };


    if (isRequestSuccessfull) {
        return (
            <div className="col-md-12 mb-3 px-1">
                <Alert type="success" message={message} dismissible={false} />
                <Link className="text-decoration-underline fw-bold" to="/signin">Signin here.</Link>
            </div>
        )
    }

    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-1">
                        <h2>Create New Password</h2>
                        {message && isRequestSuccessfull && 
                            <Alert type="success" message={message} dismissible={false} />
                        }
                        {message && !isRequestSuccessfull && 
                            <Alert type="danger" message={message} dismissible={false} />
                        }
                    </div>
                    <form onSubmit={handlePasswordReset}>
                        <div className="col-md-12">
                            <div className="mb-4">
                                <input 
                                    type="password" 
                                    className={`form-control ${passwordsMatched || isRequestSuccessfull? "border-success": ""}`}
                                    placeholder="new password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-4">
                                <input 
                                    type="password" 
                                    className={`form-control ${!passwordsMatched && isValidated ? "border-danger" : passwordsMatched? "border-success": ""}`}
                                    placeholder="confirm password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                />
                                {confirmPasswordMessage && !passwordsMatched &&
                                    <small className="text-danger mb-0">
                                        {confirmPasswordMessage}
                                    </small>
                                }
                                {confirmPasswordMessage && passwordsMatched &&
                                    <small className="text-success mb-0">
                                        {confirmPasswordMessage}
                                    </small>
                                }
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-4">
                                <button className="btn btn-secondary w-100" disabled={!passwordsMatched}>RESET PASSWORD</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage