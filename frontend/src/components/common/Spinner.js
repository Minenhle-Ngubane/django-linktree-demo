import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Spinner = ({ color }) => {
    return <FiLoader className={`spin me-2 text-${color} align-self-center`} />
}

export default Spinner;