import { Edit2, Menu, MoveLeft, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import PropTypes from "prop-types";
import useApi from "../hook/useApi";
import { useForm } from "react-hook-form";
import FormSelect from "../components/Ui/FormSelect";
import FormTextArea from "../components/Ui/FormTextArea";
import FormInput from "../components/Ui/FormInput";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../utils/reactStyle";
import { use } from "react";
import ImageGrid from "../components/ImageUpload/ImageGrid";

const list = ["Please Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function EducationForm({ setIsOpen, refreshEducation, isUpdate, educationsData }) {
    const [skill, setSkill] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imagetitle, setImageTitle] = useState("");
    const [description, setDesctiption] = useState("");
    const [media, setMedia] = useState([]);
    const imageRef = useRef(null);
    const { apiAction } = useApi();
    const [pageList, setPageList] = useState([]);
    const [error, setError] = useState("");
    const [skills, setSkills] = useState([]);
    const [mediaList, setMediaList] = useState([]);
    const [isPresent, setIsPresent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [school, setSchool] = useState({});
    const [schoolError, setSchoolError] = useState("");
    const [imageIndex, setImageIndex] = useState(null);
    const [updatedImage,setUpdatedImage] = useState("");

    useEffect(() => {
        setSchool({ value: educationsData?.school._id, label: educationsData?.school.name });
    }, [educationsData])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            degree: educationsData?.degree || "",
            fieldOfStudy: educationsData?.fieldOfStudy || "",
            grade: educationsData?.grade || "",
            activities: educationsData?.activities || "",
            description: educationsData?.description || "",
            startMonth: educationsData?.startMonth || "",
            startYear: educationsData?.startYear || "",
            endMonth: educationsData?.endMonth || "",
            endYear: educationsData?.endYear || "",
        },
    });

    useEffect(() => {
        getAllSchools();
    }, [])

    useEffect(() => {
        if (isPresent) {
            setValue("endMonth", "");
            setValue("endYear", "");
        }
        else {
            setValue("endMonth", educationsData?.endMonth || "");
            setValue("endYear", educationsData?.endYear || "");
        }
    }, [isPresent])

    useEffect(() => {
        setSkills(educationsData?.skills ? educationsData?.skills : []);
        setMedia(educationsData?.media ? educationsData?.media : []);
        setMediaList(educationsData?.media ? educationsData?.media : []);
        setIsPresent(educationsData?.isPresent ? educationsData?.isPresent : false);
    }, [educationsData])

    const getAllSchools = async () => {
        const { success, data } = await apiAction({
            url: `/api/v1/getAllPages/school`,
            method: "GET",
        });

        if (success && data) {
            setPageList([...pageList, ...data]);
        }
    }

    const handleFormSubmit = async (data) => {
        let toastId = toast.loading("Adding education...");
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        skills.map((skill) => formData.append("skills", skill));
        mediaList.map((media) => {
            formData.append("media", media.url)
            formData.append("mediatitle", media.title)
            formData.append("mediaDescription", media.description)
        });
        formData.append("isPresent", isPresent);
        formData.append("school", school?.value);

        const { success } = await apiAction({
            url: "api/v1/profile/education/createEducation",
            method: "POST",
            isFormData: true,
            data: formData,
        });

        if (success) {
            toast.success("Education added successfully", { id: toastId });
            setIsLoading(false);
            refreshEducation();
            setIsOpen(false);
        }
    }

    const updateHandler = async (data) => {
        let toastId = toast.loading("Updating education...");
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        if (skills.length > 1) {
            skills.forEach((skill) => skill && formData.append("skills", skill));
        }
        else {
            formData.append("skills", [...skill]);
        }

        const uploadedMedia = mediaList.filter((media) => !(media.url instanceof File));
        uploadedMedia.map((media) => {
            formData.append("uploadedMedia", JSON.stringify(media))
        });
        mediaList?.filter((media) => media.url instanceof File).map((media) => {
            console.log(media)
            formData.append("media", media.url)
            formData.append("mediatitle", media.title)
            formData.append("mediaDescription", media.description)
        });
        formData.append("isPresent", isPresent);
        formData.append("school", school?.value);

        const { success } = await apiAction({
            url: `/api/v1/profile/education/editEducation/${educationsData?._id}`,
            method: "PUT",
            isFormData: true,
            data: formData,
        });

        if (success) {
            setIsLoading(false);
            toast.success("Education updated successfully", { id: toastId });
            refreshEducation();
            setIsOpen(false);
        }
    }

    const addSkills = () => {
        setError("");
        if (skill) {
            if (skills?.length <= 5) {
                setSkills(prev => [...prev, skill]);
                setSkill("");
            }
            else {
                setError("You can't add more than 5 skills");
            }
        }
        else {
            setError("Please enter a skill");
        }
    }

    const deleteSkill = (index) => {
        setSkills(skills.filter((skill, idx) => idx !== index));
    }

    const deleteMedia = () => {
        setMedia(media.filter((media, idx) => idx !== imageIndex));
        setMediaList(mediaList.filter((skill, idx) => idx !== imageIndex))
        setImageIndex(null);
        setImage("");
        setImagePreview("");
    }

    const imageUploadHandler = () => {
        imageRef?.current?.click();
    }

    useEffect(() => {
        if (image) {
            setImageTitle(image?.name);
            const previewURL = URL.createObjectURL(image);
            setImagePreview(previewURL);
        }
    }, [image])

    const resetData = () => {
        setImage("");
        setImagePreview("");
        setImageTitle("");
        setDesctiption("");
    }

    const applyMedia = () => {
        setMedia(prev => [...prev, { title: imagetitle, description: description, url: imagePreview }]);
        setMediaList(prev => [...prev, { title: imagetitle, description: description, url: image }]);
        resetData();
    }

    const deleteEducation = async () => {
        let toastId = toast("Deleting education...");
        setIsLoading(true);
        const { success } = await apiAction({
            url: `/api/v1/profile/education/deleteEducation/${educationsData?._id}`,
            method: "DELETE",
            data: {},
        });

        if (success) {
            toast.success("Education deleted successfully", { id: toastId });
            setIsLoading(false);
            refreshEducation();
            setIsOpen(false);
        }
    }

    const handleSchoolChange = (selectedOption) => {
        if (selectedOption) {
            setSchoolError("");
        }
        else {
            setSchoolError("Please select a school");
        }
        setSchool(selectedOption);
    };

    const onSave = (data) => {
        if (!school.value) {
            setSchoolError("Please select a school");
            return;
        }
        if (isUpdate) {
            updateHandler(data);
        }
        else {
            handleFormSubmit(data);
        }
    }

    const changeuploadMedia = async (image, index) => {
        const response = await fetch(image?.url);
        if (!response.ok) {
            throw new Error('Failed to fetch image from Cloudinary');
        }
        const blob = await response.blob();
        const file = new File([blob], image?.title, { type: blob.type });
        setImage(file);
        setImageIndex(index);
    }

    return (
        <>
            {
                image && imagePreview && <div className="flex flex-col gap-4">
                    <div onClick={resetData} className="flex items-center gap-2">
                        <div className="p-2 bg-[#866f55] bg-opacity-10 hover:cursor-pointer rounded-full" >
                            <MoveLeft width={20} height={20} />
                        </div>
                        <p className="text-md font-semibold">Back</p>
                    </div>
                    <Input label={"Title"} value={imagetitle} setvalue={setImageTitle} />
                    <Textarea
                        label="Description"
                        name="description"
                        value={description}
                        setvalue={setDesctiption}
                        required
                        maxLength={2000}
                        rows={4}
                        placeholder="Ex: topics, schedule, etc."
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Thumbnail</p>
                        <div className="relative group aspect-square h-52 w-52 ">
                            <img
                                src={imagePreview}
                                alt={image?.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                {/* onClick={() => onFileChange(index)} */}
                                <button type="button" onClick={imageUploadHandler} className="p-2 bg-white rounded-full hover:bg-gray-100">
                                    <Edit2 className="w-5 h-5 text-gray-700" />
                                </button>
                                <input accept="image/*" className="hidden" type="file" ref={imageRef}  value={updatedImage} onChange={(e) => changeuploadMedia(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={deleteMedia} className='bg-gray-200 px-4 py-1 rounded-full text-gray-700 font-semibold text-md' type="button">
                            Delete
                        </button>
                        <button onClick={applyMedia} className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="button">
                            Apply
                        </button>
                    </div>
                </div>
            }
            {
                !image && !imagePreview && <form onSubmit={handleSubmit(onSave)} className='flex flex-col gap-4'>
                    <div className='max-h-[60vh] overflow-y-scroll'>
                        <div className='flex flex-col gap-4 px-2'>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">School</label>
                                <CreatableSelect
                                    id="school-select"
                                    options={pageList?.map((item) => ({ value: item._id, label: item.name }))}
                                    styles={customStyles(schoolError)}
                                    menuPortalTarget={document.body}
                                    placeholder="Select company"
                                    onChange={handleSchoolChange}
                                    value={school}
                                    isClearable
                                />
                                {schoolError && <p className="text-red-500 text-sm">{schoolError}</p>}
                            </div>
                            <FormSelect label="Degree" list={["Please Select", "High School", "Associate", "Bachelor's", "Master's", "Doctorate"]} value={register("degree", { required: "Degree is required" })} error={errors.degree && errors.degree.message} />
                            <FormSelect label="Field of study" list={["Please Select", "Computer Science", "Mechanical Engineer", "Doctor"]} value={register("fieldOfStudy", { required: "Field of study is required" })} error={errors.fieldOfStudy && errors.fieldOfStudy.message} />
                            <div className="flex gap-2">
                                <input checked={isPresent} onChange={() => setIsPresent(prev => !prev)} className="w-6 h-6" name="im" type="checkbox" />
                                <label htmlFor="im">I am currently working in this role</label>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <FormSelect label="Start Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} value={register("startYear", { required: "start Year is required" })} error={errors.startYear && errors.startYear.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect label="Start Month" list={watch("startYear") == new Date().getFullYear() ? list.slice(0, new Date().getMonth() + 2) : list} value={register("startMonth", { required: "start Month is required" })} error={errors.startMonth && errors.startMonth.message} />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} value={register("endYear", isPresent ? { required: false } : { required: "End Year is required" })} error={isPresent ? "" : errors.endYear && errors.endYear.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Month" list={watch("endYear") == new Date().getFullYear() ? list.slice(0, new Date().getMonth() + 2) : list} value={register("endMonth", isPresent ? { required: false } : { required: "End Month is required" })} error={isPresent ? "" : errors.endMonth && errors.endMonth.message} />
                                </div>
                            </div>
                            <FormInput placeholder="Ex: 10.00" label="Grade" value={register("grade", { required: "Grade is required" })} error={errors.grade && errors.grade.message} />
                            <FormInput placeholder="Ex: Volleyball, Boxing" label="Activities and societies" value={register("activities", { required: "Activities and societies is required" })} error={errors.activities && errors.activities.message} />
                            <FormTextArea placeholder="Ex: Description for Your Educations" label="Description" value={register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />
                            <div>
                                <label className="block text-lg font-medium text-gray-700">
                                    Skills
                                </label>
                                <p className='text-sm mb-1 text-gray-600'>Add skill keywords (max 5) to make your job more visible to the right candidates.</p>
                                <div className='flex gap-2 items-center mt-2'>
                                    <div className='w-52'>
                                        <Input disable={skills?.length >= 5 ? true : false} placeholder={"Enter Skill"} value={skill} setvalue={setSkill} />
                                    </div>
                                    <button type="button" onClick={addSkills} disabled={skills?.length >= 5 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills?.length >= 5 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Skill
                                    </button>
                                </div>
                                {
                                    error && <div className='text-red-600 mt-2'>{error}</div>
                                }
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {
                                        skills && skills?.length > 0 && skills?.map((skill, index) => (
                                            <span onClick={() => deleteSkill(index)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
                                                {skill} <X size={20} />
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="block text-lg font-medium text-gray-700">
                                    Media
                                </label>
                                <p className='text-sm mb-1 text-gray-600'>Add media like images, documents, sites or presentations.</p>
                                <div className='flex gap-2 items-center mt-2'>
                                    <button onClick={imageUploadHandler} type="button" disabled={skills?.length >= 10 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills?.length >= 10 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Media
                                    </button>
                                    <input accept="image/*" className="hidden" type="file" ref={imageRef} value={image} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="max-w-2xl mt-4 bg-gray-50">
                                    <div className="space-y-2">
                                        {media && media.length > 0 && media.map((image, index) => (
                                            <>
                                                <div onClick={() => changeuploadMedia(image, index)} className="hover:cursor-pointer flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                                                            <img
                                                                src={image?.url}
                                                                alt={image?.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <h3 className="text-lg font-medium text-gray-900">{image?.title}</h3>
                                                    </div>
                                                    <button type="button" onClick={() => changeuploadMedia(image, index)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                                        <Menu className="w-5 h-5 text-gray-500" />
                                                    </button>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-8 border-t pt-4 border-gray-300 flex ${isUpdate ? "justify-between" : "justify-end"}`}>
                        {
                            isUpdate && <button disabled={isLoading} onClick={deleteEducation} className={`bg-gray-200 px-4 py-1 rounded-full text-gray-700 font-semibold text-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`} type="button">
                                Delete
                            </button>
                        }
                        <button disabled={isLoading} className={`bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`} type="submit">
                            {isUpdate ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            }
        </>
    )
}

EducationForm.propTypes = {
    setIsOpen: PropTypes.func,
    refreshEducation: PropTypes.func,
    isUpdate: PropTypes.bool,
    educationsData: PropTypes.object
}

export default EducationForm
