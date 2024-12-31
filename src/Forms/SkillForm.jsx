import { useState } from "react"
import Select from "../components/Ui/Select"
import PropTypes from "prop-types";

function SkillForm({refreshSkill}) {
    const [skill, setSkill] = useState("")

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const res = await fetch("http://localhost:5000/skill", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({skill}),
    //     });
    //     const data = await res.json();
    //     refreshSkill();
    // }
    
    return (
        <div>
            <Select value={skill} setValue={setSkill} label={"skill"} list={["please select", "C", "C++", "Java", "Javascript"]} />
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
                    Save
                </button>
            </div>
        </div>
    )
}

SkillForm.propTypes = {
    refreshSkill: PropTypes.func
}

export default SkillForm
