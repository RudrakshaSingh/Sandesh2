import React, { useState } from 'react'
import { KeyRound } from 'lucide-react'
import {Link} from 'react-router-dom';
function UserNewPassword() {
//   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

//   const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-1xl font-bold text-left mb-3">Enter new password</h2>
          
          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="password"
              value={email}
              onChange={handlePasswordChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        <h2 className="text-1xl font-bold text-left mb-3">Re-Enter new password</h2>
          
          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="password"
              value={email}
              onChange={handlePasswordChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          {/* <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
{/* 
          <div className='flex justify-end'>
          <Link to='/user/forgot-password' className="text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot your password?
          </Link>
          </div> */}

          {/* Submit Button */}
          <Link to='/'>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Submit
          </button>
          </Link>
        </form>
{/* 
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link  to= '/user/register' className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  )
}

export default UserNewPassword