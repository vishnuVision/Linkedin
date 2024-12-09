import { Ellipsis, LogOut, Settings, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import Network from "./Network";
import Comment from "./Comment";

function EventCard() {
    const [showOptions, setShowOptions] = useState(false);
    const {pathname} = useLocation();
    return (
        <>
            <div className="bg-white rounded-lg shadow">
                <div className="relative">
                    <div className="h-80 w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
                    </div>
                    <div className='flex flex-col gap-2px-4'>
                        <div className="flex justify-between items-center px-4 py-2">
                            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                            <button onClick={() => setShowOptions(prev => !prev)} className='relative'>
                                <Ellipsis className='hover:bg-gray-100 w-8 h-8 px-1 rounded-full' />
                                <div>

                                    {
                                        showOptions &&
                                        <div className='absolute top-10 border right-0 w-48 bg-white rounded-l-lg rounded-b-lg shadow-md'>
                                            <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                                <Settings />
                                                Edit Details
                                            </p>
                                            <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                                <LogOut />
                                                Leave this group
                                            </p>
                                            <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                                <Trash2 />
                                                Delete this group
                                            </p>
                                        </div>
                                    }
                                </div>
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 mt-2 px-4">
                            <p className="text-md text-gray-600">Event By Vishnu Mandlesara</p>
                            <p className="text-md text-gray-600">1 attendee</p>
                        </div>
                        <div className="border-t border-gray-200 mt-10 flex items-center px-3">
                            <Link to="/event/1/" className={`text-md text-gray-600 px-3 font-semibold py-2 ${pathname.endsWith("/") ? "text-[#01754f] border-b-2 border-[#01754f]" : ""}`}>Details</Link>
                            <Link to="/event/1/comments" className={`text-md text-gray-600 px-3 font-semibold py-2 ${pathname.includes("/comments") ? "text-[#01754f] border-b-2 border-[#01754f]" : ""}`}>Comments</Link>
                            <Link to="/event/1/networking" className={`text-md text-gray-600 px-3 font-semibold py-2 ${pathname.includes("/networking") ? "text-[#01754f] border-b-2 border-[#01754f]" : ""}`}>Networking</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow mt-4">
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/comments" element={<Comment/>} />
                    <Route path="/networking" element={<Network/>} />
                </Routes>
            </div>
        </>
    )
}

const About = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 whitespace-pre-line">
                Passionate software engineer with 8+ years of experience in full-stack development.
                Specialized in React, Node.js, and cloud technologies.

                Leading technical initiatives and mentoring junior developers while staying up-to-date with the latest industry trends.
            </p>
        </div>
    )
}

export default EventCard
