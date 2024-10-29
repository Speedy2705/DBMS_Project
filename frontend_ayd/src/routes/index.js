import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import NearbyDoctors from '../pages/NearbyDoctors'
import Profile from '../pages/Profile'
import Home from '../pages/home'
import App from '../App'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "login",
                element: <Login />
            }, 
            {
                path: "nearbydocs",
                element: <NearbyDoctors />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    }
])

export default router