import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../components/Ui/FormInput";
import { useForm } from "react-hook-form";
import FormSelect from "../components/Ui/FormSelect";
import FormTextArea from "../components/Ui/FormTextArea";
import DatePicker from "react-datepicker";

function EditIntroForm({ onSave, onCancel, user, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [birthdayDate, setBirthdayDate] = useState(user?.birthday || null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            additionalName: user?.additionalName || "",
            pronouns: user?.pronouns || "",
            bio: user?.bio || "",
            industry: user?.industry || "",
            region: user?.region || "",
            city: user?.city || "",
            website: user?.website || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            phoneType: user?.phoneType || "",
            address: user?.address || "",
        }
    });

    const updateContactInfo = async (data) => {
        onSave({ ...data, birthday: birthdayDate });
    }

    return (
        <>
            {
                !isModalOpen ? (
                    <EditForm user={user} isLoading={isLoading} register={register} errors={errors} handleSubmit={handleSubmit} handleUpdate={updateContactInfo} onCancel={onCancel} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                ) :
                    <EditContactInfo user={user} isLoading={isLoading} setBirthdayDate={setBirthdayDate} birthdayDate={birthdayDate} setValue={setValue} register={register} errors={errors} watch={watch} handleSubmit={handleSubmit} handleUpdate={updateContactInfo} onCancel={() => setIsModalOpen(false)} />
            }
        </>
    );
}

const EditContactInfo = ({ onCancel, isLoading, register, handleSubmit, handleUpdate, errors, birthdayDate, setBirthdayDate }) => {
    return (
        <form onSubmit={handleSubmit(handleUpdate)} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-auto min-h-[60vh]">
                <div className="space-y-4 px-4 pb-2">
                    <FormInput type="email" label="Email" placeholder="Enter Email" value={register("email", { required: "Email is required" })} error={errors.email && errors.email.message} />
                    <FormInput label="Phone number" placeholder="Enter Phone number" value={register("phoneNumber", { required: "Phone number is required" })} error={errors.phoneNumber && errors.phoneNumber.message} />
                    <FormSelect label="Phone type" list={["Please Select", "Mobile", "Home", "Work"]} value={register("phoneType", { required: "Phone type is required" })} error={errors.phoneType && errors.phoneType.message} />
                    <FormTextArea label="Address" placeholder="Enter your address" value={register("address", { required: "Address is required" })} error={errors.address && errors.address.message} />
                    <div className="flex flex-col">
                        <label htmlFor="birthday" className="">Birthday</label>
                        <DatePicker selected={birthdayDate} onChange={(date) => setBirthdayDate(date)} className="block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"/>
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

const EditForm = ({ onCancel, setIsModalOpen, isLoading, errors, register, handleSubmit, handleUpdate }) => {

    return (
        <form onSubmit={handleSubmit(handleUpdate)} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-auto max-h-[60vh]">
                <div className="space-y-4">
                    <FormInput label="First Name" placeholder="Enter your first name" value={register("firstName", { required: "First name is required" })} error={errors.firstName && errors.firstName.message} />
                    <FormInput label="Last Name" placeholder="Enter your last name" value={register("lastName", { required: "Last name is required" })} error={errors.lastName && errors.lastName.message} />
                    <FormInput label="Additional Name" placeholder="Enter additional name" value={register("additionalName", { required: "Additional name is required" })} error={errors.additionalName && errors.additionalName.message} />
                    <FormSelect label="Pronouns" list={["Please Select", "He/Him", "She/Her", "They/Them", "Custom"]} value={register("pronouns", { required: "Pronouns are required" })} error={errors.pronouns && errors.pronouns.message} />
                    <FormTextArea label="Headline" placeholder="Enter your headline" value={register("bio", { required: "Headline is required" })} error={errors.bio && errors.bio.message} />
                    <FormSelect label="Industry" list={["Please Select", "Information Technology", "Finance", "Accounting", "Legal"]} value={register("industry", { required: "Industry is required" })} error={errors.industry && errors.industry.message} />
                    <FormSelect label="Country/Region" list={["Please Select", "India", "Canada", "USA"]} value={register("region", { required: "Country/Region is required" })} error={errors.region && errors.region.message} />
                    <FormSelect label="City" list={["Please Select", "Gujarat", "Maharashtra", "Rajasthan"]} value={register("city", { required: "City is required" })} error={errors.city && errors.city.message} />
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
                    <FormInput label="Website" placeholder="Enter your website" value={register("website", { required: "Website is required" })} error={errors.website && errors.website.message} />
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
};

EditContactInfo.propTypes = {
    onCancel: PropTypes.func.isRequired,
    birthdayDate: PropTypes.any,
    setBirthdayDate: PropTypes.func,
    errors: PropTypes.object,
    register: PropTypes.any,
    handleSubmit: PropTypes.any,
    handleUpdate: PropTypes.func,
    setValue: PropTypes.func,
    isLoading: PropTypes.bool,
}

EditIntroForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default EditIntroForm;
