import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import useApi from "../hook/useApi";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../utils/reactStyle";
import toast from "react-hot-toast";

function SkillForm({ refreshSkill, setIsOpen }) {
    const [skill, setSkill] = useState({});
    const [skills, setSkills] = useState([]);
    const { apiAction } = useApi();
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        if(!skill.value)
        {
            setError("Please select or add a skill");
            return;
        }
        let toastId = toast.loading("Adding skill...");
        e.preventDefault();
        const { success, data } = await apiAction({
            url: `api/v1/profile/skill/createSkill`,
            method: "POST",
            data: { name: skill.value, isTop: false },
            toastId
        });

        if (success && data) {
            setIsOpen(false);
            toast.success("Skill added successfully", { id: toastId });
            refreshSkill();
        }
    }

    useEffect(()=>{
        selectAllSkillsForDropDown();
    },[])

    const selectAllSkillsForDropDown = async () => {
        const { success, data } = await apiAction({
            url: `api/v1/profile/skill/getAllSkill`,
            method: "GET",
        });
        if (success && data) {
            const newData = data.map((item) => ({ value: item.name, label: item.name }));
            setSkills(newData);
        }
    }

    const handleSkillsChange = (selectedOption) => {
        if(selectedOption)
        {
           setError(""); 
        }
        else
        {
            setError("Please select or add a skill");
        }
        setSkill(selectedOption);
    };

    return (
        <div className="grid grid-cols-1">
            <CreatableSelect
                options={skills}
                styles={customStyles(error)}
                menuPortalTarget={document.body}
                placeholder="Select or add a skill"
                onChange={handleSkillsChange}
                value={skill}
                isClearable
            />
            {
                error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )
            }
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button type="button" onClick={handleSubmit} className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md'>
                    Save
                </button>
            </div>
        </div>
    )
}

SkillForm.propTypes = {
    refreshSkill: PropTypes.func,
    setIsOpen: PropTypes.func
}

export default SkillForm
