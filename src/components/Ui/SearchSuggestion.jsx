import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

function SearchSuggestion({ icon, primary, type }) {
  return (
    <div className="flex items-center px-2 py-4 hover:bg-gray-100 cursor-pointer gap-2">
      <div className="flex-shrink-0 flex items-center w-8 h-8">
        {icon || <Search className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="text-sm text-gray-900 text-ellipsis truncate">{primary}</div>
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
  icon: PropTypes.any,
  primary: PropTypes.any,
  type: PropTypes.any
}

export default SearchSuggestion