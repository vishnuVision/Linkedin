import PropTypes from "prop-types"

function FormMultiSelect({ label, list, value, error }) {

    return (
        <div>
            <label>{label}</label>
            <select
                {...value}
                className="border rounded p-2 w-full"
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
    error: PropTypes.object,
}

export default FormMultiSelect
