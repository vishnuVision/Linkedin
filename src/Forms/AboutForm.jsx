import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useApi from "../hook/useApi";
import {toast} from "react-toastify";
import { customStyles } from "../utils/reactStyle";
import CreatableSelect from "react-select/creatable";
import { default as skillsData } from 'skills';

function AboutForm({ onCancel, onSave, setSummary, summary, skills, setSkills, isLoading, summaryError, setSummaryError }) {
    const [skillsList, setSkillsList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [skill, setSkill] = useState({});

    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const { apiAction } = useApi();

    useEffect(() => {
        const data = skillsData.filter(({ tagName }) =>
            tagName.toLowerCase().includes(searchInput.toLowerCase())
        ).slice(0, 100);
        setSkillsList(data.map(({ tagName }) => ({ value: tagName, label: tagName })));
    }, [skillsData, searchInput]);

    const addSkills = () => {
        setError("");
        if (skill?.value) {
            if (skills?.length <= 5) {
                setSkills(prev => [...prev, { _id: Date.now(), name: skill?.value }]);
                setSkill("");
                setIsEdit(false);
            }
            else {
                setError("You can't add more than 5 skills");
            }
        }
        else {
            setError("Please enter a skill");
        }
    }

    const deleteSkill = async (index, skillId) => {
        if (skillId.length === 24) {
            try {
                const { success } = await apiAction({
                    url: `/api/v1/profile/skill/updateSkill/${skillId}`,
                    method: "PUT",
                    data: {},
                });
                if (success) {
                    setSkills(skills.filter((skill, idx) => idx !== index));
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        else {
            setSkills(skills.filter((skill, idx) => idx !== index));
        }
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

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
        if(!e.target.value) {
            setSummaryError("Please enter a summary");
        }
        else {
            setSummaryError("");
        }
    }

    return (

        <form onSubmit={(e) => onSave(e)} className="relative flex flex-col space-y-6">
            <div className="flex-1 overflow-auto max-h-[60vh] p-2">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.
                        </p>

                        <div className="space-y-4">
                            <div className={`rounded border ${summaryError ? "border-red-400" : "border-gray-300"}`}>
                                <div className={`p-3 border-b ${summaryError ? "border-red-400" : "border-gray-300"}`}>
                                    <h3 className="font-medium">Professional Summary</h3>
                                </div>
                                <div className="">
                                    <textarea
                                        placeholder="Write your professional summary..."
                                        value={summary}
                                        onChange={handleSummaryChange}
                                        rows={4}
                                        className="w-full px-4 py-2 shadow-sm rounded-lg focus:ring-0 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            summaryError &&
                            <p className="text-sm text-red-400">{summaryError}</p>
                        }
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Skills</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Show your top skills — add up to 5 skills you want to be known for. They&apos;ll also appear in your Skills section.
                            </p>
                            <div className="space-y-2">
                                {skills?.map((skill, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <button type="button" onClick={() => deleteSkill(index, skill._id)} className="p-1 hover:bg-gray-200 rounded-full mr-2">
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <span>{skill?.name}</span>
                                        </div>
                                        <button className="px-2">
                                            <div className="flex flex-col space-y-1">
                                                <div className="w-4 h-0.5 bg-gray-400"></div>
                                                <div className="w-4 h-0.5 bg-gray-400"></div>
                                                <div className="w-4 h-0.5 bg-gray-400"></div>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="p-1">
                                <div>
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
                                                        value={skill?.value && skill}
                                                        isDisabled={skills?.length >= 5 ? true : false}
                                                        isClearable
                                                    />
                                                </div>
                                            )
                                        }
                                        <button type="button" onClick={!isEdit ? () => { setIsEdit(true) } : addSkills} disabled={skills?.length >= 5 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${skills?.length >= 5 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                            <Plus size={20} /> Add Skill
                                        </button>
                                    </div>
                                    {
                                        error && <div className='text-red-600 mt-2'>{error}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 rounded-md border ${isLoading ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-gray-50 border-gray-300"}`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md ${isLoading ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                >
                    Save
                </button>
            </div>
        </form>
    )
}

AboutForm.propTypes = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    onSave: PropTypes.func,
    summary: PropTypes.string,
    setSummary: PropTypes.func,
    skills: PropTypes.array,
    setSkills: PropTypes.func,
    summaryError: PropTypes.string,
    setSummaryError: PropTypes.func
}

export default AboutForm
