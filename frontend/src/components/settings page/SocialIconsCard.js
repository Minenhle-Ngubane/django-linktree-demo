import React, { Fragment, useState } from 'react';
import { useSocialLinkStore } from '../../store/socialLinksStore';
import { SearchIconModel, AddIconModel } from './Models';
import SocialLink from './SocialLink';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';


const SocialIconsCard = () => {
    const { socialLinks, isLoading, error } = useSocialLinkStore();
    
    const [isSearchIconModalOpen, setIsSearchIconModalOpen] = useState(false);
    const [isAddIconModalOpen, setIsAddIconModalOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("");

    const openSearchIconModal = () => setIsSearchIconModalOpen(true);
    const closeSearchIconModal = () => setIsSearchIconModalOpen(false);
    const openAddIconModal = () => {
        setIsSearchIconModalOpen(false);
        setIsAddIconModalOpen(true);
    };
    const closeAddIconModal = () => setIsAddIconModalOpen(false);
    const backToSearchIconModal = () => {
        setIsSearchIconModalOpen(true);
        setIsAddIconModalOpen(false);
    };

    return (
        <Fragment>
            <div>
                <h3>Social Icons </h3>
                <div className="card" id="SocialLinks">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <h6><b>Be iconic</b></h6>
                                <p>Add icons linking to your social profiles, email and more</p>
                                <button className="btn btn-secondary my-3" onClick={openSearchIconModal}>Add icon</button>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 mt-4 d-grid gap-3 mb-4">
                                {isLoading ? (
                                    <h5 className="text-center w-100"> <Spinner color={"dark"} /> Loading your social icons...</h5>
                                ) : error ? (
                                    <Alert type="danger" message={error} />
                                ) : (
                                    <Fragment>
                                        {socialLinks.map((link) => (
                                            <SocialLink 
                                                link={link} 
                                                key={link.id} 
                                                setIsSearchIconModalOpen={setIsSearchIconModalOpen}
                                                isSearchIconModalOpen={isSearchIconModalOpen}
                                            />
                                        ))}
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isSearchIconModalOpen && (
                <SearchIconModel 
                    closeModal={closeSearchIconModal} 
                    openAddIconModal={openAddIconModal} 
                    setSelectedIcon={setSelectedIcon} 
                />
            )}
            {isAddIconModalOpen && (
                <AddIconModel 
                    closeModal={closeAddIconModal} 
                    backToSearchIconModal={backToSearchIconModal} 
                    selectedIcon={selectedIcon} 
                />
            )}
        </Fragment>
    )
}

export default SocialIconsCard;