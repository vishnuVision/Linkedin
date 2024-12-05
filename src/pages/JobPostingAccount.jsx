import { BillingCard } from "../components/Jobs/BillingCard";
import JobList from "../components/Jobs/JobList";
import JobSidebar from "../components/Jobs/JobSidebar";
import Notfound from "../components/Notfound";
import Input from "../components/Ui/Input"
import { Link, Route, Routes, useNavigate } from "react-router-dom"

function JobPostingAccount() {
    return (
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route element={<JobLayout />} >
                <Route path="/posted-jobs" element={<h1>post jobs</h1>} />
            </Route>
            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex justify-center">
            <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div className='flex flex-col gap-2 items-center mt-8'>
                        <Link className='flex gap-1 text-xl justify-center items-center font-bold text-[#0a66c2]'><span className='hidden sm:inline'>Linked</span><img src="/logo.png" alt="LinkedIn" className="w-6 h-6" /></Link>
                        <h1 className="mt-4 text-2xl font-semibold text-gray-700">Sign in to Linkedin Talent solutions</h1>
                        <p className="text-md text-slate-500">You can use the same email address and password that you use to sign in to Linkedin.com</p>
                    </div>
                </div>
                <div className="mt-6 flex lg:flex-row gap-6 justify-center">
                    <div className="w-[60%] flex flex-col gap-4 mt-4">
                        <Input label="Email address or phone number" placeholder="Enter your email address or phone number" />
                        <Input label="Password" placeholder="Enter your password" />
                        <button onClick={() => navigate("posted-jobs")} className="bg-[#0a66c2] text-white py-2 px-4 rounded-lg">Sign in</button>
                        <div className="flex justify-center flex-col gap-2 mt-6">
                            <h1 className="text-center no-underline text-[#0a66c2] font-semibold text-lg hover:underline hover:text-blue-900 text-md">Forgot password?</h1>
                            <p className="text-center">New to Linkedin? <Link to={"/signup"} className="no-underline text-[#0a66c2] font-semibold text-lg hover:underline hover:text-blue-900">Join now</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const JobLayout = () => {
    return (
        <div className="min-h-screen bg-[#f3f2ef]">
            <main className="pt-[52px] px-6">
                <div className="max-w-[1128px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                    <div className="md:col-span-1">
                        <JobSidebar />
                    </div>
                    <div className="md:col-span-2">
                        <JobList />
                    </div>
                    <div className="md:col-span-1">
                        <BillingCard />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default JobPostingAccount
