import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchResult = ({ name, title, location, imageUrl, connections, isCompany, id }) => {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50">
      {
        !imageUrl && (
          <Link to={isCompany ? `/company/${id}` : `/profile/${id}`}>
            <img
              src={`https://ui-avatars.com/api/?name=${name}`}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </Link>
        )
      }
      {
        imageUrl && (
          <Link to={isCompany ? `/company/${id}` : `/profile/${id}`}>
            <img
              src={imageUrl}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </Link>
        )
      }
      <Link to={isCompany ? `/company/${id}` : `/profile/${id}`} className="flex-1">
        <h3 className="font-medium text-blue-600 hover:underline cursor-pointer">{name}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500 mt-1">{connections}{isCompany ? "" : " followers"} </p>
      </Link>
      <button className="flex items-center gap-1 px-4 py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm font-medium">
        <Plus className="h-4 w-4" />
        {isCompany ? "Follow" : "Connect"}
      </button>
    </div>
  );
};

SearchResult.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  imageUrl: PropTypes.string,
  connections: PropTypes.any,
  isCompany: PropTypes.bool,
  id: PropTypes.string
}

export default SearchResult;