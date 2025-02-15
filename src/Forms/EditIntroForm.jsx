import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FormInput from "../components/Ui/FormInput";
import { useForm } from "react-hook-form";
import FormSelect from "../components/Ui/FormSelect";
import FormTextArea from "../components/Ui/FormTextArea";
import axios from "axios";
import Select from "react-select";
import { customStyles } from "../utils/reactStyle";
import moment from "moment";
import industries from "industries";
import { Datepicker } from "flowbite-react";

function EditIntroForm({ onSave, onCancel, user, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [birthdayDate, setBirthdayDate] = useState(user?.birthday || null);
    const [region, setRegion] = useState({ value: user?.region || "", label: user?.region || "Please Select" });
    const [industry, setIndustry] = useState({ value: user?.industry || "", label: user?.industry || "Please Select" });
    const [city, setCity] = useState({ value: user?.city || "", label: user?.city || "Please Select" });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            additionalName: user?.additionalName || "",
            pronouns: user?.pronouns || "",
            bio: user?.bio || "",
            website: user?.website || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            phoneType: user?.phoneType || "",
            address: user?.address || "",
        }
    });

    const updateContactInfo = async (data) => {
        onSave({ ...data, birthday: birthdayDate, region: region?.value, city: city?.value, industry: industry?.value });
    }

    return (
        <>
            {
                !isModalOpen ? (
                    <EditForm setRegion={setRegion} setCity={setCity} region={region} city={city} industry={industry} setIndustry={setIndustry} isLoading={isLoading} register={register} errors={errors} handleSubmit={handleSubmit} handleUpdate={updateContactInfo} onCancel={onCancel} setIsModalOpen={setIsModalOpen} />
                ) :
                    <EditContactInfo isLoading={isLoading} setBirthdayDate={setBirthdayDate} birthdayDate={birthdayDate} register={register} errors={errors} handleSubmit={handleSubmit} handleUpdate={updateContactInfo} onCancel={() => setIsModalOpen(false)} />
            }
        </>
    );
}

const EditContactInfo = ({ onCancel, isLoading, register, handleSubmit, handleUpdate, errors, birthdayDate, setBirthdayDate }) => {

    const [dateError, setDateError] = useState("");

    const onSave = (data) => {
        if (!birthdayDate) {
            setDateError("Please select your birthday");
            return;
        }
        const selectedDateMoment = moment(birthdayDate);
        const currentDate = moment();
        const age = currentDate.diff(selectedDateMoment, "years");

        if (age < 18) {
            setDateError("You must be at least 18 years old.");
        } else {
            handleUpdate(data);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSave)} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-y-auto scrollbar-thin min-h-[60vh]">
                <div className="space-y-4 px-4 pb-2">
                    <FormInput type="email" label="Email" placeholder="Enter Email" value={register("email", { required: "Email is required" })} error={errors.email && errors.email.message} />
                    <FormInput
                        type="number"
                        label="Phone number"
                        placeholder="Enter Phone number"
                        value={register("phoneNumber", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits"
                            }
                        })}
                        error={errors.phoneNumber && errors.phoneNumber.message}
                    />
                    <FormSelect label="Phone type" list={["Please Select", "Mobile", "Home", "Work"]} value={register("phoneType", { required: "Phone type is required" })} error={errors.phoneType && errors.phoneType.message} />
                    <FormTextArea label="Address" placeholder="Enter your address" value={register("address", { required: "Address is required" })} error={errors.address && errors.address.message} />

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
                            className={`block w-full border rounded-md focus:outline-none focus:ring-2 ${dateError ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-gray-900"}`}
                        />
                        {
                            dateError && <p className="text-red-600 text-sm">{dateError}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300 ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                >
                    Save
                </button>
            </div>
        </form>
    )
}

const EditForm = ({ onCancel, setIsModalOpen, isLoading, errors, register, handleSubmit, handleUpdate, region, setRegion, city, setCity, industry, setIndustry }) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [countryError, setCountryError] = useState("");
    const [cityError, setCityError] = useState("");
    const [industryError, setIndustryError] = useState("");

    useEffect(() => {
        getAllCountries();
        setIndustryList(Object.keys(industries).map((item) => ({ value: item, label: item })));
    }, [])

    useEffect(() => {
        if (region) {
            getAllCities(region.value);
        }
    }, [region])

    const getAllCountries = async () => {
        const data = await (await axios.get("https://countriesnow.space/api/v0.1/countries")).data;
        if (data?.data) {
            setCountries(data?.data.map((item) => ({ value: item?.country, label: item?.country })));
        }
    }

    const getAllCities = async (country) => {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
            country: country,
        });
        const data = response.data;
        if (data?.data) {
            setCities(data?.data.map((item) => ({ value: item, label: item })));
        }
    }

    const handleCountryChange = (selectedOption) => {
        if (selectedOption) {
            setCountryError("");
            getAllCities(selectedOption.value);
            setCity(null);
        }
        else {
            setCountryError("Please select country");
        }
        setRegion(selectedOption);
    };

    const handleCityChange = (selectedOption) => {
        if (selectedOption) {
            setCityError("");
        }
        else {
            setCityError("Please select city");
        }
        setCity(selectedOption);
    };

    const handleIndustryChange = (selectedOption) => {
        if (selectedOption) {
            setIndustryError("");
        }
        else {
            setIndustryError("Please select industry");
        }
        setIndustry(selectedOption);
    };

    const onSave = (data) => {
        if (!region.value)
            setCountryError("Please select country");

        if (!city.value)
            setCityError("Please select city");

        if (!industry.value)
            setIndustryError("Please select industry");

        if (!region.value || !city.value || !industry.value)
            return;

        handleUpdate(data);
        setIsModalOpen(false);
    }

    return (
        <form onSubmit={handleSubmit(onSave)} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-y-auto scrollbar scrollbar-thin max-h-[60vh]">
                <div className="space-y-4 p-2">
                    <FormInput label="First Name" placeholder="Enter your first name" value={register("firstName", { required: "First name is required" })} error={errors.firstName && errors.firstName.message} />
                    <FormInput label="Last Name" placeholder="Enter your last name" value={register("lastName", { required: "Last name is required" })} error={errors.lastName && errors.lastName.message} />
                    <FormInput label="Additional Name" placeholder="Enter additional name" value={register("additionalName")} error={errors.additionalName && errors.additionalName.message} />
                    <FormSelect label="Pronouns" list={["Please Select", "He/Him", "She/Her", "They/Them", "Custom"]} value={register("pronouns", { required: "Pronouns are required" })} error={errors.pronouns && errors.pronouns.message} />
                    <FormTextArea label="Headline" placeholder="Enter your headline" value={register("bio", { required: "Headline is required" })} error={errors.bio && errors.bio.message} />
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Industry</label>
                        <Select
                            options={industryList}
                            styles={customStyles(industryError)}
                            menuPortalTarget={document.body}
                            placeholder="Select a industry"
                            onChange={handleIndustryChange}
                            value={industry?.value && industry}
                            isClearable
                        />
                        {industryError && <p className="text-red-500 text-sm">{industryError}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Country/Region</label>
                        <Select
                            options={countries}
                            styles={customStyles(countryError)}
                            menuPortalTarget={document.body}
                            placeholder="Select a country"
                            onChange={handleCountryChange}
                            value={region?.value && region}
                            isClearable
                        />
                        {countryError && <p className="text-red-500 text-sm">{countryError}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <Select
                            options={cities}
                            styles={customStyles(cityError)}
                            menuPortalTarget={document.body}
                            placeholder="Select a city"
                            onChange={handleCityChange}
                            value={city}
                            isClearable
                        />
                        {cityError && <p className="text-red-500 text-sm">{cityError}</p>}
                    </div>

                    <div>
                        <h1 className="text-lg font-medium text-gray-700">Contact Info</h1>
                        <p className="text-sm mb-4">Add or edit your contact information</p>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            disabled={isLoading}
                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Edit contact info
                        </button>
                    </div>
                    <FormInput label="Website" placeholder="Enter your website" value={register("website", {
                        pattern: {
                            value: /^(https?:\/\/)?([a-z0-9]+[.-_])*[a-z0-9]+\.[a-z]{2,6}(\/[a-z0-9#]+\/?)*$/i,
                            message: "Please enter a valid website URL",
                        },
                    })} error={errors.website && errors.website.message} />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300 ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                >
                    Save
                </button>
            </div>
        </form>
    )
}

EditForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    errors: PropTypes.object,
    register: PropTypes.any,
    handleSubmit: PropTypes.any,
    handleUpdate: PropTypes.func,
    isLoading: PropTypes.bool,
    region: PropTypes.object,
    city: PropTypes.object,
    setRegion: PropTypes.func,
    setCity: PropTypes.func,
    industry: PropTypes.object,
    setIndustry: PropTypes.func
};

EditContactInfo.propTypes = {
    onCancel: PropTypes.func.isRequired,
    birthdayDate: PropTypes.any,
    setBirthdayDate: PropTypes.func,
    errors: PropTypes.object,
    register: PropTypes.any,
    handleSubmit: PropTypes.any,
    handleUpdate: PropTypes.func,
    isLoading: PropTypes.bool,
}

EditIntroForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default EditIntroForm;
