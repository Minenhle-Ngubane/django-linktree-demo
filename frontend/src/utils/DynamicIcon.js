import React from 'react';
import { IconContext } from 'react-icons';
import * as PiIcons from 'react-icons/pi';
import { BsSignal } from 'react-icons/bs';
import { GrAppleAppStore } from 'react-icons/gr';
import { LiaBandcamp } from 'react-icons/lia';
import { FaEtsy } from 'react-icons/fa';
import { FiLinkedin } from 'react-icons/fi';
import { SiSubstack } from 'react-icons/si';


const iconComponents = {
    ...PiIcons,
    BsSignal,
    GrAppleAppStore,
    LiaBandcamp,
    FaEtsy,
    FiLinkedin,
    SiSubstack,
};


const DynamicIcon = ({ name, size, color }) => {
    const IconComponent = iconComponents[name];

    if (!IconComponent) {
        console.warn(`Icon ${name} is not supported.`);
        return null;
    }

    return (
        <IconContext.Provider value={{ size, color }}>
            <IconComponent />
        </IconContext.Provider>
    );
};

export default DynamicIcon;
