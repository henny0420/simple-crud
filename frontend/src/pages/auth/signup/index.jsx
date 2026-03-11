import React, { useState } from 'react'
import { signUpApi } from '../../../api/authapi'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleInput = (ev) => {
    const { value, name } = ev.target
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSignup =async (ev) => {
      ev.preventDefault();

    try {
      const response = await signUpApi(data)
      console.log(response);
      
    } catch (error) {
      console.log(error.message);
      
    }

    setData({
    username: "",
    email: "",
    password: ""
    })
  }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center  '>
      <div className=' w-full max-w-sm rounded-[10px] shadow-sm  p-8'>
        <h3 className='text-center text-blue-500 text-[25px] font-medium'>Sign up</h3>
        <span className='text-center text-blue-500 block'>regester yourself here!!</span>
        <div className='mt-[20px] '>
          <label htmlFor='username' className='block text-xl text-blue-500 mb-2'>Full Name </label>
          <input type='text'
            id='username'
            name='username'
            placeholder='enter your full name'
            value={data.username}
            onChange={handleInput}
            className='rounded-sm border-1 border-blue-500 outline-0 hover:outline-1 hover:outline-blue-500 px-[10px] py-[5px] w-full'></input>

          <label htmlFor='email' 
          className='block text-xl text-blue-500 mb-2 mt-4'
          >Email Address </label>
          <input type='email'
           id='email' 
           name='email'
            placeholder='email' 
             value={data.email

             }
            onChange={handleInput}
            className='rounded-sm   border-1 border-blue-500  outline-0 hover:outline-1 hover:outline-blue-500 px-[10px] py-[5px] w-full'></input>

          <label htmlFor='password' className='block text-xl text-blue-500 mb-2 mt-4'>Password </label>
          <input type='password' 
          id='password'
           name='password'
           placeholder='password'
            value={data.password}
            onChange={handleInput}
           className='rounded-sm  border-1 border-blue-500  outline-0 hover:outline-1 hover:outline-blue-500 px-[10px] py-[5px] w-full'></input>
        </div>
        <div>
          <button 
          onClick={handleSignup}
          className='bg-blue-500 border-2 border-transparent mt-5 p-2 w-full focus:border-blue-500 focus:border-2 focus:bg-white'>Sign Up</button>
        </div>
        <spam className="block text-center text-sm mt-2">Already have an Account ?? <span className='text-blue-500'><Link to='/signin'> SIGN IN </Link></span></spam>
      </div>
    </div>
  )
}

export default SignUp
