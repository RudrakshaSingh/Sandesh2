import React from 'react'

function UserLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <div>UserLogin</div>
  )
}

export default UserLogin