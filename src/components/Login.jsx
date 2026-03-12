import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full px-4">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-gray-200`}>
                <div className="mb-4 ">
                    <span className=" flex justify-center w-full">
                        <Logo width="100%" />
                        <p className="flex text-xl text-bold items-center">MegaBlog</p>
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
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
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
