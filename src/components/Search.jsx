import { FaSearch } from 'react-icons/fa';

function Search() {
    return (
        <div>
            <FaSearch className="text-linkedin-darkGray mr-2" />
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none"
            />
        </div>
    )
}

export default Search
