import { MoveLeft, Plus, X } from "lucide-react"
import Input from "../components/Ui/Input"
import Textarea from "../components/Ui/Textarea"
import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import useApi from "../hook/useApi"
import { useForm } from "react-hook-form"
import FormSelect from "../components/Ui/FormSelect"
import FormTextArea from "../components/Ui/FormTextArea"
import FormMultiSelect from "../components/Ui/FormMultiSelect"
import FormInput from "../components/Ui/FormInput"

const list = ["Please Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ExperienceForm({ setIsOpen, refreshExperience, experienceData }) {
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imagetitle, setImageTitle] = useState("");
    const [description, setDesctiption] = useState("");
    const [media, setMedia] = useState([]);
    const [mediaList, setMediaList] = useState([]);
    const imageRef = useRef(null);
    const { apiAction } = useApi();
    const [pageList, setPageList] = useState([]);
    const [isPresent, setIsPresent] = useState(false);
    const [error, setError] = useState("");

    console.log(experienceData);

    useEffect(()=>{
        if(pageList.length > 0)
        {
            setValue("company", experienceData?.company._id);
        }
    },[pageList])

    useEffect(()=>{
        // setSkills(experienceData?.skills);
        setMedia(experienceData?.media);
        setMediaList(experienceData?.media);
    },[experienceData])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            title: experienceData?.title || "",
            company: experienceData?.company._id || "",
            startMonth: experienceData?.startMonth || "",
            startYear: experienceData?.startYear || "",
            endMonth: experienceData?.endMonth || "",
            endYear: experienceData?.endYear || "",
            locationType: experienceData?.locationType || "",
            location: experienceData?.location || "",
            description: experienceData?.description || "",
            employmentType: experienceData?.employmentType || "",
        },
    });

    useEffect(() => {
        getAllCompanies();
    }, [])

    const handleFormSubmit = async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        if (skills.length > 1) {
            skills.forEach((skill) => skill && formData.append("skills", skill));
        }
        else {
            formData.append("skills", [...skill]);
        }
        mediaList.map((media) => {
            formData.append("media", media.url)
            formData.append("mediatitle", media.title)
            formData.append("mediaDescription", media.description)
        });
        formData.append("isPresent", isPresent);

        const { success } = await apiAction({
            url: "api/v1/profile/experience/createExperience",
            method: "POST",
            isFormData: true,
            data: formData,
        });

        if (success) {
            refreshExperience();
            setIsOpen(false);
        }
    }

    const getAllCompanies = async () => {
        const { success, data } = await apiAction({
            url: `/api/v1/getAllPages/all`,
            method: "GET",
        });

        if (success && data) {
            setPageList(data);
        }
    }

    const addSkills = () => {
        setError("");
        if (skill) {
            if (skills.length <= 5) {
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
        setError("");
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
        setMedia(prev => [...prev, { title: imagetitle, description: description, url: imagePreview }]);
        setMediaList(prev => [...prev, { title: imagetitle, description: description, url: image }]);
        resetData();
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
                !image && !imagePreview && <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className='max-h-[60vh] overflow-y-scroll'>
                        <div className='flex flex-col gap-4 px-2'>
                            <FormInput label="Title" placeholder="Ex: Retail Sales Manager" value={register("title", { required: "Title is required" })} error={errors.title && errors.title.message} />
                            <FormSelect label="Employment type" list={["Please Select", "Full-time", "Part-time", "Self-employed", "Freelance", "Internship", "Trainee"]} value={register("employmentType", { required: "Employment Type is required" })} error={errors.employmentType && errors.employmentType.message} />
                            <FormMultiSelect data={watch("company")} setData={setValue} label="Company name" list={[{ id: "", name: "Please Select" }, ...pageList]} value={register("company", { required: "Company is required" })} error={errors.company && errors.company.message} />
                            <FormInput label="Location" placeholder="Ex: London, United Kingdom" value={register("location", { required: "Location is required" })} error={errors.location && errors.location.message} />
                            <FormSelect label="Location type" list={["Please Select", "On-site", "Hybrid", "Remote"]} value={register("locationType", { required: "location Type is required" })} error={errors.locationType && errors.locationType.message} />
                            <div className="flex gap-2">
                                <input onChange={() => setIsPresent(prev => !prev)} className="w-6 h-6" name="im" type="checkbox" />
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
                                    <FormSelect disable={isPresent} label="End Month" list={list} value={register("endMonth", isPresent ? {required:false} : { required: "End Month is required" })} error={errors.endMonth && errors.endMonth.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} value={register("endYear", isPresent ? {required:false} : { required: "End Year is required" })} error={errors.endYear && errors.endYear.message} />
                                </div>
                            </div>

                            <FormTextArea label="Description" placeholder="Ex: topics, schedule, etc." value={register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />

                            <div>
                                <label className="block text-lg font-medium text-gray-700">
                                    Skills
                                </label>
                                <p className='text-sm mb-1 text-gray-600'>Add skill keywords (max 5) to make your job more visible to the right candidates.</p>
                                <div className='flex gap-2 items-center mt-2'>
                                    <div className='w-52'>
                                        <Input disable={skills.length >= 5 ? true : false} placeholder={"Enter Skill"} value={skill} setvalue={setSkill} />
                                    </div>
                                    <button type="button" onClick={addSkills} disabled={skills.length >= 5 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills.length >= 5 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Skill
                                    </button>
                                </div>
                                {
                                    error && <div className='text-red-600 mt-2'>{error}</div>
                                }
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {
                                        skills && skills.length > 0 && skills.map((skill, index) => (
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
                                    <button onClick={imageUploadHandler} type="button" disabled={skills.length >= 10 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills.length >= 10 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Media
                                    </button>
                                    <input accept="image/" className="hidden" type="file" ref={imageRef} value={image} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {
                                        media && media.length > 0 && media.map((image, index) => (
                                            <span onClick={() => deleteMedia(index)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
                                                <img className="w-6 h-6 object-contain" src={image?.url} alt={image?.title} /> {image?.title} <X size={20} />
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                        <button className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
                            Create
                        </button>
                    </div>
                </form>
            }
        </>
    )
}

ExperienceForm.propTypes = {
    setIsOpen: PropTypes.func,
    refreshExperience: PropTypes.func,
    experienceData: PropTypes.object
}

export default ExperienceForm
