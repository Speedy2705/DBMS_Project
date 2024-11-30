import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/login'
import NearbyDoctors from '../pages/NearbyDoctors'
import Profile from '../pages/Profile'
import Home from '../pages/home'
import App from '../App'
import CalorieRecords from '../pages/sample.js'
import AdminPanel from '../pages/AdminPanel.js'
import AllUsers from '../pages/AllUsers.js'
import AllDoctors from '../pages/AllDoctors.js'
import HumanBodyEdit from '../pages/HumanBodyEdit.js'
import Blood_Bank from '../pages/Blood_Bank.js'

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
                path:"test",
                element:<CalorieRecords/>
            },
            {
                path:"blood-bank",
                element: <Blood_Bank/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-doctors",
                        element : <AllDoctors/>
                    },
                    {
                        path:"human_body",
                        element:<HumanBodyEdit/>
                    }
                ]
            }
        ]
    }
])

export default router