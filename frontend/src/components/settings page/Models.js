import React, { useState, useEffect } from 'react';
import { PiCaretRightLight, PiCaretLeftLight } from "react-icons/pi";
import { useSocialLinkStore } from '../../store/socialLinksStore';
import { Icons } from '../../utils/Icons';
import DynamicIcon from '../../utils/DynamicIcon';
import '../../css/modal.css';



export const SearchIconModel = ({ closeModal, openAddIconModal, setSelectedIcon }) => {
    const { socialLinks } = useSocialLinkStore();
    const [searchText, setSearchText] = useState("");
    const [filteredIcons, setFilteredIcons] = useState(Icons);

    useEffect(() => {
        setSearchText("");
        setFilteredIcons(Icons);
    }, []);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchText(value);
        filterIcons(value);
    };
    

    const filterIcons = (searchText) => {
        const filtered = Icons.filter((icon) =>
            icon.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredIcons(filtered);
    };

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        openAddIconModal();
    };

    const linkItem = (icon) => {
        const matchedSocialLink = socialLinks.find((link) => link.icon === icon.name);

        return (
            <div 
                style={{ fontWeight: "600"}}
                className="d-flex justify-content-between px-3 fs-6 mb-3" 
                data-icon={icon.name} 
                onClick={() => (
                    matchedSocialLink && matchedSocialLink.is_added ? null : handleIconClick(icon.name)    
                )}
                key={icon.name}
            >
                <div>
                    <DynamicIcon name={icon.icon} size={23} color="black" />
                    <span className="ps-2">{icon.name}</span>
                </div>
                <button className="btn btn-icon bg-white border-0">
                    {matchedSocialLink && matchedSocialLink.is_added ? (
                        <span className="text-success fw-bold">Already added</span>
                    ):(
                        <PiCaretRightLight />
                    )}
                    
                </button>
            </div>
        )
    }


    return (
        <div className="modal modal-overlay fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center d-flex justify-content-end border-0">
                        <h5 className="modal-title">Add icon</h5>
                        <button type="button" className="btn-close" onClick={closeModal} />
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input 
                                style={{outline: "none", border: "none", background: "#eaeaec"}} 
                                type="text" 
                                className="form-control" 
                                placeholder="Search" 
                                value={searchText}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </div>
                        <div className="mt-3" style={{ maxHeight: "200px", minHeight: "200px", overflow: "auto" }}>
                            {filteredIcons.map((icon) => (
                                linkItem(icon)
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const AddIconModel = ({ closeModal, backToSearchIconModal, selectedIcon }) => {
    const { createSocialLink } = useSocialLinkStore();
    const [socialLink, setSocialLink] = useState("");
    const [error, setError] = useState("")

    const handleAddSocialLink = async () => {
        try {
            const { error } = await createSocialLink({icon: selectedIcon, url: `https://${socialLink}`});

            if (error) {
                setError(error.data.url);
            } else {
                setError("");
                setSocialLink("");
                closeModal();
            }
        } catch (error) {
            setError("Failed add social icon. Please try again.");
        }
    };

    return (
        <div className="modal modal-overlay fade show" style={{ display: "block"}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content">
                    <div className="modal-header border-0 d-flex justify-content-between">
                        <button 
                            className="btn btn-icon bg-white border-0" 
                            onClick={backToSearchIconModal}
                        >
                            <PiCaretLeftLight />
                        </button>
                        <h5 className="modal-title">Add {selectedIcon} icon</h5>
                        <button type="button" className="btn-close" onClick={closeModal}/>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-0">
                            <input 
                                type="text" 
                                className={`form-control bg-light ${error ? "border-danger" : ""}`} 
                                placeholder={`Enter ${selectedIcon} URL*`}
                                onChange={(e) => setSocialLink(e.target.value)}
                                value={socialLink}
                                autoFocus    
                            />
                        </div>
                        {error && 
                            <small className="text-danger mb-0">
                                {error}
                            </small>
                        }
                        <button type="button" className="btn btn-secondary w-100 mt-4" onClick={handleAddSocialLink}>Add to linktree</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const EditIconModel = ({ closeModal, link }) => {
    const { updateSocialLink, deleteSocialLink } = useSocialLinkStore();
    const [url, setUrl] = useState(link.url);

    const handleUrlUpdate = () => {
        const updatedLink = { ...link, url };
        updateSocialLink(link.id, updatedLink);
        closeModal();
    };

    const handleDelete = () => {
        deleteSocialLink(link.id);
        closeModal();
    };


    return (
        <div className="modal modal-overlay fade show" style={{ display: "block"}}>
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content">
                    <div className="modal-header border-0 d-flex justify-content-between">
                        <h5 className="modal-title">Edit Instagram</h5>
                        <button type="button" className="btn-close" onClick={closeModal} />
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input 
                                style={{outline: "none", border: "none", background: "#eaeaec"}}
                                type="text" 
                                className="form-control" 
                                placeholder="URL" 
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                                autoFocus  
                            />
                        </div>
                        <button type="button" className="btn btn-secondary w-100" onClick={handleUrlUpdate}>Save</button>
                        <button type="button" className="btn btn-light-dark w-100 mt-3" onClick={handleDelete}>Remove icon</button>
                    </div>
                </div>
            </div>
        </div>
    )
}