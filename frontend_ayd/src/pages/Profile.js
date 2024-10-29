import React from 'react'
import './Profile.css'


const Profile = () => {
    return (
        <div class="flex items-center justify-center min-h-screen bg-gradient p-6">
            <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-4xl shadow-lg space-y-8">

                <h2 class="text-3xl font-semibold text-center text-charcoal">User Profile</h2>


                <div class="photobox mt-6">
                    <img src="askurdoc.jpg" alt="User Profile Photo" id="profilePic"/>
                </div>
                <button class="block mx-auto mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent">Change Photo</button>

                <div class="space-y-5 mt-8">
                    <div class="flex items-center space-x-4">
                        <label for="username" class="w-1/3 text-charcoal font-semibold">Username:</label>
                        <input type="text" id="username" value="User123" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" disabled/>
                    </div>

                    <div class="flex items-center space-x-4">
                        <label for="email" class="w-1/3 text-charcoal font-semibold">Email:</label>
                        <input type="email" id="email" value="user123@example.com" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" disabled/>
                    </div>

                    <div class="flex items-center space-x-4">
                        <label for="password" class="w-1/3 text-charcoal font-semibold">Password:</label>
                        <input type="password" id="password" value="" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" disabled/>
                    </div>

                    <button class="block mx-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent">Edit Your Profile</button>
                </div>


                <hr class="my-8"/>

                    <h3 class="text-xl font-semibold text-charcoal">Medical History</h3>
                    <table class="min-w-full bg-white border border-gray-200 rounded-lg mt-4">
                        <thead>
                            <tr class="bg-primary text-white">
                                <th class="p-4">Doctors</th>
                                <th class="p-4">Visits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="p-4 text-center">Dr. Aayushi Thakre</td>
                                <td class="p-4 text-center">3</td>
                            </tr>
                            <tr>
                                <td class="p-4 text-center">Dr. Divanshu Bhargava</td>
                                <td class="p-4 text-center">2</td>
                            </tr>
                            <tr>
                                <td class="p-4 text-center">Dr. Karan Pawar</td>
                                <td class="p-4 text-center">5</td>
                            </tr>
                        </tbody>
                    </table>

                    
                    <button class="block mx-auto mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete Account</button>

            </div>
        </div>
    )
}

export default Profile
