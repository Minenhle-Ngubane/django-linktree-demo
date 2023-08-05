import React from 'react';
import { Link as Anchor } from 'react-router-dom';


const Link = ({ link }) => {
    if (link.is_visible) {
        return (
            <Anchor
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-container animated-link px-3 pt-1 pb-0 d-flex justify-content-between align-items-center w-100"
                style={{ height: "auto" }}
            >
                <div className="thumbnail p-0 m-0" />
                <span className="fs-6 align-self-center text-center p-0 m-0" style={{ fontWeight: "600"}}>
                    { link.title }
                </span>
                <div style={{ width: "48px", height: "48px"}} />
            </Anchor>
        )
    }
}

export default Link;