import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function CalorieRecords() {
  const [calorieRecords, setCalorieRecords] = useState([]);
  const [email, setEmail] = useState('');




  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        // Parse the JSON response
        const result = await response.json();

        if (result.data.email) {
          setEmail(result.data.email);
        }
        else {
          toast.error('Please Login')
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };






    fetchUserDetails();
  }, [calorieRecords.length]);



  const fetchCalorieRecords = async () => {
    const url = `${SummaryApi.getcalories.url}/${email}`
    try {
      const response = await fetch(`${url}`, {
        method: 'Get',
        credentials: "include"
      })
      const data = await (response.json())
      console.log(data)
      setCalorieRecords(sortCalorieRecords(data));
    } catch (error) {
      console.error('Error fetching calorie records:', error);
    }
  };
  const message = () => {
    toast.error('Please Login')
  }

  const sortCalorieRecords = (records) => {
    // Sort records by date in ascending order
    return records.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Earlier date comes first
    });
  };




  return (
    <div>
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col space-y-4">
          <div class="flex items-center">
            <label for="email" class="text-sm font-medium mr-2">Email: </label>
            <p class="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">{email}</p>
          </div>
          <button onClick={email == '' ? message : fetchCalorieRecords} id="fetch-button" class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50">
            <span class="mr-2">Fetch Records</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM11 18L15 14L11 10v8z" />
            </svg>
          </button>
        </div>

        <div id="calorie-records" class="hidden mt-4">
          <ul class="list-disc space-y-2">
          </ul>
        </div>
      </div>
      <div id='hello'>
        {(calorieRecords.length > 0) ? (
          <table class="table-auto w-full rounded-md border border-gray-200 shadow">
              <tr class="bg-gray-100 text-left text-xs font-medium uppercase tracking-wider">
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Calories</th>
              </tr>
            {calorieRecords.map((record, index) => (
              <tr class="bg-gray-100 text-left text-xs font-medium uppercase tracking-wider">
                  <th class="px-4 py-2" key={index}>
                    {record.date}
                  </th>
                  <th class="px-4 py-2" key={index}>
                    {record.caloriecount}
                  </th>
              </tr>

            ))}
          </table>
        ) : (
          <p>No records found for this email.</p>
        )}
      </div>


    </div>
  );
}

export default CalorieRecords;