import React from 'react';

const InfoBox = ({ position, x, y, cut, pain, swell, onClose }) => {
    return (
        <div className="animate-pop-up relative w-48 bg-white border border-gray-300 p-2 z-[calc(100)]" style={{ top: y, left: x }}>
            
            <div className='relative w-full flex justify-between'>
            <strong>{position}</strong>
                <div className='cursor-pointer relative bottom-2 right-0 text-2xl hover:text-red-700' onClick={onClose}>x</div>
            </div>
            <label className="block mb-1">Cut</label>
            <p className="w-full p-1 mb-2">{cut}</p>
            <label className="block mb-1">Pain</label>            
            <p className="w-full p-1 mb-2">{pain}</p>
            <label className="block mb-1">Swell</label>
            <p className="w-full p-1 mb-2">{swell}</p>
        </div>
    );
};

export default InfoBox;
