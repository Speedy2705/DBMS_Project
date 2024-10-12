import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient p-6">
      <div class="bg-white p-8 md:p-12 rounded-3xl w-full max-w-2xl shadow-lg space-y-6">
        <h2 class="text-3xl font-semibold text-center text-charcoal">Ask Ur Doctor - Login</h2>
        <p class="text-center text-gray-600">Login to your account</p>

        <form class="space-y-5">
          <div class="flex items-center space-x-4">
            <label for="username/email" class="w-1/3 text-charcoal font-semibold">Username/Email:</label>
            <input type="text" id="username/email" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your registered Email"/>
          </div>

          <div class="flex items-center space-x-4">
            <label for="password" class="w-1/3 text-charcoal font-semibold">Password:</label>
            <input type="password" id="password" class="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password"/>
          </div>


          <div class="flex justify-center mt-6">
            <button type="submit" class="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">Submit Credentials</button>
          </div>
        </form>

        <div class="text-center mt-4">
          <Link to="/signup">Don't have an account? Sign up here</Link>
        </div>
      </div>

    </div>
  )
}

export default Login
