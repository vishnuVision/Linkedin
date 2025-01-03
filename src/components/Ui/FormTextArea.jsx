import PropTypes from "prop-types";

function FormTextArea({ label, placeholder, value, error, disable = false }) {
    return (
        <div>
            <label>{label}</label>
            <textarea
                placeholder={placeholder}
                {...value}
                className={`rounded p-2 w-full focus:outline-none focus:ring-1 ${error ? "border border-red-600 focus:ring-red-600" : "border border-gray-300 focus:ring-gray-800"} ${disable ? "cursor-not-allowed bg-gray-300" : ""}`}
            ></textarea>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormTextArea.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.object,
    disable:PropTypes.bool
}

export default FormTextArea
