import React from 'react';
import '../css/authlayout.css';

const AuthWrapper = ({ children }) => {
    return (
        <div className="auth-container d-flex">
            <div className="container mx-auto align-self-center">
                <div className="row">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;