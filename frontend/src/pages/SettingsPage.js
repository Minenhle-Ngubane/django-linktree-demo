import MetaDataCard from '../components/settings page/MetaDataCard';
import SocialIconsCard from '../components/settings page/SocialIconsCard';


const SettingsPage = () => {

    return (
        <div className="row">      
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 mx-auto  mb-5">
                <div className="layout-top-spacing">
                    <div className="mt-3 d-grid gap-5">
                        <SocialIconsCard />
                        <MetaDataCard />
                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 border-start" style={{ minHeight: "100vh"}} />
        </div>
    )
}

export default SettingsPage;