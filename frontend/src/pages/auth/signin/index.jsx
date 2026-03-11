import React, { useState } from 'react'
import { signInApi, signUpApi } from '../../../api/authapi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignIn = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
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

    const handleSignin = async (ev) => {
        ev.preventDefault()
        try {
            const response = await signInApi(data)
            if (response.status === 200) {
                toast.success('login Sucessfull')
                setData({
                    email: "",
                    password: ""
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                if (response.data.user.role === 'admin') {
                    navigate('/admin/product')
                }
                else {
                    navigate('/home')
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message);

        }

        setData({
            email: "",
            password: ""
        })
    }

    return (
        <div className='min-h-screen bg-white flex items-center justify-center  '>
            <div className=' w-full max-w-sm rounded-[10px] shadow-sm  p-8'>
                <h3 className='text-center text-blue-500 text-[25px] font-medium'>Sign in</h3>
                <span className='text-center text-blue-500 block'>Welcome Back</span>
                <div className='mt-[20px] '>

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
                        onClick={handleSignin}
                        className='bg-blue-500 border-2 border-transparent mt-5 p-2 w-full focus:border-blue-500 focus:border-2 focus:bg-white'>Sign IN</button>
                </div>
                <spam className="block text-center text-sm mt-2">Don't have an Account ?? <span className='text-blue-500'><Link to='/signup'> SIGN UP </Link></span></spam>
            </div>
        </div>
    )
}

export default SignIn
