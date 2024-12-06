import PropTypes from "prop-types"

function Input({label,type="text",placeholder,value,setvalue}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 shadow-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setvalue: PropTypes.func
}

export default Input
