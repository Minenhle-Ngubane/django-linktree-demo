import React, { Fragment } from 'react';


const Profile = ({ username, avatar, title, bio }) => {
    return (
        <Fragment>
            <div className="avatar avatar-xl mb-2">
                {avatar ? (
                    <img 
                        style={{ width: "96px", height: "96px"}}
                        src={ avatar } 
                        className="rounded-circle" 
                        filter="none" 
                        alt="avatar" 
                    />
                ):(
                    <div className="placeholder-bg">
                        <span className="placeholder-fg">
                            { username[0].toUpperCase() }
                        </span>
                    </div>
                )}
                
            </div>
            <div className="mt-4 w-100">
                <h1 className="title">{ title }</h1>
            </div>
            <h2 className="mt-2 bio">
                { bio }
            </h2>
        </Fragment>
    )
}

export default Profile