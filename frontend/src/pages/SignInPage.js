import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Alert from '../components/common/Alert';
import Spinner from '../components/common/Spinner';


const SignInPage = () => {
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    const disableButton = username.trim() === "" || password.trim() === "";

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        const { error } = await login(username, password);
        if (error) {
            setIsValid(false);
            setErrorMessage("Invalid username and/or password");
            setPassword("");
        } else {
            navigate("/admin");
            resetForm();
        }
        setIsLoggingIn(false);
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
    };

    return (
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h2>Sign in to your Linktree</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        {isValid ? "" : <Alert type="danger" message={errorMessage} dismissible={false} />}
                        <div className="col-md-12">
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className={`form-control ${errorMessage ? "border-danger" : ""}`} 
                                    placeholder="linktr.ee/Username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <input 
                                    type="password" 
                                    className={`form-control ${errorMessage ? "border-danger" : ""}`}
                                    placeholder="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-12">
                            <p className="mb-4">
                                Forgot your password? <Link to="/password/reset" className="text-secondary">Reset password</Link>
                            </p>
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <button type="submit" className="btn btn-secondary w-100" disabled={isLoggingIn || disableButton}>
                                    {isLoggingIn ? <Spinner color={"white"} /> : "SIGN IN" } 
                                </button>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="text-center">
                                <p className="mb-0">
                                    Dont't have an account ? <Link to="/signup" className="text-secondary">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;