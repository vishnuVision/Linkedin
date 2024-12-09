import PropTypes from "prop-types"

function Textarea({label,placeholder,value,setvalue}) {
  return (
    <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
  )
}

Textarea.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setvalue: PropTypes.func
}

export default Textarea
