import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../context'
import SummaryApi from '../common'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      localStorage.setItem("authToken", dataApi.token);
      navigate('/healthtracker')
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }
  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient p-6 relative z-0">
      <div id="watermark">
        <img src="AskUrDoc1.png" alt="Watermark" />
      </div>

      <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-2xl shadow-lg space-y-6">
        <h2 class="text-3xl font-semibold text-center text-charcoal">Ask Ur Doctor - Login</h2>
        <p class="text-center text-gray-600">Login to your account</p>

        <form onSubmit={handleSubmit} class="space-y-5">

          <div class="flex items-center space-x-4">
            <label for="username/email" class="w-1/3 text-charcoal font-semibold">Username/Email:</label>
            <input name='email'
              value={data.email}
              onChange={handleOnChange} type="text" id="username/email" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your registered Username/Email" />
          </div>


          <div class="flex items-center space-x-4">
            <label for="password" class="w-1/3 text-charcoal font-semibold">Password:</label>
            <input value={data.password}
              name='password'
              onChange={handleOnChange} type="password" id="password" class="z-10 bg-transparent w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password" />
          </div>

          <div class="flex justify-center mt-6">
            <button class="z-10 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Submit Credentials</button>
          </div>
        </form>

        <div class="text-center mt-4 z-10">
          <br/>
          <br/>
          <Link to={"/signup"} class="text-gray-400 hover:text-gray-600 font-semibold z-10">Don't have an account? Sign up here</Link>
        </div>
      </div>
      <ToastContainer
        position='top-right'
      />

    </div>
  )
}

export default Login
