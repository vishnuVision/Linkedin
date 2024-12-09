import { Briefcase, Camera, MapPin, MessageCircle, UserPlus } from "lucide-react"
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import { handleModalContext } from "../../contextApi/handleModalContext";

function CompanyProfileHeader() {
    const {pathname} = useLocation();
    const {id} = useParams();
    const {setIsChatDetailsOpen} = useContext(handleModalContext);
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="relative">
                <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
                    <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full hover:bg-gray-100">
                        <Camera className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="absolute -bottom-16 left-4">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                            alt="Profile"
                            className="w-32 h-32 rounded-sm border-4 border-white"
                        />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:bg-gray-100 border border-gray-200">
                            <Camera className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-20">
                <div className="flex flex-col items-start">
                    <div className="px-4">
                        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                        <p className="text-lg text-gray-600">Senior Software Engineer</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> San Francisco Bay Area
                            </span>
                            <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" /> Tech Company Inc.
                            </span>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="px-4 py-2 bg-blue-600 w-32 justify-center text-white rounded-full hover:bg-blue-700 flex items-center gap-2">
                                <UserPlus className="w-4 h-4" />
                                Follow
                            </button>
                            <button onClick={()=> setIsChatDetailsOpen(prev=>!prev)} className="px-4 py-2 border border-blue-600 justify-center w-32 text-blue-600 rounded-full hover:bg-blue-50 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Message
                            </button>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-200 mt-4 px-4 flex gap-1">
                        <Link className={`py-2 px-4 font-semibold ${pathname.endsWith("/") ? "border-b-2 border-[#01754f] text-[#01754f]" : "" }`} to={`/company/${id}/`}>Home</Link>
                        <Link className={`py-2 px-4 font-semibold ${pathname.includes("/about") ? "border-b-2 border-[#01754f] text-[#01754f]" : "" }`} to={`/company/${id}/about`}>About</Link>
                        <Link className={`py-2 px-4 font-semibold ${pathname.includes("/posts") ? "border-b-2 border-[#01754f] text-[#01754f]" : "" }`} to={`/company/${id}/posts`}>Posts</Link>
                        <Link className={`py-2 px-4 font-semibold ${pathname.includes("/jobs") ? "border-b-2 border-[#01754f] text-[#01754f]" : "" }`} to={`/company/${id}/jobs`}>Jobs</Link>
                        <Link className={`py-2 px-4 font-semibold ${pathname.includes("/people") ? "border-b-2 border-[#01754f] text-[#01754f]" : "" }`} to={`/company/${id}/people`}>People</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfileHeader
