import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Card = ({ icon: Icon, title, description }) => {
    const navigate = useNavigate();
  return (
    <button onClick={()=>navigate("new")} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-gray-700 hover:shadow-md transition-shadow flex flex-col items-center text-center w-full">
      <Icon size={48} className="text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}

Card.propTypes = {
    icon:PropTypes.element,
    title:PropTypes.string,
    description:PropTypes.string
}

export default Card