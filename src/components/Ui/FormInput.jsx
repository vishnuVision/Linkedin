import PropTypes from "prop-types";

function FormInput({ label, type = "text", placeholder, value, error, disable = false }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                {...value}
                className={`rounded p-2 w-full focus:outline-none focus:ring-1 ${error ? "border border-1 border-red-600 focus:border-0 focus:ring-red-600" : "border border-gray-300 focus:ring-gray-800"} ${disable ? "cursor-not-allowed bg-gray-300" : ""}`}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    setvalue: PropTypes.func,
    error: PropTypes.string,
    disable:PropTypes.bool
}

export default FormInput
