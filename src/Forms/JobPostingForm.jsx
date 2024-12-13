import { useState } from 'react';
import { Building2, MapPin, Lightbulb, X, Plus } from 'lucide-react';
import Input from '../components/Ui/Input';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
];

function JobPostingForm() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        workplace: 'On-site',
        location: '',
        jobType: 'Full-time',
        description: '',
    });

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addSkills = () => {
        if (skills.length <= 10) {
            setSkills(prev => [...prev, skill]);
            setSkill("");
        }
    }

    const deleteSkill = (index) => {
        setSkills(skills.filter((skill, idx) => idx !== index));
    }

    const handleJobPost = () => {
        console.log(jobDescription);
        navigate("assesments");
    }

    return (
        <div className="max-h-screen overflow-scroll py-8 px-4 pt-20">
            <div className="max-w-5xl mx-auto">
                <div className='flex flex-col justify-center md:grid md:grid-cols-12 gap-4'>
                    <div className='w-full col-span-12 lg:col-span-8 md:col-span-8'>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6">
                                <h1 className="text-xl font-semibold text-gray-900 mb-6">
                                    1 of 2: Review job description
                                </h1>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Job title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Ex: Senior Software Engineer"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center">
                                                    <Building2 className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Location <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Ex: New York, NY"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Workplace type
                                            </label>
                                            <select
                                                name="workplace"
                                                value={formData.workplace}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="On-site">On-site</option>
                                                <option value="Hybrid">Hybrid</option>
                                                <option value="Remote">Remote</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Job type
                                            </label>
                                            <select
                                                name="jobType"
                                                value={formData.jobType}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Temporary">Temporary</option>
                                            </select>
                                        </div>
                                    </div>

                                    <ReactQuill
                                        value={jobDescription}
                                        onChange={setJobDescription}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Write Details aboput the job..."
                                    />

                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">
                                            Skills
                                        </label>
                                        <p className='text-sm mb-1 text-gray-600'>Add skill keywords (max 10) to make your job more visible to the right candidates.</p>
                                        <div className='flex gap-2 items-center mt-2'>
                                            <div className='w-52'>
                                                <Input disable={skills.length >= 10 ? true : false} placeholder={"Enter Skill"} value={skill} setvalue={setSkill} />
                                            </div>
                                            <button onClick={addSkills} disabled={skills.length >= 10 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills.length >= 10 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
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

                                    <div className="flex justify-end space-x-3">
                                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                            Back
                                        </button>
                                        <button onClick={handleJobPost} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-fit p-4 w-full bg-white col-span-12 lg:col-span-4 md:col-span-4 rounded-lg shadow-sm border border-gray-200'>
                        <Lightbulb className='text-green-700' />
                        <div className='mt-5'>
                            <h1 className='text-md font-semibold text-slate-500'>Target your job to the right people</h1>
                            <p className='text-sm mt-1 text-slate-500'>Include a job description and add required skills to target job seekers who match your criteria.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobPostingForm