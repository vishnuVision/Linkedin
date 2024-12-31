import PropTypes from "prop-types"

function Dropdown({ label, value, onChaneHandler, list , isYear = false, disable }) {
    return (
        <div className="flex flex-col flex-grow">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select disabled={disable} value={value} onChange={onChaneHandler} className={` ${disable ? "cursor-not-allowed bg-gray-200" : ""} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                {
                    list && list.length > 0 && list.map((item, index) => (
                        <option key={index} value={isYear ? item : index}>{item}</option>
                    ))
                }
            </select>
        </div>
    )
}

Dropdown.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChaneHandler: PropTypes.func,
    list: PropTypes.array,
    isYear: PropTypes.bool,
    disable:PropTypes.bool
}

export default Dropdown
