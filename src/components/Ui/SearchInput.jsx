import { useState } from 'react';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

function SearchInput({ onSearch }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className={`w-full pl-10 pr-4 py-2 rounded-md border ${
          isFocused ? 'border-blue-500 shadow-sm' : 'border-gray-300'
        } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

SearchInput.propTypes = {
    onSearch:PropTypes.any
}

export default SearchInput