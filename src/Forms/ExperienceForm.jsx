import { MoveLeft, Plus, X } from "lucide-react"
import Input from "../components/Ui/Input"
import Select from "../components/Ui/Select"
import Textarea from "../components/Ui/Textarea"
import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import useApi from "../hook/useApi"
import Dropdown from "../components/Ui/Dropdown"

const list = ["--Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ExperienceForm({ setIsOpen, refreshExperience }) {
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
    const [title, setTitle] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState([]);
    const [isPresent, setIsPresent] = useState(false);
    const [locationType, setLocationType] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endYear, setEndYear] = useState("");
    const [error, setError] = useState("");
    const [expDescription, setExpDescription] = useState("");

    useEffect(() => {
        getAllCompanies();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !employmentType || !company || !locationType || !startMonth || !startYear || !expDescription || (!isPresent && (!endMonth || !endYear))) {
            setError("Please fill all the fields");
        }
        else {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("company", company);
            formData.append("startMonth", list[startMonth]);
            formData.append("startYear", startYear);
            formData.append("endMonth", list[endMonth]);
            formData.append("endYear", endYear);
            formData.append("isPresent", isPresent);
            formData.append("locationType", locationType);
            formData.append("description", expDescription);
            formData.append("employmentType", employmentType);
            formData.append("location", location);
            skills.map((skill) => formData.append("skills", skill));
            mediaList.map((media) => {
                formData.append("media", media.url)
                formData.append("mediatitle",media.title)
                formData.append("mediaDescription",media.description)
            }
            );

            const { success, data } = await apiAction({
                url: `api/v1/profile/experience/createExperience`,
                method: "POST",
                isFormData: true,
                data: formData
            });

            if (success && data) {

                refreshExperience();
            }
        }
        setIsOpen(false);
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
        setMedia(prev => [...prev, { title: imagetitle, description: description, preview: imagePreview }]);
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
                !image && !imagePreview && <form onSubmit={handleSubmit}>
                    <div className='max-h-[60vh] overflow-y-scroll'>
                        <div className='flex flex-col gap-4 px-2'>

                            <Input
                                label="Title"
                                placeholder={"Ex: Retail Sales Manager"}
                                value={title}
                                setvalue={setTitle}
                            />

                            <Select value={employmentType} setValue={setEmploymentType} label={"Employment type"} list={["Please select", "Full-time", "Part-time", "Self-employed", "Freelance", "Internship", "Trainee"]} />

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company name</label>
                                <select
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className={`w-full px-4 py-2 border border-gray-300 shadow-sm rounded-lg focus:border-blue-500 focus:ring-blue-500`}
                                >
                                    <option
                                        value=""
                                    >
                                        Please select
                                    </option>
                                    {pageList && pageList.length > 0 && pageList.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Input
                                label="Location"
                                placeholder={"Ex: London, United Kingdom"}
                                value={location}
                                setvalue={setLocation}
                            />

                            <Select label={"Location type"} value={locationType} setValue={setLocationType} list={["Please select", "On-site", "Hybrid", "Remote"]} />

                            <div className="flex gap-2">
                                <input onChange={() => setIsPresent(prev => !prev)} className="w-6 h-6" name="im" type="checkbox" />
                                <label htmlFor="im">I am currently working in this role</label>
                            </div>

                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <Dropdown label={"Month"} value={startMonth} onChaneHandler={(e) => setStartMonth(e.target.value)} list={list} />
                                </div>
                                <div className='flex-grow'>
                                    <Dropdown isYear={true} label={"Year"} value={startYear} onChaneHandler={(e) => setStartYear(e.target.value)} list={["--Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} />
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <Dropdown disable={isPresent} label={"Month"} value={endMonth} onChaneHandler={(e) => setEndMonth(e.target.value)} list={list} />
                                </div>
                                <div className='flex-grow'>
                                    <Dropdown isYear={true} disable={isPresent} label={"Year"} value={endYear} onChaneHandler={(e) => setEndYear(e.target.value)} list={["--Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} />
                                </div>
                            </div>

                            <Textarea
                                label="Description"
                                name="description"
                                required
                                value={expDescription}
                                setvalue={setExpDescription}
                                maxLength={2000}
                                rows={4}
                                placeholder="Ex: topics, schedule, etc."
                            />

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
                                                <img className="w-6 h-6 object-contain" src={image?.preview} alt={image?.title} /> {image?.title} <X size={20} />
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
    refreshExperience: PropTypes.func
}

export default ExperienceForm
