import React, { Fragment, useState } from 'react';
import useLinkStore from '../store/linkStore';
import LinkCard from '../components/links page/LinkCard';
import UserPageUrl from '../components/links page/UserPageUrl';
import AddLinkForm from '../components/links page/AddLinkForm';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';


const LinksPage = () => {
    const links = useLinkStore((state) => state.links);
    const isLoading = useLinkStore((state) => state.isLoading);
    const createLink = useLinkStore((state) => state.createLink);
    const updateLink = useLinkStore((state) => state.updateLink);
    const deleteLink = useLinkStore((state) => state.deleteLink);
    const error = useLinkStore((state) => state.error);
    const linkStateError = useLinkStore((state) => state.linkStateError);

    const [url, setUrl] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleAddLink = () => {
        setIsCreating(true);
        createLink({title: url, url: `https://${url}`});
        setShowForm(false);
        setUrl("");
        setIsCreating(false);
    };

    return (
        <div className="row">
            <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
                <UserPageUrl />
            </div>
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 border-start" />

            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 mx-auto mb-5">
                <div className="layout-top-spacing">
                    {linkStateError && <Alert type="danger" message={linkStateError} />}
                </div>

                <div className="layout-top-spacing">
                    {showForm ? (
                        <AddLinkForm 
                            setUrl={setUrl} 
                            handleAddLink={handleAddLink} 
                            setShowForm={setShowForm} 
                        />
                    ) : (
                        <button type="button" className="btn btn-secondary w-100" onClick={()=> setShowForm(true)}>
                           {isCreating ? <Spinner color={"white"} /> : "Add link"}
                        </button>
                    )}
                </div>
                
                <div className="layout-top-spacing">
                    <div className="mt-3 d-grid gap-3">
                        {isLoading ? (
                            <h5 className="text-center w-100"> <Spinner color={"dark"} /> Loading your links...</h5>
                        ) : error ? (
                            <Alert type="danger" message={error} />
                        ) : links.length === 0 ? (
                            <h5 className="text-center w-100">You have no links yet.</h5>
                        ) : (
                            <Fragment>
                                {links?.map((link) => (
                                    <LinkCard 
                                        link={link} 
                                        key={link.id} 
                                        updateLink={updateLink}
                                        deleteLink={deleteLink}
                                    />
                                ))}
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 border-start" style={{ minHeight: "100vh"}}></div>
        </div>
    )
}

export default LinksPage;