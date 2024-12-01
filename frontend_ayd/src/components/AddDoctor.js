import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import imageTobase64 from '../helpers/imageTobase64'
import bodyParts from '../helpers/bodyParts'

const AddDoctor = ({
    onClose,
    fetchDoctors
}) => {
    const [data, setData] = useState({
        full_name: '',
        distance: '',
        speciality: '',
        image: '',
        address: '',
        contact: '',
        pincode: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const handleUploadPic = async (e) => {
        const image = document.getElementById('profile-pic');
        image.src = URL.createObjectURL(e.target.files[0]);
        image.classList.remove('hidden');
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                image: imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.contact.length<10 || data.contact.length>10){
            toast.error("Enter a valid phone number");
            return;
        }
        if(data.pincode.length!=6){
            toast.error("Enter a valid pincode");
            return;
        }

        const response = await fetch(SummaryApi.addDoctor.url, {
            method: SummaryApi.addDoctor.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log(responseData);

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchDoctors()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }

    }

    return (
        <div className='text-white fixed w-full h-full top-0 left-0 flex justify-center items-center backdrop-blur-sm'>
            <div className='p-4 rounded-3xl w-full max-w-2xl h-full max-h-[80%] overflow-hidden' style={{ background: 'linear-gradient(to top, #E3F2FD, #90CAF9)' }}>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-2xl text-black'>Add Doctor</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>


                <form className='grid p-4 gap-2 overflow-y-scroll h-full scrollbar-none' onSubmit={handleSubmit}>
                    <label htmlFor='image' className='mt-3'></label>
                    <label htmlFor='uploadImageInput'>
                        <div class="flex justify-center">
                            <div class="photo-box relative border border-gray-700 w-24 h-24 rounded-full shadow-inner overflow-hidden flex items-center justify-center">
                                <img id="profile-pic" src='profile_gif.gif' alt="Profile Picture" class="w-full h-full object-cover absolute top-0 left-0 z-5 blur-sm" />
                                <input type="file" id="uploadImageInput" name="image" accept="image/*" onChange={handleUploadPic} class="absolute w-full h-full opacity-0 cursor-pointer z-10 bg-transparent" />
                            </div>
                        </div>
                    </label>

                    <label className='text-black' htmlFor='full_name'>Doctor Name :</label>
                    <input
                        type='text'
                        id='full_name'
                        placeholder='enter doctor name'
                        name='full_name'
                        value={data.full_name}
                        onChange={handleChange}
                        className='text-black py-2 px-3 border rounded-xl'
                        required
                    />

                    <label htmlFor='distance' className='text-black mt-3'>Distance :</label>
                    <input
                        type='text'
                        id='distance'
                        placeholder='enter distance'
                        name='distance'
                        value={data.distance}
                        onChange={handleChange}
                        className='text-black py-2 px-3 border rounded-xl'
                    />

                    <label htmlFor='speciality' className='text-black mt-3'>Speciality :</label>
                    <select required value={data.speciality} name='speciality' onChange={handleChange} className='py-2 px-3 border rounded-xl text-black'>
                        <option value={""}>select speciality</option>
                        {
                            bodyParts.map((el, index) => {
                                return (
                                    <option value={el.bodyPart} key={el.bodyPart + index}>{el.speciality} : {el.bodyPart}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='contact' className='text-black mt-3'>Contact Details :</label>
                    <input
                        required
                        type='number'
                        id='contact'
                        placeholder='enter contact'
                        name='contact'
                        value={data.contact}
                        onChange={handleChange}
                        className='text-black py-2 px-3 border rounded-xl'
                    />

                    <label htmlFor='pincode' className='text-black mt-3'>Pincode :</label>
                    <input
                        required
                        type='number'
                        id='pincode'
                        placeholder='enter pincode'
                        name='pincode'
                        value={data.pincode}
                        onChange={handleChange}
                        className='text-black py-2 border rounded-xl px-3'
                    />

                    <label htmlFor='address' className='text-black mt-3'>Address :</label>
                    <textarea
                        className='text-black h-28 border resize-none px-3 py-2 rounded-xl'
                        placeholder='enter doctor address'
                        rows={3} cols={5}
                        value={data.address}
                        name='address'
                        onChange={handleChange}
                    >

                    </textarea>

                    <button className='px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700 rounded-xl mt-4'>Add Doctor</button>
                </form>

            </div>

        </div>
    )
}

export default AddDoctor