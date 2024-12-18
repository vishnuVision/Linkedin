import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function FilterItem({ tab }) {
    const [isSelected, setIsSelected] = useState();
    const navigate = useNavigate();

    const handleNavigation = () => {
        setIsSelected(prev => !prev);
        navigate(`/search/results/all/${tab}`);
    }

    return (
        <button
            onClick={handleNavigation}
            className={`px-4 py-2 flex gap-1 border border-gray-400 hover:border-gray-600 rounded-full whitespace-nowrap text-sm font-medium ${isSelected ? "text-gray-50 bg-[#01754f] hover:bg-green-900" : "text-gray-600 hover:bg-gray-100"}`}
        >
            {tab}
            {
                isSelected && <ChevronDown />
            }
        </button>
    )
}

FilterItem.propTypes = {
    tab: PropTypes.string
}

export default FilterItem
