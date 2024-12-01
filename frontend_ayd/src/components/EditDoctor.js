import React, { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import imageTobase64 from '../helpers/imageTobase64';
import bodyParts from '../helpers/bodyParts';

const EditDoctor = ({ doctorId, onClose, fetchDoctors }) => {
    const [data, setData] = useState({
        full_name: '',
        distance: '',
        speciality: '',
        image: '',
        address: '',
        contact: '',
        pincode: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchDoctorDetails = async () => {
        try {
            const response = await fetch(`${SummaryApi.getDoctorDetails.url}/${doctorId}`, {
                method: SummaryApi.getDoctorDetails.method,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    };

    const handleUploadPic = async (e) => {
        const image = document.getElementById('profile-pic');
        image.src = URL.createObjectURL(e.target.files[0]);
        image.classList.remove('hidden');
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);

        setData((prev) => ({
            ...prev,
            image: imagePic
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${SummaryApi.editDoctor.url}/${doctorId}`, {
                method: SummaryApi.editDoctor.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchDoctors();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error updating doctor:', error);
            toast.error('Failed to update doctor details');
        }
    };

    useEffect(() => {
        fetchDoctorDetails();
    }, [doctorId]);

    return (
        <div className='text-white fixed w-full h-full top-0 left-0 flex justify-center items-center backdrop-blur-sm'>
            <div className='p-4 rounded-3xl w-full max-w-2xl h-full max-h-[80%] overflow-hidden' style={{ background: 'linear-gradient(to top, #E3F2FD, #90CAF9)' }}>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='text-black font-bold text-2xl'>Edit Doctor</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full scrollbar-none' onSubmit={handleSubmit}>
                    <label htmlFor='image' className='mt-3'></label>
                    <label htmlFor='uploadImageInput'>
                        <div className="flex justify-center">
                            <div className="photo-box relative w-24 h-24 border border-gray-600 rounded-full shadow-inner overflow-hidden flex items-center justify-center">
                                <img id="profile-pic" src='profile_gif.gif' alt="Profile Picture" className="w-full h-full object-cover absolute top-0 left-0 z-5 blur-sm" />
                                <input type="file" id="uploadImageInput" name="image" accept="image/*" onChange={handleUploadPic} className="absolute w-full h-full opacity-0 cursor-pointer z-10 bg-transparent" />
                            </div>
                        </div>
                    </label>

                    <label className='text-black font-semibold' htmlFor='full_name'>Doctor Name :</label>
                    <input
                        type='text'
                        id='full_name'
                        placeholder='Enter doctor name'
                        name='full_name'
                        value={data.full_name}
                        onChange={handleChange}
                        className='text-slate-800 py-2 px-3 border rounded-xl'
                        required
                    />

                    <label htmlFor='distance' className='text-black font-semibold mt-3'>Distance :</label>
                    <input
                        type='text'
                        id='distance'
                        placeholder='Enter distance'
                        name='distance'
                        value={data.distance}
                        onChange={handleChange}
                        className='text-slate-800 py-2 px-3 border rounded-xl'
                    />

                    <label htmlFor='speciality' className='text-black font-semibold mt-3'>Speciality :</label>
                    <select required value={data.speciality} name='speciality' onChange={handleChange} className='py-2 px-3 border rounded-xl text-slate-800'>
                        <option value={""}>Select speciality</option>
                        {
                            bodyParts.map((el, index) => (
                                <option value={el.bodyPart} key={el.bodyPart + index}>{el.speciality} : {el.bodyPart}</option>
                            ))
                        }
                    </select>

                    <label htmlFor='contact' className='text-black font-semibold mt-3'>Contact Details :</label>
                    <input
                        required
                        type='number'
                        id='contact'
                        placeholder='Enter contact'
                        name='contact'
                        value={data.contact}
                        onChange={handleChange}
                        className='text-slate-800 py-2 px-3 border rounded-xl'
                    />

                    <label htmlFor='pincode' className='text-black font-semibold mt-3'>Pincode :</label>
                    <input
                        required
                        type='number'
                        id='pincode'
                        placeholder='Enter pincode'
                        name='pincode'
                        value={data.pincode}
                        onChange={handleChange}
                        className='text-slate-800 py-2 border rounded-xl px-3'
                    />

                    <label htmlFor='address' className='text-black font-semibold mt-3'>Address :</label>
                    <textarea
                        className='text-slate-800 h-28 border resize-none px-3 py-2 rounded-xl'
                        placeholder='Enter doctor address'
                        rows={3}
                        value={data.address}
                        name='address'
                        onChange={handleChange}
                    ></textarea>

                    <button className='px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700 rounded-xl mt-4'>Update Doctor</button>
                </form>
            </div>
        </div>
    );
};

export default EditDoctor;
