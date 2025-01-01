import PropTypes from "prop-types"

function FormSelect({ label, list, value, error, disable=false }) {
    return (
        <div>
            <label>{label}</label>
            <select
                disabled={disable}
                {...value}
                className={`border rounded p-2 w-full ${disable ? "cursor-not-allowed bg-gray-300" : ""}`}
            >
                {
                    list && list.length > 0 && list.map((item, index) => (
                        <option key={index} value={item==="Please Select" ?"":item}>{item}</option>
                    ))
                }
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormSelect.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    value: PropTypes.string,
    error: PropTypes.object,
    disable:PropTypes.bool
}

export default FormSelect
