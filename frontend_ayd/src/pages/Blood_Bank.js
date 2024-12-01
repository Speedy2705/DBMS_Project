import React, { useEffect, useState } from 'react';
import './Blood_Bank.css';
import SummaryApi from '../common';

const Blood_Bank = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null); // Selected blood group filter state

    const entriesPerPage = 30; // Students per page

    const getdata = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.getstudents.url, {
                method: SummaryApi.getstudents.method,
            });
            const dataApi = await dataResponse.json();
            setStudents(dataApi);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const handleBloodGroupChange = (event) => {
        setSelectedBloodGroup(event.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Filtered students based on selected blood group
    const filteredStudents = selectedBloodGroup
        ? students.filter(student => student.blood_group === selectedBloodGroup)
        : students;

    // Calculate total pages based on filtered students
    const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);

    // Students to display on the current page
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="student-list">
            <div className="bg-white">
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
            <table className="table-auto border-collapse border-none bg-blue-100 w-full text-left">
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Blood Group</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStudents.map((student, index) => (
                        <tr key={index} className="bg-blue-100 hover:bg-blue-200 transition-all duration-200">
                            <td>{student.roll_number}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.blood_group}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Arrows */}
            <div className="pagination flex justify-center mt-4 items-center">
                {/* Previous Page */}
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 border rounded-md ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300 transition-all duration-300'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Page */}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-4 py-2 mx-1 border rounded-md ${
                        currentPage === totalPages || totalPages === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-300 transition-all duration-300'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Blood_Bank;
