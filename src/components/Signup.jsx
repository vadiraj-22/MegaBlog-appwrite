import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login(currentUser))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center px-4">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-gray-200`}>
                <div className="mb-4 ">
                    <span className=" flex justify-center w-full">
                        <Logo width="100%" />
                        <p className="flex text-xl text-bold items-center">MegaBlog</p>
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
