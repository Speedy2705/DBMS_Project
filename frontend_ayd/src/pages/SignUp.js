import React from 'react'
import './signup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import imageTobase64 from '../helpers/imageTobase64';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        dateOfBirth: null,
        confirmPassword: "",
        profilePictureture: ""
    })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate('/login');
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error("Please check Password and Confirm Password")
        }

    }

    const handleUploadPic = async (e) => {
        const profilePicture = document.getElementById('profile-pic');
        profilePicture.src = URL.createObjectURL(e.target.files[0]);
        profilePicture.classList.remove('hidden');
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePicture: imagePic
            }
        })
    }
    return (
        <div class="flex items-center justify-center min-h-screen bg-gradient p-6">
            <div id="watermark" className='cursor-wait z-0'>
                <img src='AskUrDoc1.png' alt="Watermark" className='' />
            </div>
            <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-2xl shadow-lg space-y-6">
                <h2 class="text-3xl font-semibold text-center text-charcoal">Ask Ur Doctor - Sign Up</h2>
                <p class="text-center text-gray-600">Sign up to connect with certified medical professionals</p>

                <form onSubmit={handleSubmit} class="space-y-5">

                    <div class="flex justify-center">
                        <div class="photo-box relative w-24 h-24 rounded-full shadow-inner overflow-hidden flex items-center justify-center">
                            <img id="profile-pic" src='profile_gif.gif' alt="Profile Picture" class="w-full h-full object-cover absolute top-0 left-0 z-5 blur-sm" />
                            <input type="file" id="photo-upload" name="profilePicture" accept="image/*" onChange={handleUploadPic} class="absolute w-full h-full opacity-0 cursor-pointer z-10 bg-transparent" />
                        </div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <label for="username" class="w-1/3 text-charcoal font-semibold">Username:</label>
                        <input name='username'
                            value={data.name}
                            onChange={handleOnChange} type="text" id="username" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your username" />
                    </div>

                    <div class="flex items-center space-x-4">
                        <label for="email" class="w-1/3 text-charcoal font-semibold">Email:</label>
                        <input name='email'
                            value={data.name}
                            onChange={handleOnChange} type="email" id="email" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" />
                    </div>


                    <div class="flex space-x-7 items-center">
                        <label for="gender" class="w-1/4 text-charcoal font-semibold">Gender:</label>
                        <select name='gender'
                            value={data.name}
                            onChange={handleOnChange} id="gender" class="text-black z-10 bg-transparent w-1/4 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="" disabled selected>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label for="dob" class="w-1/4 text-charcoal font-semibold">Date of Birth:</label>
                        <input name='dateOfBirth'
                            value={data.name}
                            onChange={handleOnChange} type="date" id="dob" class="z-10 bg-transparent w-1/4 p-2 border rounded-lg border-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>


                    <div class="flex items-center space-x-4">
                        <label for="password" class="w-1/3 text-charcoal font-semibold">Password:</label>
                        <input name='password'
                            value={data.name}
                            onChange={handleOnChange} type="password" id="password" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password" />
                    </div>


                    <div class="flex items-center space-x-4">
                        <label for="confirm-password" class="w-1/3 text-charcoal font-semibold">Confirm Password:</label>
                        <input name='confirmPassword'
                            value={data.name}
                            onChange={handleOnChange} type="password" id="confirm-password" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Confirm your password" />
                    </div>

                    <div class="flex justify-center mt-6">
                        <button type="submit" class="z-10 bg-primary px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Create Account</button>
                    </div>
                </form>
                <div class="text-center mt-4 z-10">
                    <br />
                    <br />
                    <Link to={"/login"} class="text-gray-400 hover:text-gray-600 font-semibold z-10">Already have an account? Login here</Link>
                </div>
            </div>
            <ToastContainer
                position='top-right'
            />
        </div>
    )
}

export default SignUp
