import React from 'react'
import './Profile.css'
import Health from '../components/Health'


const Profile = () => {
    return (
        <div class="flex items-center justify-center min-h-screen bg-gradient p-6">
            <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-4xl shadow-lg space-y-8">

                <h2 class="text-3xl font-semibold text-center text-charcoal">User Profile</h2>


                <div class="photobox mt-6">
                    <img src="askurdoc.jpg" alt="User Profile Photo" id="profilePic" />
                </div>
                <button class="block mx-auto mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent">Change Photo</button>

                <div class="space-y-5 mt-8">
                    <div class="flex items-center space-x-4">
                        <label for="username" class="w-1/3 text-charcoal font-semibold">Username:</label>
                        <input type="text" id="username" value="User123" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" disabled />
                    </div>

                    <div class="flex items-center space-x-4">
                        <label for="email" class="w-1/3 text-charcoal font-semibold">Email:</label>
                        <input type="email" id="email" value="user123@example.com" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" disabled />
                    </div>

                </div>


                <hr class="my-8" />
                <Health />
            </div>

        </div>
    )
}

export default Profile
