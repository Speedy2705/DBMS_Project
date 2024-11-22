import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/login'
import NearbyDoctors from '../pages/NearbyDoctors'
import Profile from '../pages/Profile'
import Home from '../pages/home'
import App from '../App'
import Health from '../pages/Health.js'
import CalorieRecords from '../pages/sample.js'
import AdminPanel from '../pages/AdminPanel.js'
import AllUsers from '../pages/AllUsers.js'

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
            },
            {
                path:"healthTracker",
                element:<Health/>
            },{
                path:"test",
                element:<CalorieRecords/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    // {
                    //     path : "all-doctors",
                    //     element : <AllDoctors/>
                    // }
                ]
            }
        ]
    }
])

export default router