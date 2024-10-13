import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
        <ToastContainer
          position='top-center'
        />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>

    </>
  );
}

export default App;
