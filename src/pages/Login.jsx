import { Link, Route, Routes } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useState } from "react"

function Login() {
    return (
        <div className="bg-[#866f55] bg-opacity-10 w-screen h-screen flex flex-col justify-start p-2">
            <div className="flex justify-between py-4">
                <div className="px-12">
                    <Link className='flex gap-1 justify-center items-center font-bold text-[#0a66c2] text-4xl'>Linked<img src="/logo.png" alt="LinkedIn" className="w-9 h-9" /></Link>
                </div>
                <div></div>
            </div>
            <div className="mt-10">
                <div className="flex flex-col items-center justify-center min-h-full">
                    <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                        <Routes>
                            <Route path="/" element={<LoginForm />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginForm = () => {
    return (
        <>
            <div className="mb-4 text-start">
                <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
                <p className="text-sm text-gray-600">Stay updated on your professional world.</p>
            </div>
            <form className="space-y-4">
                <Input label="Email" type="email" placeholder="you@example.com" value="" setvalue="" />
                <Input label="Password" type="password" placeholder="Enter a Password" value="" setvalue="" />
                <Link to={"forgot-password"} className="font-semibold text-[#0a66c2]">Forgot password?</Link>
                <button
                    type="submit"
                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                >
                    Agree & Join
                </button>
            </form>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">or</span>
                </div>
            </div>
            <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn’s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
            <button className="flex w-full mt-4 gap-1 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium">
                <img src="/google.webp" className="w-6 h-6" alt="icon" />
                Continue With Google
            </button>
            <button className="flex w-full mt-4 gap-2 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium">
                <img src="/microsoft.png" className="w-6 h-6" alt="icon" />
                Continue With Microsoft
            </button>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    New to LinkedIn?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Join now
                    </a>
                </p>
            </div>
        </>
    )
}

const ForgotPassword = () => {
    const [isOtp, setIsOtp] = useState(false);
    const [email,setEmail] = useState("");
    return (
        <>
            {
                isOtp && (
                    <>
                        <div className='space-y-1'>
                            <p className='text-center text-xl font-semibold'>Two-Factor Verification</p>
                            <p className='text-center text-gray-500'>Enter the verification code we sent to <br /> {email}</p>
                            <Input type='number' label={"Enter OTP"} />
                        </div>
                        <div className='flex flex-row-reverse mt-4'>
                            <button onClick={() => setIsOtp(false)} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Submit</button>
                        </div>
                    </>
                )
            }
            {
                !isOtp && (
                    <>
                        <div className="mb-4 text-start">
                            <h1 className="text-2xl font-bold text-gray-800">Forgot your password</h1>
                            <p className="text-sm text-gray-600">Please enter  the email address you&apos;d like your password reset information sent to</p>
                        </div>
                        <form className="flex flex-col gap-4">
                            <Input label="Enter email address" type="email" placeholder="you@example.com" value={email} setvalue={setEmail} />
                            <button
                                type="button"
                                onClick={() => setIsOtp(true)}
                                className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                            >
                                Sent code
                            </button>
                            <Link to={"/signin"} className="font-semibold text-[#0a66c2]">Back to Login</Link>
                        </form>
                    </>
                )
            }
        </>
    )
}

export default Login
