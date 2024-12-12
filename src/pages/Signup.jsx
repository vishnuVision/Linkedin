import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useEffect, useState } from "react"
import Dropdown from "../components/Ui/Dropdown";
import { useAuth, useSignUp, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../redux/slices/authReducer";
import toast from "react-hot-toast";

const list = ["--Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Signup() {
    const [page, setPage] = useState(0);
    const { isLoaded, signUp, setActive } = useSignUp();
    const [error, setError] = useState(null);
    const [days, setDays] = useState(["--Select"]);
    const [years, setYears] = useState([]);
    const [isFirst, setIsFirst] = useState(true);

    const [isStudent, setIsStudent] = useState(false);
    const [month, setMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [recentJob, setRecentJob] = useState("");
    const [recentCompany, setRecentCompany] = useState("");
    const [school, setSchool] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const user = useUser();
    const dispatch = useDispatch();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const { user:userData } = useSelector((state) => state.authReducer);

    useEffect(()=>{
        if(userData)
        {
            return navigate("/feed");
        }
    },[userData])

    useEffect(() => {
        if (isFirst) {
            const currentYear = new Date().getFullYear();
            const yearsList = Array.from({ length: 100 }, (_, i) => currentYear - i);
            setYears(["--Select", ...yearsList]);
            setSelectedYear("");
            setIsFirst(false);
            if (user.isSignedIn) {
                setPage(2);
            }
        }
    }, [])

    const getDaysInMonth = (month, year = new Date().getFullYear()) => {
        if (!month) return [];
        const days = new Date(year, month, 0).getDate();
        return Array.from({ length: days }, (_, i) => (i + 1).toString());
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        console.log(e.target.value)
        const daysList = getDaysInMonth(e.target.value);
        setDays(["--Select", ...daysList]);
        setSelectedDay("");
    };

    const signUpUser = async (e) => {
        e.preventDefault();
        try {
            let data;
            let birthday;

            if(month && selectedDay && selectedYear)
            {
                const date = new Date(selectedYear, month - 1, selectedDay);
                birthday = date.toISOString();
            }

            if (isStudent) {
                if (user?.user?.emailAddresses[0]?.emailAddress || firstName || lastName || !location || user?.user?.imageUrl || school || startYear || endYear || birthday) {
                    data = { email: user?.user?.emailAddresses[0]?.emailAddress, firstName, lastName, location, avatar: user?.user?.imageUrl, school, startYear, endYear, birthday, isStudent };
                }
            }
            else {
                if (user?.user?.emailAddresses[0]?.emailAddress && firstName && lastName && location && user?.user?.imageUrl && recentJob && recentCompany && birthday) {
                    data = { email: user?.user?.emailAddresses[0]?.emailAddress, firstName, lastName, location, avatar: user?.user?.imageUrl, mostRecentJob: recentJob, mostRecentCompany: recentCompany, birthday, isStudent };
                }
            }

            if(data)
            {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/register`,data, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.data) {
                    const { success, data, message } = await response.data;
                    if (success) {
                        dispatch(assignUser(data));
                        navigate("/feed");
                    }
                    else {
                        toast.error(message);
                        await signOut();
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
            setError(err.errors ? err.errors[0].message : "Something went wrong");
        }
    }

    const resetData = () => {
        setIsStudent(prev => !prev);
        setSelectedDay(0);
        setMonth(0);
        setSelectedYear(0);
        setLocation("");
        setRecentJob("");
        setRecentCompany("");
        setSchool("");
        setStartYear("");
        setEndYear("");
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.create({
                emailAddress: email,
                password: password,
            });

            await signUpAttempt.prepareEmailAddressVerification();
            setPage(1);
        } catch (err) {
            setError(err.errors ? err.errors[0].message : "Something went wrong");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: otp,
            });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
            }
            setPage(2);
        } catch (err) {
            setError(err.errors ? err.errors[0].message : "Invalid OTP. Please try again.");
        }
    };

    const handleGoogleSignup = async () => {
        if (!isLoaded) return;

        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/signup",
                redirectUrlComplete: "/signup"
            });
        } catch (err) {
            setError(err.errors ? err.errors[0].message : "Failed to sign up with Google");
        }
    };

    const handleMicrosoftSignup = async () => {
        if (!isLoaded) return;

        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_microsoft",
                redirectUrl: "/signup",
                redirectUrlComplete: "/signup",
            });
        } catch (err) {
            setError(err.errors ? err.errors[0].message : "Failed to sign up with Microsoft");
        }
    };

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
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input label="Email" type="email" placeholder="you@example.com" value={email} setvalue={setEmail} />
                                <Input label="Password" type="password" placeholder="Enter a Password" value={password} setvalue={setPassword} />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn&apos;s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
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
                            <button type="button" onClick={handleGoogleSignup} className="flex w-full mt-4 gap-1 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium">
                                <img src="/google.webp" className="w-6 h-6" alt="icon" />
                                Continue With Google
                            </button>
                            <button type="button" onClick={handleMicrosoftSignup} className="flex w-full mt-4 gap-2 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium">
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
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleVerifyOTP();
                                }}
                                className="space-y-4"
                            >
                                <Input label="Enter OTP" type="text" name="otp" value={otp} setvalue={setOtp} placeholder="Enter OTP" />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                >
                                    Verify & Continue
                                </button>
                            </form>
                        </div>
                    }
                    {
                        page === 2 &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form className="space-y-4">
                                <Input label="First name" type="text" placeholder="Enter First name" value={firstName} setvalue={setFirstName} />
                                <Input label="Last name" type="text" placeholder="Enter Last name" value={lastName} setvalue={setLastName} />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <button
                                    type="button"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setPage(3)}
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    }
                    {
                        page === 3 && !isStudent &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form onSubmit={signUpUser} className="space-y-4">
                                <Input label="Location" type="text" placeholder="Enter your location" value={location} setvalue={setLocation} />
                                <Input label="Most recent job title" type="text" placeholder="Enter recent job" value={recentJob} setvalue={setRecentJob} />
                                <Input label="Most recent company" type="text" placeholder="Enter recent company" value={recentCompany} setvalue={setRecentCompany} />
                                <div>
                                    <label className="block text-sm font-medium text-black">Date of birth</label>
                                    <div className="flex justify-between gap-2 mt-2">
                                        <Dropdown label={"Month"} value={month} onChaneHandler={handleMonthChange} list={list} />
                                        <Dropdown label={"Day"} value={selectedDay} onChaneHandler={(e) => setSelectedDay(e.target.value)} list={days} />
                                        <Dropdown label={"Year"} isYear={true} value={selectedYear} onChaneHandler={(e) => setSelectedYear(e.target.value)} list={years} />
                                    </div>
                                </div>
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100"
                                    onClick={resetData}
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
                        page === 3 && isStudent &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form onSubmit={signUpUser} className="space-y-4">
                                <Input label="Location" type="text" placeholder="Enter your location" value={location} setvalue={setLocation} />
                                <Input label="School or College/University" type="text" placeholder="" value={school} setvalue={setSchool} />
                                <div className="flex justify-between gap-2">
                                    <Dropdown label={"Start Year"} list={years} value={startYear} onChaneHandler={(e) => setStartYear(e.target.value)} />
                                    <Dropdown label={"End Year"} list={years} value={endYear} onChaneHandler={(e) => setEndYear(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black">Date of birth</label>
                                    <div className="flex justify-between gap-2 mt-2">
                                        <Dropdown label={"Month"} value={month} onChaneHandler={handleMonthChange} list={list} />
                                        <Dropdown label={"Day"} value={selectedDay} onChaneHandler={(e) => setSelectedDay(e.target.value)} list={days} />
                                        <Dropdown label={"Year"} isYear={true} value={selectedYear} onChaneHandler={(e) => setSelectedYear(e.target.value)} list={years} />
                                    </div>
                                </div>
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100"
                                    onClick={resetData}
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