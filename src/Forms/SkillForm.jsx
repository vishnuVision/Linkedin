import { useState } from "react"
import Select from "../components/Ui/Select"
import PropTypes from "prop-types";
import useApi from "../hook/useApi";

function SkillForm({refreshSkill,setIsOpen}) {
    const [skill, setSkill] = useState("");
    const { apiAction } = useApi();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, data } = await apiAction({
            url: `api/v1/profile/skill/createSkill`,
            method: "POST",
            data: { name:skill, isTop:false }
        });

        if (success && data) {
            refreshSkill();
        }
        setIsOpen(false);
    }

    return (
        <div>
            <Select value={skill} setValue={setSkill} label={"skill"} list={["please select", "C", "C++", "Java", "Javascript"]} />
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button onClick={handleSubmit} className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
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
