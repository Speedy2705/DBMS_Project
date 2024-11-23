import React from 'react';
import { CgClose } from 'react-icons/cg';

const InfoBox = ({ position, x, y, detail, onClose }) => {
    return (
        <div className="animate-pop-up relative w-28 bg-white border border-gray-300 p-2 z-[calc(100)]" style={{ top: y, left: x }}>
            
            <div className='relative w-full flex justify-between'>
            <strong>{position}</strong>
                <div className='cursor-pointer relative bottom-2 right-0 text-2xl hover:text-red-700' onClick={onClose}>x</div>
            </div>
            {detail && <p className="text-sm mt-1">{detail}</p>}
        </div>
    );
};

export default InfoBox;
