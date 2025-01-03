import PropTypes from "prop-types"

function FormMultiSelect({ label, list, value, error, disable=false }) {

    return (
        <div>
            <label>{label}</label>
            <select
                {...value}
                className={`rounded p-2 w-full focus:outline-none focus:ring-1 ${error ? "border border-red-600 focus:ring-red-600" : "border border-gray-300 focus:ring-gray-800"} ${disable ? "cursor-not-allowed bg-gray-300" : ""}`}
            >
                {
                    list && list.length > 0 && list.map((item, index) => (
                        <option key={index} value={item.name==="Please Select"?"":item._id}>{item.name}</option>
                    ))
                }
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}

FormMultiSelect.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    value: PropTypes.any,
    error: PropTypes.string,
    disable:PropTypes.bool
}

export default FormMultiSelect
