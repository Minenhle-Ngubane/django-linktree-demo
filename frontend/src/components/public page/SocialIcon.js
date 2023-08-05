import React from 'react';
import { Link } from 'react-router-dom';
import DynamicIcon from '../../utils/DynamicIcon';


const SocialIcon = ({ icon }) => {
    if(icon.is_visible) {
        return (
            <Link
                to={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon px-2"
            >
                <DynamicIcon name={icon.aliase} size={30} color="black" />
            </Link>
        )
    }
}

export default SocialIcon;