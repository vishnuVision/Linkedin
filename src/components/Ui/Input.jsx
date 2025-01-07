import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types"
import { useState } from "react";

function Input({ label, type = "text", placeholder, value, setvalue, disable }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label className={`block text-sm font-medium text-gray-700`}>{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    disabled={disable}
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    className={` ${disable ? "cursor-not-allowed" : ""} w-full px-4 py-2 border border-gray-300 shadow-sm rounded-lg focus:border-blue-500 focus:ring-blue-500`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="w-6 h-6 text-gray-600" /> : <Eye className="w-6 h-6 text-gray-600" />}
                    </button>
                )}
            </div>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setvalue: PropTypes.func,
    disable: PropTypes.bool
}

export default Input
