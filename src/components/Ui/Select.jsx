import PropTypes from "prop-types"

function Select({ label, list, value, setValue }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            {
                list && list.length > 0 && list.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))
            }
            </select>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default Select
