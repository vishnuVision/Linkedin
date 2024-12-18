import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useEffect, useState } from "react"
import Dropdown from "../components/Ui/Dropdown";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { assignUser } from "../redux/slices/authReducer";
import toast from "react-hot-toast";

const list = ["--Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ProvideDetails() {

  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(["--Select"]);
  const [years, setYears] = useState([]);
  const [isFirst, setIsFirst] = useState(true);

  const [isStudent, setIsStudent] = useState(false);
  const [month, setMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFirst) {
      const currentYear = new Date().getFullYear();
      const yearsList = Array.from({ length: 100 }, (_, i) => currentYear - i);
      setYears(["--Select", ...yearsList]);
      setSelectedYear("");
      setIsFirst(false);
    }
  }, [])

  const getDaysInMonth = (month, year = new Date().getFullYear()) => {
    if (!month) return [];
    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => (i + 1).toString());
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    const daysList = getDaysInMonth(e.target.value);
    setDays(["--Select", ...daysList]);
    setSelectedDay("");
  };

  const updateUserDetails = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          let data;
          let birthday;

          if (month && selectedDay && selectedYear) {
              const date = new Date(selectedYear, month - 1, selectedDay);
              birthday = date.toISOString();
          }

          if (isStudent) {
              if (user?.user?.emailAddresses[0]?.emailAddress || firstName || lastName || !location || user?.user?.imageUrl || school || startYear || endYear || birthday) {
                  data = { firstName, lastName, location, avatar: user?.user?.imageUrl, school, startYear, endYear, birthday, isStudent };
              }
          }
          else {
              if (user?.user?.emailAddresses[0]?.emailAddress && firstName && lastName && location && user?.user?.imageUrl && recentJob && recentCompany && birthday) {
                  data = { firstName, lastName, location, avatar: user?.user?.imageUrl, mostRecentJob: recentJob, mostRecentCompany: recentCompany, birthday, isStudent };
              }
          }

          if (data) {
              const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/updateUserRequiredDetails`, data, {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json"
                  }
              });

              if (response.data) {
                  const { success, data, message } = await response.data;
                  if (success) {
                      dispatch(assignUser(data));
                      setError("");
                      navigate("/feed");
                  }
                  else {
                      toast.error(message);
                  }
              }
          }
      }
      catch (err) {
          setPage(0);
          setError(err.errors ? err.errors[0].message : "User not signup Properly");
      }
      setIsLoading(false);
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
                <Input disable={isLoading} label="First name" type="text" placeholder="Enter First name" value={firstName} setvalue={setFirstName} />
                <Input disable={isLoading} label="Last name" type="text" placeholder="Enter Last name" value={lastName} setvalue={setLastName} />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  type="button"
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
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
              <form onSubmit={updateUserDetails} className="space-y-4">
                <Input disable={isLoading} label="Location" type="text" placeholder="Enter your location" value={location} setvalue={setLocation} />
                <Input disable={isLoading} label="Most recent job title" type="text" placeholder="Enter recent job" value={recentJob} setvalue={setRecentJob} />
                <Input disable={isLoading} label="Most recent company" type="text" placeholder="Enter recent company" value={recentCompany} setvalue={setRecentCompany} />
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <div className="flex justify-between gap-2 mt-2">
                    <Dropdown disable={isLoading} label={"Month"} value={month} onChaneHandler={handleMonthChange} list={list} />
                    <Dropdown disable={isLoading} label={"Day"} value={selectedDay} onChaneHandler={(e) => setSelectedDay(e.target.value)} list={days} />
                    <Dropdown disable={isLoading} label={"Year"} isYear={true} value={selectedYear} onChaneHandler={(e) => setSelectedYear(e.target.value)} list={years} />
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  type="button"
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100`}
                  onClick={resetData}
                >
                  {"I'm a Student"}
                </button>
                <button
                  type={isLoading ? "button" : "submit"}
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
                >
                  Continue
                </button>
              </form>
            </div>
          }
          {
            page === 1 && isStudent &&
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
              <form onSubmit={updateUserDetails} className="space-y-4">
                <Input disable={isLoading} label="Location" type="text" placeholder="Enter your location" value={location} setvalue={setLocation} />
                <Input disable={isLoading} label="School or College/University" type="text" placeholder="" value={school} setvalue={setSchool} />
                <div className="flex justify-between gap-2">
                  <Dropdown disable={isLoading} label={"Start Year"} isYear={true} list={years} value={startYear} onChaneHandler={(e) => setStartYear(e.target.value)} />
                  <Dropdown disable={isLoading} label={"End Year"} isYear={true} list={years} value={endYear} onChaneHandler={(e) => setEndYear(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <div className="flex justify-between gap-2 mt-2">
                    <Dropdown disable={isLoading} label={"Month"} value={month} onChaneHandler={handleMonthChange} list={list} />
                    <Dropdown disable={isLoading} label={"Day"} value={selectedDay} onChaneHandler={(e) => setSelectedDay(e.target.value)} list={days} />
                    <Dropdown disable={isLoading} label={"Year"} isYear={true} value={selectedYear} onChaneHandler={(e) => setSelectedYear(e.target.value)} list={years} />
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  type="button"
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full text-black py-2 px-4 rounded-lg hover:bg-gray-100`}
                  onClick={resetData}
                >
                  {"I'm not a Student"}
                </button>
                <button
                  type={isLoading ? "button" : "submit"}
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
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

export default ProvideDetails