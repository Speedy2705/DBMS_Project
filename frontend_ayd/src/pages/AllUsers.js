import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    username: '',
    role: '',
    _id: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchAllUsers = async () => {
    setLoading(true); // Show loader
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      {/* Loader */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Users Table */}
      {!loading && allUser.length > 0 ? (
        <table className="w-full userTable">
          <thead className='bg-blue-200'>
            <tr className="text-black">
              <th className='bg-blue-200'>Sr.</th>
              <th className='bg-blue-200'>User</th>
              <th className='bg-blue-200'>Email</th>
              <th className='bg-blue-200'>Role</th>
              <th className='bg-blue-200'>Created Date</th>
              <th className='bg-blue-200'>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={el._id}> {/* Added unique key */}
                <td>{index + 1}</td>
                <td>{el?.username}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('ll')}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <div className="text-center py-4">No users found.</div>
      )}

      {/* Change User Role Modal */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          username={updateUserDetails.username}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
