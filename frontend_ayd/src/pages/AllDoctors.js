// src/components/AllDoctors.js
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import AddDoctor from '../components/AddDoctor';

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [openAddDoctor, setOpenAddDoctor] = useState(false);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(SummaryApi.allDoctor.url, {
                method: SummaryApi.allDoctor.method,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setDoctors(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div>
            <button className='border-2 py-1 rounded-full px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
              onClick={() => setOpenAddDoctor(true)}
            >Add Doctor</button>

            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4 text-center">Doctor List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.doctor_id} className="bg-white shadow-md rounded-lg p-4">
                            {doctor.image && <img src={doctor.image} alt={doctor.full_name} className="w-full h-40 object-cover rounded-t-lg mb-4" />}
                            <h2 className="text-2xl font-bold mb-2">{doctor.full_name}</h2>
                            <p className="text-gray-700 mb-1"><strong>Speciality:</strong> {doctor.speciality}</p>
                            <p className="text-gray-700 mb-1"><strong>Distance:</strong> {doctor.distance}</p>
                            <p className="text-gray-700 mb-1"><strong>Contact:</strong> {doctor.contact}</p>
                            <p className="text-gray-700 mb-1"><strong>Address:</strong> {doctor.address}</p>
                            <p className="text-gray-700"><strong>Pincode:</strong> {doctor.pincode}</p>
                        </div>
                    ))}
                </div>
            </div>

            {
                openAddDoctor && (
                    <AddDoctor onClose={() => setOpenAddDoctor(false)} fetchDoctors={fetchDoctors} />
                )
            }
        </div>
    );
};

export default AllDoctors;
