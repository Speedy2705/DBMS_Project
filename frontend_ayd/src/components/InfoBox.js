import React from 'react';

const InfoBox = ({ position, x, y, cut, pain, swell, onClose }) => {
    return (
        <div className="animate-pop-up relative w-56 bg-white border border-gray-300 p-5 z-[calc(100)]" style={{ top: y, left: x }}>
            
            <div className='relative w-full flex justify-between'>
            <strong className='capitalize text-2xl'>{position}</strong>
                <div className='cursor-pointer relative bottom-2 right-0 text-2xl hover:text-red-700' onClick={onClose}>x</div>
            </div>
            <label className="block my-3 text-lg font-bold">Cut :</label>
            <p className="w-full p-2 text-gray-700 mb-2 border-gray-400 border rounded-2xl">{cut}</p>
            <label className="block my-3 text-lg font-bold">Pain :</label>            
            <p className="w-full p-2 text-gray-700 mb-2 border-gray-400 border rounded-2xl">{pain}</p>
            <label className="block my-3 text-lg font-bold">Swell :</label>
            <p className="w-full p-2 text-gray-700 mb-2 border-gray-400 border rounded-2xl">{swell}</p>
        </div>
    );
};

export default InfoBox;
