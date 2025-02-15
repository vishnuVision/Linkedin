import { Edit2, Menu, MoveLeft, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import PropTypes from "prop-types";
import useApi from "../hook/useApi";
import { useForm } from "react-hook-form";
import FormSelect from "../components/Ui/FormSelect";
import FormTextArea from "../components/Ui/FormTextArea";
import FormInput from "../components/Ui/FormInput";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { customStyles } from "../utils/reactStyle";
import { default as skillsData } from 'skills';
import { degreesList, fieldsOfStudy as fieldList } from "../constants/constant";

const list = ["Please Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function EducationForm({ setIsOpen, refreshEducation, isUpdate, educationsData }) {
    const [skillsList, setSkillsList] = useState([]);
    const [skills, setSkills] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [skill, setSkill] = useState({});
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [deletedSkills, setDeletedSkills] = useState([]);

    const [fieldOfStudy, setFieldsOfStudy] = useState({});
    const [degree, setDegree] = useState({});
    const [studyError, setStudyError] = useState("");
    const [degreeError, setDegreeError] = useState("");

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imagetitle, setImageTitle] = useState("");
    const [description, setDesctiption] = useState("");
    const [media, setMedia] = useState([]);
    const imageRef = useRef(null);
    const { apiAction } = useApi();
    const [pageList, setPageList] = useState([]);
    const [mediaList, setMediaList] = useState([]);
    const [isPresent, setIsPresent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [school, setSchool] = useState({});
    const [schoolError, setSchoolError] = useState("");
    const [imageIndex, setImageIndex] = useState(null);

    useEffect(() => {
        const data = skillsData.filter(({ tagName }) =>
            tagName.toLowerCase().includes(searchInput.toLowerCase())
        ).slice(0, 100);
        setSkillsList(data.map(({ tagName }) => ({ value: tagName, label: tagName })));
    }, [skillsData, searchInput]);

    useEffect(() => {
        if (educationsData) {
            console.log(educationsData);
            setSchool({ value: educationsData?.school._id, label: educationsData?.school.name });
            setFieldsOfStudy({ value: educationsData?.fieldOfStudy, label: educationsData?.fieldOfStudy });
            setDegree({ value: educationsData?.degree, label: educationsData?.degree });
        }
    }, [educationsData])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
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
        if (skills.length > 1) {
            skills.map((skill) => skill && formData.append("skills", skill));
        }
        else {
            if (skills.length > 0)
                formData.append("skills", skills[0]);
        }
        mediaList.map((media) => {
            formData.append("media", media.url)
            formData.append("mediatitle", media.title)
            formData.append("mediaDescription", media.description)
        });
        formData.append("isPresent", isPresent);
        formData.append("school", school?.value);
        formData.append("fieldOfStudy", fieldOfStudy?.value);
        formData.append("degree", degree?.value);

        const { success } = await apiAction({
            url: "api/v1/profile/education/createEducation",
            method: "POST",
            isFormData: true,
            data: formData,
        });

        if (success) {
            toast.update(toastId, { render: "Education added successfully", type: "success", isLoading: false, autoClose: 3000 });
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
            skills.map((skill) => skill && formData.append("skills", skill));
        }
        else {
            if (skills.length > 0)
                formData.append("skills", skills[0]);
        }

        if (deletedSkills.length > 1) {
            deletedSkills.map((skill) => formData.append("deletedSkills", skill));
        }
        else {
            if (deletedSkills.length > 0)
                formData.append("deletedSkills", deletedSkills[0]);
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
        formData.append("fieldOfStudy", fieldOfStudy?.value);
        formData.append("degree", degree?.value);

        const { success } = await apiAction({
            url: `/api/v1/profile/education/editEducation/${educationsData?._id}`,
            method: "PUT",
            isFormData: true,
            data: formData,
        });

        if (success) {
            setIsLoading(false);
            toast.update(toastId, { render: "Education updated successfully", type: "success", isLoading: false, autoClose: 3000 });
            refreshEducation();
            setIsOpen(false);
        }
    }

    const addSkills = () => {
        setError("");
        if (skill.value) {
            const skillExists = skills.some((s) => s.toLowerCase() === skill.value.toLowerCase());

            if (skillExists) {
                setError("Skill already exists");
            } else if (skills?.length < 5) {
                setSkills((prev) => [...prev, skill.value]);
                setSkill("");
            } else {
                setError("You can't add more than 5 skills");
            }
        } else {
            setError("Please enter a skill");
        }
    }

    const deleteSkill = (index, id) => {
        setSkills(skills.filter((skill, idx) => idx !== index));
        if (id) {
            setDeletedSkills((prev) => [...prev, id])
        }
    }

    const deleteMedia = () => {
        setMedia(media.filter((media, idx) => idx !== imageIndex));
        setMediaList(mediaList.filter((skill, idx) => idx !== imageIndex))
        setImageIndex(null);
        setImage("");
        setImagePreview("");
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
        setImageIndex(null);
    }

    const applyMedia = () => {
        if (imageIndex !== null) {
            setMedia(media.map((media, idx) => idx === imageIndex ? { title: imagetitle, description: description, url: imagePreview } : media));
            setMediaList(mediaList.map((media, idx) => idx === imageIndex ? { title: imagetitle, description: description, url: image } : media));
        }
        else {
            setMedia(prev => [...prev, { title: imagetitle, description: description, url: imagePreview }]);
            setMediaList(prev => [...prev, { title: imagetitle, description: description, url: image }]);
        }
        resetData();
    }

    const deleteEducation = async () => {
        let toastId = toast.loading("Deleting education...");
        setIsLoading(true);
        const { success } = await apiAction({
            url: `/api/v1/profile/education/deleteEducation/${educationsData?._id}`,
            method: "DELETE",
            data: {},
        });

        if (success) {
            toast.update(toastId, { render: "Education deleted successfully", type: "success", isLoading: false, autoClose: 2000 });
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

    const handlefieldOfStudyChange = (selectedOption) => {
        if (selectedOption) {
            setStudyError("");
        }
        else {
            setStudyError("Please select a field of study");
        }
        setFieldsOfStudy(selectedOption);
    };

    const handledegreeChange = (selectedOption) => {
        if (selectedOption) {
            setDegreeError("");
        }
        else {
            setDegreeError("Please select a degree");
        }
        setDegree(selectedOption);
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
        setDesctiption(image?.description);
        setImage(file);
        setImageIndex(index);
    }

    const handleSkillsChange = (selectedOption) => {
        if (selectedOption) {
            setError("");
        }
        else {
            setError("Please select or add a skill");
        }
        setSkill(selectedOption);
    };

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
                                <button type="button" onClick={() => imageRef.current.click()} className="p-2 bg-white rounded-full hover:bg-gray-100">
                                    <Edit2 className="w-5 h-5 text-gray-700" />
                                </button>
                                <input accept="image/*" className="hidden" type="file" ref={imageRef} onChange={(e) => setImage(e.target.files[0])} />
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
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">School</label>
                                <CreatableSelect
                                    id="school-select"
                                    options={pageList?.map((item) => ({ value: item._id, label: item.name }))}
                                    styles={customStyles(schoolError)}
                                    menuPortalTarget={document.body}
                                    placeholder="Select school"
                                    onChange={handleSchoolChange}
                                    value={school?.value && school}
                                    isClearable
                                />
                                {schoolError && <p className="text-red-500 text-sm">{schoolError}</p>}
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">Degree</label>
                                <Select
                                    options={degreesList}
                                    styles={customStyles(degreeError)}
                                    menuPortalTarget={document.body}
                                    placeholder="Select Degree"
                                    onChange={handledegreeChange}
                                    value={degree?.value && degree}
                                    isClearable
                                />
                                {degreeError && <p className="text-red-500 text-sm">{degreeError}</p>}
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">Field of study</label>
                                <Select
                                    options={fieldList}
                                    styles={customStyles(studyError)}
                                    menuPortalTarget={document.body}
                                    placeholder="Select Field Of Study"
                                    onChange={handlefieldOfStudyChange}
                                    value={fieldOfStudy?.value && fieldOfStudy}
                                    isClearable
                                />
                                {studyError && <p className="text-red-500 text-sm">{studyError}</p>}
                            </div>

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
                                    <FormSelect disable={isPresent} label="End Year" list={["Please Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).filter((year) => year === "Please Select" || parseInt(year, 10) >= watch("startYear"))]} value={register("endYear", isPresent ? { required: false } : { required: "End Year is required" })} error={isPresent ? "" : errors.endYear && errors.endYear.message} />
                                </div>
                                <div className='flex-grow'>
                                    <FormSelect disable={isPresent} label="End Month" list={(() => {
                                        const currentYear = new Date().getFullYear();
                                        const currentMonth = new Date().getMonth();
                                        if (watch("endYear") == currentYear) {
                                            if (watch("endYear") === watch("startYear")) {
                                                return ["Please select", ...list.slice(list.indexOf(watch("startMonth")), currentMonth + 2)]
                                            }
                                            else {
                                                return [...list.slice(0, currentMonth + 2)]
                                            }
                                        }
                                        else if (watch("endYear") === watch("startYear")) {
                                            return ["Please Select", ...list.slice(list.indexOf(watch("startMonth")))]
                                        }
                                        else {
                                            return list;
                                        }
                                    })()} value={register("endMonth", isPresent ? { required: false } : { required: "End Month is required" })} error={isPresent ? "" : errors.endMonth && errors.endMonth.message} />
                                </div>
                            </div>
                            <FormInput type="number" placeholder="Ex: 10.00" label="Grade" value={register("grade", { required: "Grade is required", valueAsNumber: true, min: { value: 0, message: "Grade must be greater than 0" }, max: { value: 10, message: "Grade must be less than 10" } })} error={errors.grade && errors.grade.message} />
                            <FormInput placeholder="Ex: Volleyball, Boxing" label="Activities and societies" value={register("activities", { required: "Activities and societies is required" })} error={errors.activities && errors.activities.message} />
                            <FormTextArea placeholder="Ex: Description for Your Educations" label="Description" value={register("description", { required: "Description is required" })} error={errors.description && errors.description.message} />
                            <div>
                                <label className="block text-lg font-medium text-gray-700">
                                    Skills
                                </label>
                                <p className='text-sm mb-1 text-gray-600'>Add skill keywords (max 5) to make your job more visible to the right candidates.</p>
                                <div className='flex gap-2 items-center mt-2'>
                                    {
                                        isEdit && (
                                            <div className={`flex-grow ${skills?.length >= 5 ? "bg-gray-200 cursor-not-allowed" : ""}`}>
                                                <CreatableSelect
                                                    options={skillsList}
                                                    styles={customStyles(error, skills?.length >= 5 ? true : false)}
                                                    menuPortalTarget={document.body}
                                                    placeholder="Select or add a skill"
                                                    onChange={handleSkillsChange}
                                                    onInputChange={(data) => setSearchInput(data)}
                                                    value={skill}
                                                    isDisabled={skills?.length >= 5 ? true : false}
                                                    isClearable
                                                />
                                            </div>
                                        )
                                    }
                                    <button type="button" onClick={!isEdit ? () => { setIsEdit(true) } : addSkills} disabled={skills?.length >= 5 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills?.length >= 5 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Skill
                                    </button>
                                </div>
                                {
                                    error && <div className='text-red-600 mt-2'>{error}</div>
                                }
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {
                                        skills && skills?.length > 0 && skills?.map((skill, index) => (
                                            <span onClick={() => deleteSkill(index, skill)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
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
                                    <button onClick={() => imageRef.current.click()} type="button" disabled={skills?.length >= 10 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills?.length >= 10 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                        <Plus size={20} /> Add Media
                                    </button>
                                    <input accept="image/*" className="hidden" type="file" ref={imageRef} onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="max-w-2xl mt-4 bg-gray-50">
                                    <div className="space-y-2">
                                        {media && media.length > 0 && media.map((image, index) => (
                                            <div key={image._id} onClick={() => changeuploadMedia(image, index)} className="hover:cursor-pointer flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
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
