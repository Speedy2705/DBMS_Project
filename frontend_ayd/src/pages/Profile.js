import React, { useEffect, useState } from 'react';
import './Profile.css';
import Health from '../components/Health';
import SummaryApi from '../common'; // Import your API configuration

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        profilePic: '',
        gender:'',
        dateOfBirth:''
    });

    const fetchUserData = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();

            setUserData({
                username: data.data.username,
                email: data.data.email,
                profilePic: data.data.profilePicture || 'askurdoc.jpg',
                gender: data.data.gender,
                dateOfBirth: new Date(data.data.dateOfBirth).toLocaleDateString()
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient p-6">
            <div className="bg-white p-8 md:p-12 rounded-3xl w-full max-w-4xl shadow-lg space-y-8">
                <div className='flex justify-around'>
                    <div className='flex flex-col gap-3'>
                        <h2 className="text-3xl font-semibold text-center text-charcoal">User Profile</h2>
                        <div className="photobox mt-6">
                            <img src={userData.profilePic} className='w-full object-fill h-full' alt="User Profile Photo" id="profilePic" />
                        </div>
                    </div>
                    <div className="space-y-5 mt-8">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="username" className="w-1/3 text-charcoal font-semibold">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={userData.username}
                                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label htmlFor="email" className="w-1/3 text-charcoal font-semibold">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={userData.email}
                                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label htmlFor="gender" className="w-1/3 text-charcoal font-semibold">Gender:</label>
                            <input
                                type="gender"
                                id="gender"
                                value={userData.gender}
                                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label htmlFor="dateOfBirth" className="w-1/3 text-charcoal font-semibold">Date Of Birth:</label>
                            <input
                                type="dateOfBirth"
                                id="dateOfBirth"
                                value={userData.dateOfBirth}
                                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <hr className="my-8" />
                <Health />
            </div>
        </div>
    );
};

export default Profile;
