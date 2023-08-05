import React from 'react';
import '../../css/loader.css';

const Loader = () => {
    return (
        <div id="load_screen"> 
            <div className="loader"> 
                <div className="loader-content">
                    <div className="spinner-grow align-self-center"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;