import { MoveLeft, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import Select from "../components/Ui/Select";

function EducationForm() {
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imagetitle, setImageTitle] = useState("");
    const [description, setDesctiption] = useState("");
    const [media, setMedia] = useState([]);
    const [mediaList, setMediaList] = useState([]);
    const imageRef = useRef(null);

    const handleSubmit = async () => {

    }

    const addSkills = () => {
        if (skills.length <= 5) {
            setSkills(prev => [...prev, skill]);
            setSkill("");
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
            setMediaList(prev => [...prev, image]);
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
                                label="School"
                                placeholder={"Ex: Boston University"}
                            />

                            <Select label={"Degree"} list={["Please select", "BSC", "BCA", "BTech"]} />

                            <Select label={"Field of study"} list={["Please select", "Computer Science", "Mechanical Engineer", "Doctor"]} />

                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <Input type='date' label={"Start date"} />
                                </div>
                                <div className='flex-grow'>
                                    <Input type='time' label={"Start time"} />
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <div className='flex-grow'>
                                    <Input type='date' label={"End date"} />
                                </div>
                                <div className='flex-grow'>
                                    <Input type='time' label={"End time"} />
                                </div>
                            </div>

                            <Input
                                label="Grade"
                                placeholder={"Ex: Boston University"}
                            />

                            <Textarea
                                label="Activities and societies"
                                required
                                maxLength={2000}
                                rows={4}
                                placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball etc."
                            />

                            <Textarea
                                label="Description"
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

export default EducationForm
