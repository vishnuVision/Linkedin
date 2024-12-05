import PropTypes from "prop-types";
import { useState } from "react";
import Input from "../components/Ui/Input";
import Select from "../components/Ui/Select";
import Textarea from "../components/Ui/Textarea";

const list = ["Please Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function EditIntroForm({ onSave, onCancel }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateContactInfo = async (e) => {
        e.preventDefault();
    }
    
    return (
        <>
            {
                !isModalOpen ? (
                    <EditForm onSave={onSave} onCancel={onCancel} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                ) :
                    <EditContactInfo handleSubmit={updateContactInfo} onCancel={()=>setIsModalOpen(false)}/>
            }
        </>
    );
}

const EditContactInfo = ({ handleSubmit, onCancel }) => {
    const [phNo, setPhNo] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [month, setMonth] = useState(0);
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");

    const getDaysInMonth = (month, year = new Date().getFullYear()) => {
        if (!month) return [];
        const days = new Date(year, month, 0).getDate();
        return Array.from({ length: days }, (_, i) => (i + 1).toString());
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        const daysList = getDaysInMonth(e.target.value);
        setDays(["Please Select", ...daysList]);
        setSelectedDay("");
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-auto min-h-[60vh]">
                <div className="space-y-4 px-4 pb-2">
                    <Input label="Email" placeholder="Enter Email" value={email} setvalue={setEmail} />
                    <Input label="Phone number" placeholder="Enter Phone number" value={phNo} setvalue={setPhNo} />
                    <Select label="Phone type" list={["Please Select", "Mobile", "Home", "Work"]} value={phoneType} setValue={setPhoneType} />
                    <Textarea label="Address" placeholder="Enter your address" value={address} setvalue={setAddress} />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birthday</label>
                        <div className="flex gap-2">
                            <select value={month} onChange={handleMonthChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {
                                    list && list.length > 0 && list.map((item, index) => (
                                        <option key={index} value={index}>{item}</option>
                                    ))
                                }
                            </select>
                            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {
                                    days && days.length > 0 && days.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

const EditForm = ({ onSave, onCancel, setIsModalOpen }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [additionalName, setAdditionalName] = useState("");
    const [pronous, setPronous] = useState("");
    const [headline, setHeadline] = useState("");
    const [Industry, setIndustry] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [website, setWebsite] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-auto max-h-[60vh]">
                <div className="space-y-4">
                    <Input label="First Name" placeholder="Enter your first name" value={firstName} setvalue={setFirstName} />
                    <Input label="Last Name" placeholder="Enter your Last name" value={lastName} setvalue={setLastName} />
                    <Input label="Additional Name" placeholder="Enter Additional name" value={additionalName} setvalue={setAdditionalName} />
                    <Select label="Pronouns" list={["Please Select", "He/Him", "She/Her", "They/Them", "Custom"]} value={pronous} setValue={setPronous} />
                    <Textarea label="Headline" placeholder="Enter your Headline" value={headline} setvalue={setHeadline} />
                    <Select label="Industry" list={["Please Select", "Information Technology", "Finance", "Accounting", "Legal"]} value={Industry} setValue={setIndustry} />
                    <Select label="Country/Region" list={["Please Select", "India", "Canada", "USA"]} value={country} setValue={setCountry} />
                    <Select label="City" list={["Please Select", "Surat", "Vadodara"]} value={city} setValue={setCity} />
                    <div>
                        <h1 className="text-lg font-medium text-gray-700">Contact Info</h1>
                        <p className="text-sm mb-4">Add or edit your contact information</p>
                        <button type="button" onClick={() => { setIsModalOpen(true) }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Edit contact info</button>
                    </div>
                    <Input label="Webite" placeholder="Enter Your Website" value={website} setvalue={setWebsite} />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

EditForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};

EditContactInfo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

EditIntroForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditIntroForm;
