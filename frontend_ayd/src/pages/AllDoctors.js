import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditDoctor from '../components/EditDoctor';
import AddDoctor from '../components/AddDoctor'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [openAddDoctor, setOpenAddDoctor] = useState(false);
    const [openEditDoctor, setOpenEditDoctor] = useState(false);
    const [doctorId, setDoctorId] = useState(null);

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

    const deleteDoctor = async (doctorId) => {
        try {
            const response = await fetch(`${SummaryApi.deleteDoctor.url}/${doctorId}`, {
                method: SummaryApi.deleteDoctor.method,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Doctor deleted successfully!');
                fetchDoctors();
            } else {
                toast.error(data.message || 'Failed to delete the doctor.');
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
            toast.error('An error occurred while deleting the doctor.');
        }
    };

    const handleEditDoctor = (doctorId) => {
        setDoctorId(doctorId);
        setOpenEditDoctor(true);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div>
            <button
                className='border-2 py-1 rounded-full px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
                onClick={() => setOpenAddDoctor(true)}
            >
                Add Doctor
            </button>

            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4 text-center">Doctor List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.doctor_id} className="bg-white group shadow-md border flex flex-col justify-between rounded-lg p-4">
                            <div>
                                {doctor.image && <img src={doctor.image} alt={doctor.full_name} className="w-full h-40 object-cover rounded-t-lg mb-4" />}
                                <h2 className="text-2xl font-bold mb-2">{doctor.full_name}</h2>
                                <p className="text-gray-700 mb-1"><strong>Speciality:</strong> {doctor.speciality}</p>
                                <p className="text-gray-700 mb-1"><strong>Distance:</strong> {doctor.distance}</p>
                                <p className="text-gray-700 mb-1"><strong>Contact:</strong> {doctor.contact}</p>
                                <p className="text-gray-700 mb-1"><strong>Address:</strong> {doctor.address}</p>
                                <p className="text-gray-700"><strong>Pincode:</strong> {doctor.pincode}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='group-hover:text-white group-hover:block hidden text-sm rounded-full w-5 h-5 pl-[calc(3px)] pt-0.5 group-hover:bg-red-700 mt-5'>
                                    <button onClick={() => deleteDoctor(doctor.doctor_id)}><MdDelete /></button>
                                </div>
                                <div className='group-hover:text-white group-hover:block hidden text-sm rounded-full w-5 h-5 pl-[calc(3px)] pt-0.5 group-hover:bg-green-700 mt-5'>
                                    <button onClick={() => handleEditDoctor(doctor.doctor_id)}><MdEdit /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openAddDoctor && (
                <AddDoctor onClose={() => setOpenAddDoctor(false)} fetchDoctors={fetchDoctors} />
            )}

            {openEditDoctor && (
                <EditDoctor doctorId={doctorId} onClose={() => setOpenEditDoctor(false)} fetchDoctors={fetchDoctors()} />
            )}
        </div>
    );
};

export default AllDoctors;
