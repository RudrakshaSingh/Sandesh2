import { AlertCircle,ArrowRight, KeyRound, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { forgotPassword } from '../../Redux/Slices/UserAuth' 

function UserForgotPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  
  const dispatch = useDispatch()
  const { loading, error, resetEmailSent } = useSelector((state) => state.userAuth)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    dispatch(forgotPassword({ email }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            {!resetEmailSent 
              ? "Enter your email address and we'll send you a link to reset your password" 
              : "Check your email for the reset link"}
          </p>
        </div>

        {error && submitted && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {resetEmailSent ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            <p>Reset link sent to <strong>{email}</strong></p>
            <p className="mt-2 text-sm">Didn't receive the email? Check your spam folder or try again.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="flex justify-center items-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="inline-flex items-center">
                  Send Reset Link
                  <ArrowRight size={18} className="ml-2" />
                </span>
              )}
            </button>
            
            <div className="text-center mt-4">
              <Link to="/user/login" className="text-blue-600 hover:text-blue-800 text-sm">
                Remember your password? Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserForgotPassword