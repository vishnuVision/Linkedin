import { MoveLeft, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import Select from "../components/Ui/Select";
import PropTypes from "prop-types";
import useApi from "../hook/useApi";
import Dropdown from "../components/Ui/Dropdown";

const list = ["--Select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function EducationForm({ setIsOpen, refreshEducation }) {
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
    const [startMonth, setStartMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endYear, setEndYear] = useState("");

    const [school, setSchool] = useState("");
    const [degree, setDegree] = useState("");
    const [fieldOfStudy, setFieldOfStudy] = useState("");
    const [grade, setGrade] = useState("");
    const [activities, setActivities] = useState("");
    const [edudescription, setEduDescription] = useState("");
    const [skills, setSkills] = useState([]);
    const [mediaList, setMediaList] = useState([]);

    useEffect(() => {
        getAllSchools();
    }, [])

    const getAllSchools = async () => {
        const { success, data } = await apiAction({
            url: `/api/v1/getAllPages/school`,
            method: "GET",
        });

        if (success && data) {
            setPageList(data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!school || !degree || !fieldOfStudy || !grade || !activities || !edudescription || !startMonth || !startYear || !endMonth || !endYear) {
            setError("Please fill all the fields");
        }
        else {
            console.log(school, degree, fieldOfStudy, grade, activities, edudescription, startMonth, startYear, endMonth, endYear,skills,mediaList);
            const formData = new FormData();
            formData.append("school", school);
            formData.append("degree", degree);
            formData.append("startMonth", list[startMonth]);
            formData.append("startYear", startYear);
            formData.append("endMonth", list[endMonth]);
            formData.append("endYear", endYear);
            formData.append("fieldOfStudy", fieldOfStudy);
            formData.append("grade", grade);
            formData.append("activities", activities);
            formData.append("description", edudescription);
            skills.map((skill) => formData.append("skills", skill));
            mediaList.map((media) => {
                formData.append("media", media.url)
                formData.append("mediatitle", media.title)
                formData.append("mediaDescription", media.description)
            }
            );

            const { success, data } = await apiAction({
                url: `api/v1/profile/education/createEducation`,
                method: "POST",
                isFormData: true,
                data: formData
            });

            if (success && data) {
                refreshEducation();
            }
        }
        setIsOpen(false);
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700">School</label>
                                <select
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
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

                            <Select value={degree} setValue={setDegree} label={"Degree"} list={["Please select", "BSC", "BCA", "BTech"]} />

                            <Select value={fieldOfStudy} setValue={setFieldOfStudy} label={"Field of study"} list={["Please select", "Computer Science", "Mechanical Engineer", "Doctor"]} />

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
                                    <Dropdown label={"Month"} value={endMonth} onChaneHandler={(e) => setEndMonth(e.target.value)} list={list} />
                                </div>
                                <div className='flex-grow'>
                                    <Dropdown isYear={true} label={"Year"} value={endYear} onChaneHandler={(e) => setEndYear(e.target.value)} list={["--Select", ...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)]} />
                                </div>
                            </div>

                            <Input
                                label="Grade"
                                value={grade}
                                setvalue={setGrade}
                                placeholder={"Ex: 10.00"}
                            />

                            <Textarea
                                label="Activities and societies"
                                value={activities}
                                setvalue={setActivities}
                                required
                                maxLength={2000}
                                rows={4}
                                placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball etc."
                            />

                            <Textarea
                                label="Description"
                                value={edudescription}
                                setvalue={setEduDescription}
                                required
                                maxLength={2000}
                                rows={4}
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

EducationForm.propTypes = {
    setIsOpen: PropTypes.func,
    refreshEducation: PropTypes.func
}

export default EducationForm
