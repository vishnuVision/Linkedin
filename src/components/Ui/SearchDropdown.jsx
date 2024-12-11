import { Building2, Users, Briefcase } from 'lucide-react';
import SearchSuggestion from './SearchSuggestion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SearchDropdown({ isVisible,setIsVisible }) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      <SearchSuggestion
        icon={<Building2 className="w-5 h-5 text-gray-400" />}
        primary="Vision Infotech"
        secondary="Company • Technology"
        type="Company"
      />
      <SearchSuggestion
        icon={<Users className="w-5 h-5 text-gray-400" />}
        primary="Vision Infotech Groups"
        type="Group"
      />
      <SearchSuggestion
        icon={<Briefcase className="w-5 h-5 text-gray-400" />}
        primary="Jobs at Vision Infotech"
        secondary="Multiple locations"
        type="Jobs"
      />
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <Link onClick={()=>setIsVisible(false)} to={"/search/results/all/"} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          See all results
        </Link>
      </div>
    </div>
  );
}

SearchDropdown.propTypes = {
    isVisible:PropTypes.bool,
    setIsVisible:PropTypes.func
}

export default SearchDropdown;