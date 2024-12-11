import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Ui/Input";
import Dropdown from "../components/Ui/Dropdown";

function GetInformation() {
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
                                <Input label="Password" type="password" placeholder="Enter Password" value="" setvalue="" />
                                <Input label="First name" type="text" placeholder="Enter First name" value="" setvalue="" />
                                <Input label="Last name" type="text" placeholder="Enter Last name" value="" setvalue="" />
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setPage(1)}
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    }
                    {
                        page === 1 && !isStudent &&
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
                        page === 1 && isStudent &&
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

export default GetInformation
