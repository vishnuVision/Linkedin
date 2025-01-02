import { MoveLeft, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import PropTypes from "prop-types";
import useApi from "../hook/useApi";
import { useForm } from "react-hook-form";
import FormSelect from "../components/Ui/FormSelect";
import FormMultiSelect from "../components/Ui/FormMultiSelect";
import FormTextArea from "../components/Ui/FormTextArea";
import FormInput from "../components/Ui/FormInput";
import toast from "react-hot-toast";

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
    const [isLoading,setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            school: educationsData?.school._id || ["Please Select"],
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
        if (pageList?.length > 0) {
            setValue("school", educationsData?.school._id);
        }
    }, [pageList])

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
        let toastId = toast("Adding education...");
        isLoading(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        skills.map((skill) => formData.append("skills", skill));
        mediaList.map((media) => {
            formData.append("media", media.url)
            formData.append("mediatitle", media.title)
            formData.append("mediaDescription", media.description)
        });
        formData.append("isPresent", isPresent);

        const { success } = await apiAction({
            url: "api/v1/profile/education/createEducation",
            method: "POST",
            isFormData: true,
            data: formData,
        });

        if (success) {
            toast.success("Education added successfully", { id: toastId });
            isLoading(false);
            refreshEducation();
            setIsOpen(false);
        }
    }

    const updateHandler = async (data) => {
        let toastId = toast("Updating education...");
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

    const deleteMedia = (index) => {
        setMedia(media.filter((media, idx) => idx !== index));
        setMediaList(mediaList.filter((skill, idx) => idx !== index))
    }

    const imageUploadHandler = () => {
        imageRef.current.click();
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
        setMedia(prev => [...prev, { title: imagetitle, description: description, preview: imagePreview }]);
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
                        <img className="w-64 object-contain border rounded-lg" src={imagePreview} alt={image?.name} />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={applyMedia} className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="button">
                            Apply
                        </button>
                    </div>
                </div>
            }
            {
                !image && !imagePreview && <form onSubmit={handleSubmit(isUpdate ? updateHandler : handleFormSubmit)} className='flex flex-col gap-4'>
                    <div className='max-h-[60vh] overflow-y-scroll'>
                        <div className='flex flex-col gap-4 px-2'>
                            <FormMultiSelect data={watch("school")} setData={setValue} label="School" list={[{ _id: "", name: "Please Select" }, ...pageList]} value={register("school", { required: "School is required" })} error={errors.school && errors.school.message} />
                            <FormSelect label="Degree" list={["Please Select", "High School", "Associate", "Bachelor's", "Master's", "Doctorate"]} value={register("degree", { required: "Degree is required" })} error={errors.degree && errors.degree.message} />
                            <FormSelect label="Field of study" list={["Please Select", "Computer Science", "Mechanical Engineer", "Doctor"]} value={register("fieldOfStudy", { required: "Field of study is required" })} error={errors.fieldOfStudy && errors.fieldOfStudy.message} />
                            <div className="flex gap-2">
                                <input checked={isPresent} onChange={() => setIsPresent(prev => !prev)} className="w-6 h-6" name="im" type="checkbox" />
                                <label htmlFor="im">I am currently working in this role</label>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <FormSelect label="Start Month" list={list} value={register("startMonth", { required: "start Month is required" })} error={errors.startMonth && errors.startMonth.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect label="Start Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} value={register("startYear", { required: "start Year is required" })} error={errors.startYear && errors.startYear.message} />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Month" list={list} value={register("endMonth", isPresent ? { required: false } : { required: "End Month is required" })} error={isPresent ? "" : errors.endMonth && errors.endMonth.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} value={register("endYear", isPresent ? { required: false } : { required: "End Year is required" })} error={isPresent ? "" : errors.endYear && errors.endYear.message} />
                                </div>
                            </div>
                            <FormInput label="Grade" value={register("grade", { required: "Grade is required" })} error={errors.grade && errors.grade.message} />
                            <FormInput label="Activities and societies" value={register("activities", { required: "Activities and societies is required" })} error={errors.activities && errors.activities.message} />
                            <FormTextArea label="Description" value={register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />
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
                                    <input accept="image/" className="hidden" type="file" ref={imageRef} value={image} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {
                                        media && media?.length > 0 && media.map((image, index) => (
                                            <span onClick={() => deleteMedia(index)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
                                                <img className="w-6 h-6 object-contain" src={image?.url} alt={image?.title} /> {image?.title} <X size={20} />
                                            </span>
                                        ))
                                    }
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
                        <button disabled={isLoading} className={`bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" :""}`} type="submit">
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
