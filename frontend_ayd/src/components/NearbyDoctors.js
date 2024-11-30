import React, { useState } from 'react';
import './NearbyDoctors.css';
import HumanBody from './HumanBody';
import SummaryApi from '../common';
import bodyParts from '../helpers/bodyParts';

const NearbyDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [pincode, setPincode] = useState('');
    const [bodyPart, setBodyPart] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pincode') {
            setPincode(value);
        } else if (name === 'bodyPart') {
            setBodyPart(value);
        }
    };

    const filterDoctors = async () => {
        try {
            const response = await fetch(`${SummaryApi.nearbyDoctors.url}?pincode=${pincode}&bodyPart=${bodyPart}`, {
                method: SummaryApi.nearbyDoctors.method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const doctors = await response.json();
            setDoctors(doctors);
            console.log(doctors);

        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterDoctors();
    };

    return (
        <div className="flex items-center justify-around gap-11 bg-gradient p-6">
            <div className="bg-white p-8 md:p-12 rounded-3xl w-[calc(600px)] max-w-4xl shadow-lg space-y-8">
                <h2 className="text-3xl font-semibold text-center text-charcoal">Contact Nearby Doctors</h2>
                <p className="text-center text-gray-600">Find and reach out to doctors near your location</p>

                <form id="searchForm" className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="location" className="w-1/4 text-charcoal font-semibold">Your Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="pincode"
                            value={pincode}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your pin code"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <label htmlFor='bodyPart' className='w-1/4 text-charcoal font-semibold'>Body Part:</label>
                        <select
                            id="bodyPart"
                            name="bodyPart"
                            value={bodyPart}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="" disabled>Select a body part</option>
                            {bodyParts.map((el, index) => (
                                <option value={el.bodyPart} key={el.bodyPart + index}>{el.speciality}: {el.bodyPart}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Find Doctors</button>
                    </div>
                </form>

                <div id="resultsSection" className={`space-y-4 mt-8 ${doctors.length ? '' : 'hidden'}`}>
                    <h3 className="text-xl font-semibold text-charcoal">Available Doctors:</h3>

                    <div id="doctorsList" className="space-y-4">
                        {doctors.map((doc) => (
                            <div key={doc.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-10 space-x-4">
                                <img src={doc.image || 'askurdoc.jpg'} alt={doc.name} className="w-24 h-24 ml-5 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-lg font-semibold text-charcoal">{doc.full_name}</h4>
                                    <p className="text-gray-600">
                                        {doc.specialist ? (doc.specialist.charAt(0).toUpperCase() + doc.specialist.slice(1)) : ''}
                                    </p>
                                    <p className="text-gray-600">{doc.contact}</p>
                                    <p className="text-gray-600">{doc.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <HumanBody />
        </div>
    );
};

export default NearbyDoctors;
