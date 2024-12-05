import PropTypes from "prop-types"

function Dropdown({ label }) {
    return (
        <div className="flex flex-col flex-grow">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select name="" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="">
                <option value="">-</option>
                <option value="">2024</option>
                <option value="">2025</option>
            </select>
        </div>
    )
}

Dropdown.propTypes = {
    label: PropTypes.string
}

export default Dropdown
