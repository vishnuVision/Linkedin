import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddContent from './AddContent';
import PropTypes from 'prop-types';

const Filters = ({ setSearchResults, searchResults }) => {
  const [isDrop, setIsDrop] = useState(false);
  const [isDropCompany, setIsDropCompany] = useState(false);
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const [company, setCompany] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [isFirst, setisFirst] = useState(true);
  const [results, setResults] = useState(searchResults || []);

  useEffect(() => {
    if (searchResults.length > 0 && isFirst) {
      setResults(searchResults);
      setisFirst(false);
    }
  }, [searchResults])

  const filterData = () => {

    if (searchResults.length === 0 || (contentList.length === 0 && companyList.length === 0)) {
      setSearchResults(results);
      return;
    }

    let locationsResults = [];
    let companyResults = [];
    let filteredResults = [];

    if (contentList.length > 0) {
      locationsResults = results.map((data) => {
        const isMatched = contentList.some((item) => {
          const isMatch1 = item?.toLowerCase() === data?.region?.toLowerCase();
          const isMatch2 = item?.toLowerCase() === data?.location?.toLowerCase();
          const isMatch3 = data?.region?.toLowerCase().includes(item?.toLowerCase());
          const isMatch4 = data?.location?.toLowerCase().includes(item?.toLowerCase());
          return isMatch1 || isMatch2 || isMatch3 || isMatch4;
        });
        if (isMatched) {
          return data;
        }
      });
    }

    if (companyList.length > 0) {
      companyResults = results.map((data) => {
        const isMatched = companyList.some((item) => {
          const isMatch1 = data.experiences.some((exp) => exp?.company?.name?.toLowerCase().includes(item?.toLowerCase()));
          return isMatch1;
        });
        if (isMatched) {
          return data;
        }
      });
    }

    if (locationsResults.length > 0 && companyResults.length <= 0) {
      filteredResults = locationsResults.map((data) => {
        if (!filteredResults.includes(data)) {
          return data;
        }
      });
    }

    if (companyResults.length > 0 && locationsResults.length <= 0) {
      filteredResults = companyResults.map((data) => {
        if (!filteredResults.includes(data)) {
          return data;
        }
      });
    }

    if (companyResults.length > 0 && locationsResults.length > 0) {
      let newData = [];
      filteredResults = [...locationsResults, ...companyResults];
      filteredResults.map((data) => {
        if (locationsResults.includes(data) && companyResults.includes(data)) {
          if(!newData.includes(data))
          {
            newData.push(data);
          }
        }
      });
      filteredResults = newData;
    }

    if (filteredResults.length > 0) {
      setSearchResults(filteredResults.filter((data) => data !== undefined));
    }
  }

  return (
    <div className="space-y-4">
      <div className="font-medium text-gray-900">Connections</div>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded text-blue-600" />
          <span className="text-sm">1st connections</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded text-blue-600" />
          <span className="text-sm">2nd connections</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded text-blue-600" />
          <span className="text-sm">3rd+ connections</span>
        </label>
      </div>

      <div className="border-t pt-4">
        <div className="font-medium text-gray-900">Locations</div>
        <button onClick={() => setIsDrop(prev => !prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
          Add a location
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        {
          isDrop && (
            <AddContent label="Location" filterData={filterData} content={content} setContent={setContent} contentList={contentList} setContentList={setContentList} />
          )
        }
      </div>

      <div className="border-t pt-4">
        <div className="font-medium text-gray-900">Current company</div>
        <button onClick={() => setIsDropCompany(prev => !prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
          Add a company
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        {
          isDropCompany && (
            <AddContent label="Company" filterData={filterData} content={company} setContent={setCompany} contentList={companyList} setContentList={setCompanyList} />
          )
        }
      </div>
    </div>
  );
};

Filters.propTypes = {
  setSearchResults: PropTypes.func,
  searchResults: PropTypes.array
}

export default Filters;