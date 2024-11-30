import React, { useEffect, useState } from 'react';
import './Blood_Bank.css';
import SummaryApi from '../common';

const Blood_Bank = () => {
    const [students, setStudents] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null); // State for selected blood group

    console.log(students)

    const getdata = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.getstudents.url, {
                method: SummaryApi.getstudents.method,
            });
            const dataApi = await dataResponse.json()
            setStudents(dataApi)
            console.log(dataApi);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const handleBloodGroupChange = (event) => {
        setSelectedBloodGroup(event.target.value);
    };

    const filteredStudents = selectedBloodGroup
        ? students.filter(student => student.blood_group === selectedBloodGroup)
        : students;

    return (
        <div className="student-list">
            <div className='bg-white'>
                <h2>Student Blood Information</h2>
                <label htmlFor="blood-group">Filter by Blood Group:</label>
                <select id="blood-group" onChange={handleBloodGroupChange}>
                    <option value="">All</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <table className='table-auto border-collapse border-none bg-blue-100 w-full text-left'>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Blood Group</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student, index) => (
                        <tr key={index} className="bg-blue-100 hover:bg-blue-200 transition-all transition-transform-15000ms">
                            <td>{student.roll_number}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.blood_group}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Blood_Bank;