import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const Health = () => {
    const [meals, setMeals] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [activeSection, setActiveSection] = useState('calorieCounter');
    const [userEmail, setUserEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data1, setData1] = useState({
        email: "",
        date: "",
        caloriecount: ""
    })
    const [calorieRecords, setCalorieRecords] = useState([]);
    const [email, setEmail] = useState('');
    const [calorieEntries, setCalorieEntries] = useState([])
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [dailyCalorieRequirement, setDailyCalorieRequirement] = useState(null)


    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const
        handleSubmit = (event) => {
            event.preventDefault();
            const
                data = { height, weight };
            onBmiSubmit(data);
        };

    function onBmiSubmit(data) {
        const heightInMeters = data.height / 100
        const bmiValue = (data.weight / (heightInMeters * heightInMeters)).toFixed(2)
        setBmi(bmiValue)
    }


    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        activityLevel: 'Sedentary',
        height: '',
        weight: '',
    });
    const [result, setResult] = useState({ dailyCalorieRequirement: null });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onDailyCalorieSubmit = () => {
        const { age, gender, activityLevel, height, weight } = formData;
        const bmr =
            gender === 'Male'
                ? 88.362 + 13.397 * parseFloat(weight) + 4.799 * parseFloat(height) - 5.677 * parseInt(age)
                : 447.593 + 9.247 * parseFloat(weight) + 3.098 * parseFloat(height) - 4.330 * parseInt(age);

        const activityFactors = {
            Sedentary: 1.2,
            'Lightly Active': 1.375,
            'Moderately Active': 1.55,
            'Very Active': 1.725,
        };

        const dailyCalories = (bmr * activityFactors[activityLevel]).toFixed(0);

        // Store result in JSON format
        setResult({
            ...formData,
            dailyCalorieRequirement: dailyCalories,
        });
    };



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



    // Fetch email on component mount
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
                console.log(result)

                if (result.data.email) {
                    setUserEmail(result.data.email);

                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setIsAuthenticated(false);
            }
        };

        fetchUserDetails();
    }, []);


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


    const handleAddMeal = () => {

        if (!isAuthenticated) {
            toast.error("Please login to add meals.");
            return;
        }

        if (document.getElementById('mealCalories').value === '') {
            toast.error("Please enter the calories to add meal");
        } else {
            const newMeal = {
                name: document.getElementById('mealName').value,
                calories: parseInt(document.getElementById('mealCalories').value),
            };
            setMeals([...meals, newMeal]);
            setData1((prevData) => ({
                ...prevData,
                email: userEmail
            }));
            const datee = new Date().toISOString().split('T')
            setData1((prevData) => ({
                ...prevData,
                date: datee[0]
            }));
            document.getElementById('mealName').value = '';
            document.getElementById('mealCalories').value = '';
        }
    };
    const dbcon = async () => {
        try {
            const dataresponse = await fetch(SummaryApi.calories.url, {
                method: SummaryApi.calories.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data1)
            });

            const dataApi = await dataresponse.json()
            if (dataApi.success) {
                toast.success("Meal added successfully!");
            }
            else {
                toast.error(dataApi.message)
            }
        } catch (error) {
            toast.error("Failed to add meal.");
            console.error(error);
        }

    }

    useEffect(() => {
        const total = meals.reduce((acc, meal) => acc + meal.calories, 0);
        setTotalCalories(total);
        data1.caloriecount = total

        console.log(data1)
    }, [meals]);


    return (
        <div>
            <div className="container mx-auto px-4 py-8 border border-gray-300 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Health Calculator</h1>

                <div className="flex mb-4">
                    <button
                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${activeSection === 'calorieCounter' ? 'isActive' : ''}`}
                        onClick={() => setActiveSection('calorieCounter')}
                    >
                        Calorie Counter
                    </button>
                    <button
                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${activeSection === 'bmiCalculator' ? 'isActive' : ''}`}
                        onClick={() => setActiveSection('bmiCalculator')}
                    >
                        BMI Calculator
                    </button>
                    <button
                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${activeSection === 'dailyCalorieRequirement' ? 'isActive' : ''}`}
                        onClick={() => setActiveSection('dailyCalorieRequirement')}
                    >
                        Daily Calorie Requirement
                    </button>
                    <button
                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${activeSection === 'dailyCalorieRequirement' ? 'isActive' : ''}`}
                        onClick={() => setActiveSection('Calorie History')}
                    >
                        Calorie History
                    </button>
                </div>

                {activeSection === 'calorieCounter' && (
                    <div className="container mx-auto px-4 py-8 border border-gray-300 rounded-lg">
                        <h2>Calorie Counter</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {meals.map((meal, index) => (
                                <div key={index}>
                                    <input type="text" value={meal.name} readOnly />
                                    <input type="text" value={meal.calories} readOnly />
                                </div>
                            ))}
                            <div>
                                <input type="text" id="mealName" placeholder="Meal name" />
                                <input type="number" id="mealCalories" placeholder="Calories" />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAddMeal}>Add Meal</button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onClick={dbcon}>Add to Database</button>
                        </div>
                        <p className="mt-4">Total Calories: {totalCalories}</p>
                    </div>
                )}

                {activeSection === 'bmiCalculator' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                        placeholder="Enter height in cm"
                                        value={height}
                                        onChange={handleHeightChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                        placeholder="Enter weight in kg"
                                        value={weight}
                                        onChange={handleWeightChange}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

                                >
                                    Calculate BMI
                                </button>
                            </div>
                            {bmi > 0 && (
                                <p className="text-center mt-4">Your BMI is: {bmi}</p>
                            )}
                        </form>
                    </div>
                )}

                {activeSection === 'dailyCalorieRequirement' && (
                    <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Daily Calorie Requirement</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter your age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Gender</label>
                                <select
                                    name="gender"
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter height in cm"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter weight in kg"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4 mt-4">
                            <label className="block text-gray-700 font-bold mb-2">Activity Level</label>
                            <select
                                name="activityLevel"
                                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                value={formData.activityLevel}
                                onChange={handleInputChange}
                            >
                                <option>Sedentary</option>
                                <option>Lightly Active</option>
                                <option>Moderately Active</option>
                                <option>Very Active</option>
                            </select>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={onDailyCalorieSubmit}
                            >
                                Calculate Daily Calories
                            </button>
                        </div>
                        {result.dailyCalorieRequirement && (
                            <div className="mt-4 text-center">
                                <pre className="bg-gray-100 p-4 rounded-md text-left">
                                    {result.dailyCalorieRequirement}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
                )}


                {activeSection === 'Calorie History' && (
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
                )}


            </div>
        </div>
    );
};

export default Health;
