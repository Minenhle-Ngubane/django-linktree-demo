import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';


const SignUpPage = () => {
    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    const disableButton =
    username.trim() === "" || email.trim() === "" || password.trim() === "" ||
    errors.username !== "" || errors.email !== "" || errors.password !== "";

    const validateEmailFormat = (input) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(input);
    };

    const validateInput = async (field, value) => {
        const errorsCopy = { ...errors };
    
        try {
            switch (field) {
                case "username":
                    const usernameResponse = await axios.post("auth/api/check-username/", { username: value });
                    errorsCopy.username = !usernameResponse.data.available ? "That username is already taken." : 
                    usernameResponse.data.available && value.length < 4 ? "username must be a minimum of 4 characters" : "";
                    break;
                case "email":
                    const emailResponse = await axios.post("auth/api/check-email/", { email: value });
                    errorsCopy.email = !emailResponse.data.available ? "That email is already registered." : 
                    emailResponse.data.available && !validateEmailFormat(value) ? "Enter a valid email" : "";
                    break;
                case "password":
                    const passwordResponse = await axios.post("auth/api/validate-password/", { password: value });
                    errorsCopy.password = passwordResponse.data.errors.join(", ");
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error validating input:", error);
        }
        setErrors(errorsCopy);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setIsCreatingUser(true);
        try {
            const { error } = await register(username, email, password);

            if (error) {
                console.log(error)
                setErrorMessage("Failed");
            } else {
                navigate("/admin");
            }
        } catch (error) {
            setErrorMessage("Failed to create user. Please try again later.");
        }
        setIsCreatingUser(false);
    };
    
    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h2>Create your account</h2>
                        <p>Choose your Linktree username. You can always change it later.</p>
                        {errorMessage && <Alert type="danger" message={errorMessage} dismissible={false} />}
                    </div>
                    <form onSubmit={handleRegistration}>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="linktree/username"
                                    className={`form-control ${
                                        (errors.username) ? "border border-danger" : ""
                                    }`}
                                    value={username}
                                    onChange={(e) => { 
                                        e.persist();
                                        setUsername(e.target.value);
                                        validateInput("username", e.target.value);
                                    }}
                                    required
                                />
                                {errors.username && <small className="text-danger">{errors.username}</small>}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder="email"
                                    className={`form-control ${
                                        (errors.email) ? "border border-danger" : ""
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        e.persist();
                                        setEmail(e.target.value);
                                        validateInput("email", e.target.value);
                                    }}
                                    required
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}    
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="password"
                                    className={`form-control ${
                                        (errors.password) ? "border border-danger" : ""
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        e.persist();
                                        setPassword(e.target.value);
                                        validateInput("password", e.target.value);
                                    }}
                                    required
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-4">
                                <button type="submit" className="btn btn-secondary w-100" disabled={disableButton}>
                                    {isCreatingUser ? <Spinner color={"white"} /> : "CREATE ACCOUNT" } 
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    <div className="col-12">
                        <div className="text-center">
                            <p className="mb-0">
                                Already have an account ? <Link to="/signin" className="text-secondary">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;