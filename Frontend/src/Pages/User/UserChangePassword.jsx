/* eslint-disable no-useless-escape */
import { AlertCircle, ArrowRight, KeyRound } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changePassword } from '../../Redux/Slices/UserAuth'

function UserChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  const dispatch = useDispatch()
  const { loading, error, passwordChangeSuccess } = useSelector((state) => state.userAuth)

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value)
  }

  const handleNewPasswordChange = (e) => {
    const newPass = e.target.value
    setNewPassword(newPass)
    setPasswordValid(passwordRegex.test(newPass))
    if (confirmPassword) {
      setPasswordsMatch(newPass === confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setPasswordsMatch(e.target.value === newPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false)
      return
    }

    if (!passwordRegex.test(newPassword)) {
      setPasswordValid(false)
      return
    }

    dispatch(changePassword({ oldPassword, newPassword }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-gray-600 mt-2">
            Update your account password
          </p>
        </div>

        {error && submitted && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {passwordChangeSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            <p>Your password has been changed successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password Field */}
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="oldPassword"
                type="password"
                placeholder="••••••••"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading || passwordChangeSuccess}
              />
            </div>
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                className={`w-full pl-10 pr-4 py-3 border ${
                  submitted && !passwordValid ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={loading || passwordChangeSuccess}
              />
            </div>
            {submitted && !passwordValid && (
              <p className="text-red-600 text-sm mt-1">
                Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.
              </p>
            )}
          </div>

          {/* Confirm New Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className={`w-full pl-10 pr-4 py-3 border ${
                  submitted && !passwordsMatch ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                disabled={loading || passwordChangeSuccess}
              />
            </div>
            {submitted && !passwordsMatch && (
              <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
          
          {/* Password Requirements */}
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Password must contain:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One lowercase letter (a-z)</li>
              <li>One number (0-9)</li>
              <li>One special character (!@#$%^&*)</li>
            </ul>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center items-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
            disabled={loading || passwordChangeSuccess}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              <span className="inline-flex items-center">
                Update Password
                <ArrowRight size={18} className="ml-2" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserChangePassword