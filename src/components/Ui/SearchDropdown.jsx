import { Building2, Users, Briefcase, Newspaper } from 'lucide-react';
import SearchSuggestion from './SearchSuggestion';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { filterContext } from '../../contextApi/filterContext';

function SearchDropdown({ isVisible, setIsVisible, searchResults }) {
  const navigate = useNavigate();
  const { setPost } = useContext(filterContext);
  if (!isVisible) return null;

  console.log(searchResults);

  const handleClick = (type,result) => {
    if(type === "person")
    {
      navigate(`/profile/${result?._id}`)
    }

    if(type === "group")
    {
      navigate(`/group/${result?._id}`)
    }

    if(type === "job")
    {
      navigate(`/job/${result?._id}`)
    }

    if(type === "company")
    {
      navigate(`/company/${result?._id}`)
    }

    if(type === "event")
    {
      navigate(`/event/${result?._id}`)
    }

    if(type === "newsletter")
    {
      navigate(`/newsletter/${result?._id}`)
    }

    if(type === "post" || type === "article")
    {
      setPost(result);
      navigate(`/single-post/${result?._id}`)
    }
  }
  

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      {
        searchResults && searchResults.length > 0 && searchResults.map((result, index) => (
          <SearchSuggestion
            key={index}
            icon={result.type === "person" || result.type === "group" || result.type === "newsletter" ? result.avatar ? <ImageIcon url={result.avatar} /> : <Users className="w-6 h-6 text-gray-400" /> : result.type === "job" ? <Briefcase className="w-6 h-6 text-gray-400" /> : result.type === "company" ? result.logo ? <ImageIcon url={result.logo} /> : <Building2 className="w-6 h-6 text-gray-400" /> : result.type === "event" ? result.backgroundImage ? <ImageIcon url={result.backgroundImage} /> : <Building2 className="w-6 h-6 text-gray-400" /> : <Newspaper className="w-6 h-6 text-gray-400" />}
            primary={result.type === "person" ? result.firstName + " " + result.lastName : result.type === "article"  || result.type === "newsLetter" || result.type === "job" ? result.title : result.type === "post" ? result.text : result.name}
            handleClick={()=>handleClick(result?.type,result)}
            type={result.type}
          />
        ))
      }
      <div className="flex">
        <Link onClick={() => setIsVisible(false)} to={"/search/results/all/"} className="px-4 py-2 flex-grow w-full bg-gray-50 border-t border-gray-200 text-sm text-blue-600 hover:text-blue-800 font-medium">
          See all results
        </Link>
      </div>
    </div>
  );
}

const ImageIcon = ({url}) => {
  return (
    <div className="w-full h-8 rounded-full overflow-hidden">
      <img src={url} alt="User Avatar" className="w-full h-full object-cover"/>
    </div>
  )
}

ImageIcon.propTypes = {
  url: PropTypes.string
}

SearchDropdown.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  searchResults: PropTypes.array
}

export default SearchDropdown;