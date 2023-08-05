import { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import useAuthStore from '../store/authStore';


const AppearancePage = () => {
    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);
    const [avatar, setAvatar] = useState(user?.profile.avatar);
    const [title, setTitle] = useState(user?.profile.title);
    const [bio, setBio] = useState(user?.profile.bio);
    const [titleErrorMessage, setTitleErrorMessage] = useState("");
    const [avatarErrorMessage, setAvatarErrorMessage] = useState("");
    const [avatarSuccessMessage, setAvatarSuccessMessage] = useState("");
    const [bioErrorMessage, setBioErrorMessage] = useState("");
    const [titleSuccessMessage, setTitleSuccessMessage] = useState("");
    const [bioSuccessMessage, setBioSuccessMessage] = useState("");
    const avatarInputRef = useRef(null);

    useEffect(() => {
        setAvatar(user?.profile.avatar);
        setTitle(user?.profile.title);
        setBio(user?.profile.bio);
    }, [user]);

    const handleAvatarSelect = () => {
        avatarInputRef.current.click();
    };

    const handleAvatarUpdate = async (avatarFile) => {
        if (!avatarFile) {
            const formData = new FormData();
            formData.append("avatar", avatarFile);
            formData.append("removeAvatar", true);

            try {
                await updateUser(formData);
                setAvatarSuccessMessage("Avatar removed successfully");
            } catch (error) {
                setAvatarErrorMessage("Failed to remove avatar. Please try again.");
            }
        } else {
            const formData = new FormData();
            formData.append("avatar", avatarFile);
        
            try {
                await updateUser(formData);
                setAvatarSuccessMessage("Avatar updated successfully");
            } catch (error) {
                setAvatarErrorMessage("Failed to update avatar. Please try again.");
            }
        }
    
        setTimeout(() => {
            setAvatarSuccessMessage("");
            setAvatarErrorMessage("");
        }, 3000);
    };

    const clearAvatarInput = async () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.value = "";
        }

        setAvatar(null);
        await handleAvatarUpdate(null);
    };

    const handleTitleUpdate = async () => {
        try {
            const updatedUserData = {
                profile: {
                    title: title,
                },
            };
        
            const { error } = await updateUser(updatedUserData);
        
            if (error) {
                setTitleErrorMessage(error.data.title);
            } else {
                setTitleSuccessMessage("Title updated successfully");
            }
        } catch (error) {
            setTitleErrorMessage("Failed to update title. Please try again.");
        }
      
        setTimeout(() => {
            setTitleErrorMessage("");
            setTitleSuccessMessage("");
        }, 3000);
    };

    const handleBioUpdate = async () => {
        try {
            const updatedUserData = {
                profile: {
                    bio: bio,
                },
            };
        
            const { error } = await updateUser(updatedUserData);
        
            if (error) {
                setBioErrorMessage(error.data.bio);
            } else {
                setBioSuccessMessage("Bio updated successfully");
            }
        } catch (error) {
            setBioErrorMessage("Failed to update bio. Please try again.");
        }
      
        setTimeout(() => {
            setBioErrorMessage("");
            setBioSuccessMessage("");
        }, 3000);
    };

    const randerUserAvatar = () => {
        if(avatar){
            return <img className="align-self-center rounded" src={avatar} alt="pic1" width="90" height="90" />
        } else {
            return (
                <div className="avatar avatar-xl">
                    <span class="avatar-icon rounded">
                        <FiUser />
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="row">      
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
                <div className="layout-top-spacing">
                    <div className="mt-3 d-grid gap-3">
                        <div>
                            <h3>Profile</h3>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-2 col-lg-12 col-md-4">
                                            {randerUserAvatar()}
                                        </div>
                                        <div className="col-xl-10 col-lg-12 col-md-8">
                                            <button type="button" className="btn btn-secondary mb-3 w-100" onClick={handleAvatarSelect}>Pick an Image</button>
                                            <button type="button" className="btn btn-light-dark w-100" onClick={clearAvatarInput} disabled={!avatar}>Remove</button>
                                            <input
                                                className="form-control file-upload-input"
                                                type="file"
                                                accept="image/*"
                                                name="avatar"
                                                onChange={(e) => handleAvatarUpdate(e.target.files[0])}
                                                ref={avatarInputRef}
                                                hidden
                                            />
                                            {avatarErrorMessage && 
                                                <small className="text-danger mb-0">
                                                    {avatarErrorMessage}
                                                </small>
                                            }
                                            {avatarSuccessMessage && 
                                                <small className="text-success mb-0">
                                                    {avatarSuccessMessage}
                                                </small>
                                            }
                                        </div>
                                    
                                        <div className="col-xl-12 col-lg-12 col-md-12 mt-4">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input 
                                                            style={{outline: "none", border: "none", background: "#eaeaec"}} 
                                                            type="text" 
                                                            className="form-control mb-0" 
                                                            id="id_title" 
                                                            placeholder="title"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            onBlur={handleTitleUpdate}
                                                        />
                                                        {titleErrorMessage && 
                                                            <small className="text-danger mb-0">
                                                                {titleErrorMessage}
                                                            </small>
                                                        }
                                                        {titleSuccessMessage && 
                                                            <small className="text-success mb-0">
                                                                {titleSuccessMessage}
                                                            </small>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mt-3">
                                                    <div className="form-group">
                                                        <textarea 
                                                            style={{outline: "none", border: "none", background: "#eaeaec"}} 
                                                            className="form-control" 
                                                            rows="3" 
                                                            maxLength="80" 
                                                            id="id_bio" 
                                                            placeholder="Bio"
                                                            value={bio}
                                                            onChange={(e) => setBio(e.target.value)}
                                                            onBlur={handleBioUpdate}
                                                        />
                                                        {bioErrorMessage && 
                                                            <small className="text-danger mb-0">
                                                                {bioErrorMessage}
                                                            </small>
                                                        }
                                                        {bioSuccessMessage && 
                                                            <small className="text-success mb-0">
                                                                {bioSuccessMessage}
                                                            </small>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="col-xl-12 col-lg-12 col-md-12 mt-5 mb-4" />
                                        <div>
                                            <Link to="/admin/settings#SocialLinks" className="btn btn-outline-secondary">Add social icons</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 border-start" style={{ minHeight: "100vh"}}></div>
        </div>
    )
}

export default AppearancePage;