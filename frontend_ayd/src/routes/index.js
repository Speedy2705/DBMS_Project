import {createBrowserRouter} from 'react-router-dom'
import SignUp from '../pages/SignUp'
import App from '../App'
import Login from '../pages/Login'
import NearbyDoctors from '../pages/NearbyDoctors'
import Profile from '../pages/Profile'
import Home from '../pages/home'

const router = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "signup",
        element : <SignUp/>
    },
    {
        path : "login",
        element : <Login/>
    },{
        path:"Nearbydocs",
        element:<NearbyDoctors/>
    },
    {
        path:"Profile",
        element:<Profile/>
    }
])

export default router