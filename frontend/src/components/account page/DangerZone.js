import React from 'react';

const DangerZone = () => {
    return (
        <div className="col-xxl-7 col-xl-7 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
            <h6>Danger Zone</h6>
            <div className="card" id="">
                <div className="card-body">
                    <button className="btn btn-danger">Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default DangerZone;