import { Link } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useState } from "react"
import Dropdown from "../components/Ui/Dropdown";

function Signup() {
    const [page, setPage] = useState(0);
    const [isStudent, setIsStudent] = useState(false);
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
                    <div className="mb-6 text-center">
                        <p className="text-4xl text-black">Make the most of your professional life</p>
                    </div>
                    {
                        page === 0 &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form className="space-y-4">
                                <Input label="Email" type="email" placeholder="you@example.com" value="" setvalue="" />
                                <Input label="Password" type="password" placeholder="Enter a Password" value="" setvalue="" />
                                <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn’s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setPage(1)}
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
                                    Already on LinkedIn?{" "}
                                    <a href="/signin" className="text-blue-500 hover:underline">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    }
                    {
                        page === 1 &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form className="space-y-4">
                                <Input label="First name" type="text" placeholder="Enter First name" value="" setvalue="" />
                                <Input label="Last name" type="text" placeholder="Enter Last name" value="" setvalue="" />
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setPage(2)}
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    }
                    {
                        page === 2 && !isStudent &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form className="space-y-4">
                                <Input label="Location" type="text" placeholder="Enter your location" value="" setvalue="" />
                                <Input label="Most recent job title" type="text" placeholder="Enter recent job" value="" setvalue="" />
                                <Input label="Most recent company" type="text" placeholder="Enter recent company" value="" setvalue="" />
                                <button
                                    type="submit"
                                    className="w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100"
                                    onClick={() => setIsStudent(prev => !prev)}
                                >
                                    {"I'm a Student"}
                                </button>
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    }
                    {
                        page === 2 && isStudent &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form className="space-y-4">
                                <Input label="Location" type="text" placeholder="Enter your location" value="" setvalue="" />
                                <Input label="School or College/University" type="text" placeholder="" value="" setvalue="" />
                                <div className="flex justify-between gap-2">
                                    <Dropdown label={"Start Year"} />
                                    <Dropdown label={"End Year"} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black">Date of birth</label>
                                    <div className="flex justify-between gap-2 mt-2">
                                        <Dropdown label={"Month"} />
                                        <Dropdown label={"Day"} />
                                        <Dropdown label={"Year"} />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100"
                                    onClick={() => setIsStudent(prev => !prev)}
                                >
                                    {"I'm not a Student"}
                                </button>
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Signup
