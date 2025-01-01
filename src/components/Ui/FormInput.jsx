import PropTypes from "prop-types";

function FormInput({ label, type = "text", placeholder,value, error }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                {...value}
                className="border rounded p-2 w-full"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setvalue: PropTypes.func,
    error: PropTypes.string
}

export default FormInput
