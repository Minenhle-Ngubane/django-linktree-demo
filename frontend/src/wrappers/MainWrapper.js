import { Fragment } from 'react';
import useAuthStore from '../store/authStore';
import { useLocation } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Navbar from '../components/common/Navbar';
import Preview from '../components/common/Preview';


const MainWrapper = ({ children }) => {
    const isLoading = useAuthStore((state) => state.isLoading);
    const location = useLocation();

    if (isLoading) {
        return <Loader />
    }

    return (
        <Fragment>
            <Navbar />
            {location.pathname !== "/admin/account" ? <Preview /> : null}

            <div className="main-container sidebar-closed sbar-open" id="container">
                <div id="content" className="main-content" style={{marginLeft:"0"}}>
                    <div className="layout-px-spacing">
                        <div className="middle-content container-xxl p-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MainWrapper;
