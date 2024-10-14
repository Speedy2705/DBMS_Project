import React from 'react'
import './NearbyDoctors.css'

const NearbyDoctors = () => {

    const doctors = [
        { name: 'Dr. S.K. Khanna', specialty: 'cardiologist', distance: '5 kilometers', image: 'doctor-avatar.jpg' },
        { name: 'Dr. P.S. Gupta', specialty: 'general', distance: '1.4 kilometers', image: 'doctor-avatar.jpg' },
        { name: 'Dr. A.K. Singhania', specialty: 'dentist', distance: '3.7 kilometers', image: 'doctor-avatar.jpg' },
        { name: 'Dr. A.R. Ranjan', specialty: 'pediatrician', distance: '5.4 kilometers', image: 'doctor-avatar.jpg' },
        { name: 'Dr. Naitik Pandey', specialty: 'dermatologist', distance: '10.6 kilometers', image: 'doctor-avatar.jpg' }
    ];


    function filterDoctors() {
        const specialty = document.getElementById('specialty').value;
        const doctorsList = document.getElementById('doctorsList');
        doctorsList.innerHTML = ''; 

        if (specialty) {
            const filteredDoctors = doctors.filter(doc => doc.specialty === specialty);

            filteredDoctors.forEach(doc => {
                const doctorCard = `
              <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center space-x-4">
                <img src="${doc.image}" alt="${doc.name}" class="w-16 h-16 rounded-full object-cover">
                <div>
                  <h4 class="text-lg font-semibold text-charcoal">${doc.name}</h4>
                  <p class="text-gray-600">${doc.specialty.charAt(0).toUpperCase() + doc.specialty.slice(1)} - ${doc.distance}</p>
                  <button class="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Contact</button>
                </div>
              </div>`;

                doctorsList.insertAdjacentHTML('beforeend', doctorCard);
            });

            document.getElementById('resultsSection').classList.remove('hidden');
        }
    }




    return (
        <div class="flex items-center justify-center min-h-screen bg-gradient p-6">
            <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-4xl shadow-lg space-y-8">


                <h2 class="text-3xl font-semibold text-center text-charcoal">Contact Nearby Doctors</h2>
                <p class="text-center text-gray-600">Find and reach out to doctors near your location</p>


                <form id="searchForm" class="space-y-5">

                    <div class="flex items-center space-x-4">
                        <label for="location" class="w-1/4 text-charcoal font-semibold">Your Location:</label>
                        <input type="text" id="location" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your pin code" />
                    </div>


                    <div class="flex items-center space-x-4">
                        <label for="specialty" class="w-1/4 text-charcoal font-semibold">Doctor's Specialty:</label>
                        <select id="specialty" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="" disabled selected>Select a specialty</option>
                            <option value="general">General Physician</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="dentist">Dentist</option>
                            <option value="pediatrician">Pediatrician</option>
                            <option value="dermatologist">Dermatologist</option>
                        </select>
                    </div>


                    <div class="flex justify-center mt-6">
                        <button type="button" onClick={filterDoctors} class="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Find Doctors</button>
                    </div>
                </form>

                <div id="resultsSection" class="space-y-4 mt-8 hidden">
                    <h3 class="text-xl font-semibold text-charcoal">Available Doctors:</h3>

                    <div id="doctorsList" class="space-y-4">
                        <h1>List</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NearbyDoctors
