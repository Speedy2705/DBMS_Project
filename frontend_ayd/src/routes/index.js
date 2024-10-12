import {createBrowserRouter} from 'react-router-dom'
import SignUp from '../pages/SignUp'
import App from '../App'
import Login from '../pages/Login'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>
    },
    {
        path : "signup",
        element : <SignUp/>
    },
    {
        path : "login",
        element : <Login/>
    }
])

export default router