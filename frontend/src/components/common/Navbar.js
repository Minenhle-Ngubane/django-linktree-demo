import { Link, useLocation } from 'react-router-dom';
import { AiOutlinePicCenter } from 'react-icons/ai';
import { IoShapesOutline } from 'react-icons/io5';
import { RiSettingsLine } from 'react-icons/ri';
import { FiUser, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';


const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const location = useLocation();

    const isActiveLink = (linkPath) => {
        return location.pathname === linkPath ? "text-secondary" : "";
    };

    const randerUserAvatar = () => {
        const getInitials = (name) => {
            const words = name.split(" ");
            const initials = words.map((word) => word[0].toUpperCase());
            return initials.join("");
        };
          
        if(user?.profile.avatar){
            return <img alt="avatar" src={user.profile.avatar} className="rounded-circle" />
        } else {
            return (
                <span className="avatar-title rounded-circle">
                    {user?.user.name? getInitials(user?.user.name) : user?.user.username[0].toUpperCase() || user?.user.email[0].toUpperCase()}
                </span>
            )
        }
    }

    return (
        <div className="header-container container-xxl" style={{left: 0, width: "calc(100% - 48px)"}}>
            <header className="header navbar navbar-expand-sm expand-header">
                <div className="flex-row fw-bold text-muted">
                    <Link to="/admin" className={`me-3 ${isActiveLink("/admin")}`}> 
                        <AiOutlinePicCenter size={20}/> <span>Links</span>
                    </Link>
                    <Link to="/admin/appearance" className={`me-3 ${isActiveLink("/admin/appearance")}`}>
                        <IoShapesOutline size={20} /> <span>Appearance</span>
                    </Link>
                    <Link to="/admin/settings" className={`me-3 ${isActiveLink("/admin/settings")}`}>
                        <RiSettingsLine size={20} /> <span>Settings</span>
                    </Link>
                </div>
                
                <ul className="navbar-item flex-row ms-lg-auto ms-0">
                    <li className="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
                        <Link className="nav-link dropdown-toggle user" id="userProfileDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar-container">
                                <div className="avatar avatar-sm avatar-indicators avatar-online">
                                    {randerUserAvatar()}
                                </div>
                            </div>
                        </Link>

                        <div className="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown">
                            <div className="user-profile-section">
                                <div className="media mx-auto">
                                    <div className="media-body">
                                        <h5>{user?.user.name || user?.user.email}</h5>
                                        <p>linktr.ee/{user?.user.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/admin/account">
                                    <FiUser /> <span>My account</span>
                                </Link>
                            </div>
                            <div className="dropdown-item">
                                <Link onClick={logout}>
                                    <FiLogOut /> <span>Sign out</span>
                                </Link>
                            </div>
                        </div> 
                    </li>
                </ul>
            </header>
        </div>
    )
}

export default Navbar;