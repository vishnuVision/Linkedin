import PropTypes from "prop-types";

function FormTextArea({ label, placeholder, value, error }) {
    return (
        <div>
            <label>{label}</label>
            <textarea
                placeholder={placeholder}
                {...value}
                className="border rounded p-2 w-full"
            ></textarea>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormTextArea.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.object
}

export default FormTextArea
