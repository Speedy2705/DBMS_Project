import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
       if(user?.role !== ROLE.ADMIN){
        navigate("/")
       }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] flex bg-gray-100'>
        <aside className='bg-white min-h-full w-64 shadow-md customShadow'>
            <div className='h-36 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center pb-3 mt-3'>
                {
                    user?.profilePic ? (
                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                    ) : (
                    <FaRegCircleUser className='text-gray-500' size={48} />
                    )
                }
                </div>
                <p className='capitalize text-lg font-semibold text-gray-800'>{user?.name}</p>
                <p className='text-sm text-gray-600'>{user?.role}</p>
            </div>

            <div className='pt-4'>
                <nav className='grid gap-2'>
                    <Link to={"all-users"} className='px-4 py-2 rounded-md hover:bg-gray-200 transition-all text-gray-800'>All Users</Link>
                    <Link to={"all-doctors"} className='px-4 py-2 rounded-md hover:bg-gray-200 transition-all text-gray-800'>All Doctors</Link>
                    <Link to={"human_body"} className='px-4 py-2 rounded-md hover:bg-gray-200 transition- all text-gray-800'>Human Body</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-4'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default AdminPanel;