import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState({})
  const [submitdata, setSubmitdata] = useState(null)

  const ValidateForm = () => {
    let isValid = true;
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.name = "Email is invalid";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.name = "Password sholud be atleast 8 characters long";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (ValidateForm()) {
      const submitdata = {
        name,
        email,
        password
      };
      setSubmitdata(submitdata);
      alert("Form Submitted Successfully! ")


    }

  }
  return (
    <>
      <h1 className='text-center text-3xl text-blue-900 font-bold font-serif'>Form Validation</h1>
      <div className='flex justify-center content-center mt-10'>
        <form onSubmit={handleSubmit} className='w-[30%]'>
          <div>
            <label htmlFor="name">Name:</label>
            <input className='border-2 rounded  w-[100%]' type="text" id='name' value={name} onChange={(e) => (setName(e.target.value))} />
            {error.name && <span className='text-red-500'>{error.name}</span>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input className='border-2 rounded w-[100%]' type="email" id='email' value={email} onChange={(e) => (setEmail(e.target.value))} />
            {error.email && <span className='text-red-500'>{error.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input className='border-2 rounded w-[100%]' type="password" id='password' value={password} onChange={(e) => (setPassword(e.target.value))} />
            {error.password && <span className='text-red-500'>{error.password}</span>}
          </div>

          <button className='border-2 rounded text-center px-2 py-1 mt-6 w-[100%] bg-blue-400 text-white border-transparent hover:bg-blue-500'>Submit</button>
        </form>
      </div>

      {submitdata && (
        <div className='flex justify-center content-center mt-10'>
          <span>
            <h1 className='text-blue-900 font-bold'>Submitted Data :</h1>
            <p>Name: {submitdata.name}</p>
            <p>Email: {submitdata.email}</p>
            <p>Password: {submitdata.password}</p>
          </span>
        </div>

      )}

    </>
  )
}

export default App
