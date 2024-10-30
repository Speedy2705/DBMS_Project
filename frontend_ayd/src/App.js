import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Context from './context';
import { useEffect } from 'react';
import Navbar from './components/Navbar.js';


function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  useEffect(()=>{
    /*user Details */
    fetchUserDetails()
    
  },[])
  
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
      }}>
      <ToastContainer
        position='top-center'
      />
      <Navbar/>
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
      </main>
      <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
