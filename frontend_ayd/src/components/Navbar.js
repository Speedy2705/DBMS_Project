import React, { useContext, useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context';
import ROLE from '../common/role';

const Navbar = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const menuRef = useRef(); // Ref for detecting outside clicks

  // Logout functionality
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='h-16 shadow-md bg-white fixed w-full z-10'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        {/* Logo Section */}
        <div className='flex items-center'>
          <Link to={"/"}><img src="https://i.ibb.co/jRHd3Ns/askurdoc-remove-bg.png" alt="askurdoc-remove-bg" border="0" className='h-16' />
          </Link>
        </div>

        {/* User Options */}
        <div className='flex items-center gap-7'>
          {/* Profile Menu */}
          <div className='relative flex justify-center' ref={menuRef}>
            {user?._id && (
              <div
                className='text-3xl cursor-pointer relative flex justify-center'
                onClick={() => setMenuDisplay((prev) => !prev)} // Toggle menu on click
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    className='w-10 h-10 rounded-full border-2 border-gray-300'
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser className='text-gray-600' />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className='absolute z-50 bg-white top-12 right-0 h-fit shadow-lg rounded'>
                <nav>
                  <Link
                    to={"/profile"}
                    className='block whitespace-nowrap hover:bg-blue-100 p-2'
                    onClick={() => setMenuDisplay(false)}
                  >
                    Profile
                  </Link>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-users"}
                      className='block whitespace-nowrap hover:bg-blue-100 p-2'
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div>
            <Link
              to={"/blood-bank"}
              className='px-4 py-2 rounded-full text-black hover:text-white bg-white border-2 border-blue-600 hover:bg-blue-700 transition duration-300'
            >
              Blood Bank
            </Link>
          </div>

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className='px-4 py-2 rounded-full text-black hover:text-white bg-white border-2 border-red-600 hover:bg-red-700 transition duration-300'
              >
                Logout
              </button>
            ) : (
              <Link
                to={"login"}
                className='px-4 py-2 rounded-full text-black hover:text-white bg-white border-2 border-red-600 hover:bg-red-700 transition duration-300'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;