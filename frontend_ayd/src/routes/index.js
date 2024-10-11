import {createBrowserRouter} from 'react-router-dom'
import SignUp from '../pages/SignUp'
import App from '../App'

const router = createBrowserRouter([
    {
        path : "/",
        element : <SignUp/>
    }
])

export default router