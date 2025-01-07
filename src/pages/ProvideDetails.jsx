import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { assignUser } from "../redux/slices/authReducer";
import { toast } from "react-toastify";
import useApi from "../hook/useApi";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../utils/reactStyle";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useForm } from "react-hook-form";
import FormInput from "../components/Ui/FormInput";
import FormSelect from "../components/Ui/FormSelect";
import { Datepicker } from "flowbite-react";

function ProvideDetails() {

  const [page, setPage] = useState(0);
  const [years, setYears] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [companyError, setCompanyError] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const [birthdayDate, setBirthdayDate] = useState(null);
  const [birthdayDateError, setBirthdayDateError] = useState("");

  const [isStudent, setIsStudent] = useState(false);
  const [recentCompany, setRecentCompany] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [school, setSchool] = useState({});

  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { apiAction } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  useEffect(() => {
    if (isFirst) {
      const currentYear = new Date().getFullYear();
      const yearsList = Array.from({ length: 100 }, (_, i) => currentYear - i);
      setYears(["Please Select", ...yearsList]);
      setIsFirst(false);
    }
  }, [])

  useEffect(() => {
    getAllCompanies();
  }, [isStudent])

  const getAllCompanies = async () => {
    const { success, data } = await apiAction({
      url: `/api/v1/getAllPages/${isStudent ? "school" : "company"}`,
      method: "GET",
    });

    if (success && data) {
      setCompanyList(data);
    }
  }

  const updateUserDetails = async (data) => {
    if (!birthdayDate) {
      setBirthdayDateError("Please select your birthday");
    }

    if (!isStudent && !recentCompany?.value)
      setCompanyError("Please select recent company");

    if (isStudent && !school?.value)
      setSchoolError("Please select recent school");

    if (!birthdayDate || (isStudent && !school?.value) || (!isStudent && !recentCompany?.value)) {
      return;
    }
    const selectedDateMoment = moment(birthdayDate);
    const currentDate = moment();
    const age = currentDate.diff(selectedDateMoment, "years");
    let id;

    if (age < 18) {
      setBirthdayDateError("You must be at least 18 years old.");
    } else {
      setIsLoading(true);
      id = toast.loading("Please wait...", { position: "bottom-left" });
      try {
        if (data) {
          const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/updateUserRequiredDetails`, { ...data, isStudent, mostRecentCompany: recentCompany?.value, school: school?.value, birthday: birthdayDate, avatar: user?.user?.imageUrl }, {
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
              toast.update(id, { render: "User signup successfully", type: "success", isLoading: false, autoClose: 3000, position: "bottom-left" });
            }
            else {
              toast.update(id, { render: message, type: "error", isLoading: false, autoClose: 3000, position: "bottom-left" });
            }
          }
        }
      }
      catch (err) {
        setPage(0);
        toast.update(id, { render: err.errors ? err.errors[0].message : "User not signup Properly", type: "error", isLoading: false, autoClose: 3000, position: "bottom-left" });
      }
      setIsLoading(false);
    }
  }

  const resetData = () => {
    setIsStudent(prev => !prev);
    setRecentCompany({});
    setSchool({});
    setBirthdayDate("");
    setBirthdayDateError("");
    setValue("location", "");
    setValue("mostRecentJob", "");
    setValue("startYear", "");
    setValue("endYear", "");
  }

  const handleCompanyChange = (selectedOption) => {
    if (selectedOption) {
      setCompanyError("");
    }
    else {
      setCompanyError("Please select a company");
    }
    setRecentCompany(selectedOption);
  };

  const handleSchoolChange = (selectedOption) => {
    if (selectedOption) {
      setSchoolError("");
    }
    else {
      setSchoolError("Please select a school");
    }
    setSchool(selectedOption);
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
              <form className="space-y-4">
                <FormInput disable={isLoading} label="First name" placeholder="Enter First name" value={register("firstName", { required: "First Name is required" })} error={errors.firstName && errors.firstName.message} />
                <FormInput disable={isLoading} label="Last name" placeholder="Enter Last name" value={register("lastName", { required: "Last Name is required" })} error={errors.lastName && errors.lastName.message} />
                <button
                  type="button"
                  disabled={isLoading}
                  className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
                  onClick={handleSubmit(() => setPage(1))}
                >
                  Continue
                </button>
              </form>
            </div>
          }
          {
            page === 1 && !isStudent &&
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
              <form onSubmit={handleSubmit(updateUserDetails)} className="space-y-4">
                <FormInput disable={isLoading} label="Location" placeholder="Enter your location" value={register("location", { required: "Location is required" })} error={errors.location && errors.location.message} />
                <FormInput disable={isLoading} label="Most recent job title" placeholder="Enter recent job" value={register("mostRecentJob", { required: "Recent Job is required" })} error={errors.mostRecentJob && errors.mostRecentJob.message} />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Most recent company</label>
                  <CreatableSelect
                    options={companyList?.map((item) => ({ value: item._id, label: item.name }))}
                    styles={customStyles(companyError)}
                    menuPortalTarget={document.body}
                    placeholder="Select or create company"
                    onChange={handleCompanyChange}
                    value={recentCompany?.value && recentCompany}
                    isClearable
                  />
                  {companyError && <p className="text-red-500 text-sm">{companyError}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="birthday" className="">Date of Birthday</label>
                  <DatePicker
                    selected={birthdayDate}
                    onChange={date => { setBirthdayDate(date); setBirthdayDateError("") }}
                    maxDate={new Date()}
                    placeholderText="Select your date of birth"
                    dateFormat="MM/dd/yyyy"
                    className={`block w-full p-2 rounded focus:outline-none ${birthdayDateError ? "border border-red-600 focus:ring-red-600 focus:ring-0" : "border border-gray-300 focus:ring-gray-800 focus:ring-1"}`}
                    calendarContainer={({ className, children }) => (
                      <div className={`custom-datepicker ${className}`}>{children}</div>
                    )}
                  />
                  {
                    birthdayDateError && <p className="text-red-600 text-sm">{birthdayDateError}</p>
                  }
                </div>
                <button
                  type="button"
                  disabled={isLoading}
                  className={`bg-gray-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full text-black py-2 px-4 rounded-full hover:bg-gray-200`}
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
              <form onSubmit={handleSubmit(updateUserDetails)} className="space-y-4">
                <FormInput disable={isLoading} label="Location" placeholder="Enter your location" value={register("location", { required: "Location is required" })} error={errors.location && errors.location.message} />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">School or College/University</label>
                  <CreatableSelect
                    options={companyList?.map((item) => ({ value: item._id, label: item.name }))}
                    styles={customStyles(schoolError)}
                    menuPortalTarget={document.body}
                    placeholder="Select or create School"
                    onChange={handleSchoolChange}
                    value={school?.value && school}
                    isClearable
                  />
                  {schoolError && <p className="text-red-500 text-sm">{schoolError}</p>}
                </div>
                <div className="flex justify-between gap-2">
                  <FormSelect label="Start Year" list={years} disable={isLoading} value={register("startYear", { required: "Start Year is required" })} error={errors.startYear && errors.startYear.message} />
                  <FormSelect label="End Year" list={watch("startYear") === "Please Select" ? years : years.filter((year) => year > watch("startYear"))} disable={isLoading} value={register("endYear", { required: "End Year is required" })} error={errors.endYear && errors.endYear.message} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="birthday" className="">Birthday</label>
                  <Datepicker
                    id="birthday"
                    value={birthdayDate && new Date(birthdayDate)}
                    onChange={date => setBirthdayDate(date)}
                    maxDate={new Date()}
                    placeholder="Select your date of birth"
                    title="Birthday DatePicker"
                    displayFormat="MM/dd/yyyy"
                    className={`block w-full border rounded-md focus:outline-none focus:ring-2 ${birthdayDateError ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-gray-900"}`}
                  />
                  {
                    birthdayDateError && <p className="text-red-600 text-sm">{birthdayDateError}</p>
                  }
                </div>
                <button
                  type="button"
                  disabled={isLoading}
                  className={`bg-gray-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-full text-black py-2 px-4 rounded-full hover:bg-gray-200`}
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