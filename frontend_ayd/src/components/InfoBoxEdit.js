import React, { useState, useEffect } from 'react';
import './HumanBody.css'; // Ensure the CSS file is imported

const InfoBoxEdit = ({ position, x, y, cut: initialCut, pain: initialPain, swell: initialSwell, onClose, onSave }) => {
  const [cut, setCut] = useState(initialCut);
  const [pain, setPain] = useState(initialPain);
  const [swell, setSwell] = useState(initialSwell);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setCut(initialCut);
    setPain(initialPain);
    setSwell(initialSwell);
  }, [initialCut, initialPain, initialSwell]);

  const handleSave = () => {
    onSave({ cut, pain, swell });
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // Delay to allow animation to complete
  };

  return (
    <div className={`animate-pop-up relative w-96 bg-white rounded-xl border border-gray-300 p-5  ${closing ? 'shrink-down' : ''}`} style={{ top: y, left: x }}>
      <div className='relative w-full flex justify-between'>
        <strong className='capitalize text-2xl pb-3'>{position}</strong>
        <div className='cursor-pointer relative bottom-2 right-0 text-2xl hover:text-red-700' onClick={handleClose}>x</div>
      </div>
      <label className="block my-3 text-lg font-bold">Cut :</label>
      <textarea
        value={cut}
        onChange={(e) => setCut(e.target.value)}
        className="w-full p-2 h-20 text-gray-700 mb-3 border-gray-400 border rounded-2xl"
      />
      <label className="block my-3 text-lg font-bold">Pain :</label>
      <textarea
        value={pain}
        onChange={(e) => setPain(e.target.value)}
        className="w-full p-2 h-20 text-gray-700 mb-3 border-gray-400 border rounded-2xl"
      />
      <label className="block my-3 text-lg font-bold">Swell :</label>
      <textarea
        value={swell}
        onChange={(e) => setSwell(e.target.value)}
        className="w-full p-2 h-20 text-gray-700 mb-3 border-gray-400 border rounded-2xl"
      />
      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2">Save</button>
    </div>
  );
};

export default InfoBoxEdit;
