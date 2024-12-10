import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

function SearchSuggestion({ icon, primary, secondary, type }) {
  return (
    <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
      <div className="flex-shrink-0 w-6 h-6 mr-3">
        {icon || <Search className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="flex-grow">
        <div className="text-sm text-gray-900">{primary}</div>
        {secondary && <div className="text-xs text-gray-500">{secondary}</div>}
      </div>
      {type && (
        <div className="ml-2 text-xs text-gray-500 whitespace-nowrap">
          {type}
        </div>
      )}
    </div>
  );
}

SearchSuggestion.propTypes = {
    icon:PropTypes.any,
    primary:PropTypes.any,
    secondary:PropTypes.any,
    type:PropTypes.any
}

export default SearchSuggestion