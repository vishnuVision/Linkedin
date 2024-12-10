import Select from "../components/Ui/Select"

function SkillForm() {
    return (
        <div>
            <Select label={"skill"} list={["please select", "C", "C++", "Java", "Javascript"]} />
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
                    Save
                </button>
            </div>
        </div>
    )
}

export default SkillForm
