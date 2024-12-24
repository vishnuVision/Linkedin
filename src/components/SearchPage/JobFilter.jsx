import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react';
import AddContent from './AddContent';
import PropTypes from 'prop-types';

function JobFilter({ searchResults, setSearchResults }) {
    const [isFirst, setisFirst] = useState(true);
    const [isLocation, setIsLocation] = useState(false);
    const [isDropCompany, setIsDropCompany] = useState(false);
    const [company, setCompany] = useState("");
    const [companyList, setCompanyList] = useState([]);
    const [location, setLocation] = useState("");
    const [locationList, setLocationList] = useState([]);
    const [results, setResults] = useState([]);
    const [jobType, setJobType] = useState([]);

    useEffect(() => {
        if (searchResults.length > 0 && isFirst) {
            setResults(searchResults);
            setisFirst(false);
        }
    }, [searchResults])

    const hanldeJobType = (e) => {
        const { value } = e.target;
        const checked = e.target.checked;
        if (checked) {
            setJobType([...jobType, value]);
        } else {
            setJobType(jobType.filter(job => job !== value));
        }
    }

    useEffect(() => {
        filterData();
    }, [jobType])

    const filterData = () => {
        if (locationList.length === 0 && companyList.length === 0 && jobType.length === 0) {
            setSearchResults(results);
            return;
        }

        let locationsResults = [];
        let companyResults = [];
        let jobtypeResults = [];
        let filteredResults = [];

        if (jobType.length > 0) {
            jobtypeResults = results.filter((data) => {
                const isMatched = jobType.some((item) => {
                    const isMatch1 = item?.toLowerCase() === data?.workplaceType?.toLowerCase();
                    return isMatch1;
                });
                if (isMatched) {
                    return data;
                }
            });
        }

        if (locationList.length > 0) {
            locationsResults = results.filter((data) => {
                const isMatched = locationList.some((item) => {
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
            companyResults = results.filter((data) => {
                const isMatched = companyList.some((item) => {
                    const isMatch1 = data.company[0].name.toLowerCase().includes(item.toLowerCase());
                    return isMatch1;
                });
                if (isMatched) {
                    return data;
                }
            });
        }

        if (locationsResults.length > 0 && companyResults.length <= 0 && jobtypeResults.length <= 0) {
            filteredResults = locationsResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if (companyResults.length > 0 && locationsResults.length <= 0 && jobtypeResults.length <= 0) {
            filteredResults = companyResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if (jobtypeResults.length > 0 && locationsResults.length <= 0 && companyResults.length <= 0) {
            filteredResults = jobtypeResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if ((companyList.length > 0 && locationList.length > 0) || (locationList.length > 0 && jobType.length > 0) || (companyList.length > 0 && jobType.length > 0) || (companyList.length > 0 && locationList.length > 0 && jobType.length > 0)) {
            let newData = [];

            if (locationsResults?.length > 0) {
                filteredResults = [...filteredResults, ...locationsResults];
            }
            else if (companyResults?.length > 0) {
                filteredResults = [...filteredResults, ...companyResults];
            }
            else if (jobtypeResults?.length > 0) {
                filteredResults = [...filteredResults, ...jobtypeResults];
            }

            filteredResults.map((data) => {
                if (locationList.length > 0 && companyList.length > 0 && jobType.length <= 0) {
                    if (locationsResults.includes(data) && companyResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (locationList.length > 0 && jobType.length > 0 && companyList.length <= 0) {
                    if (locationsResults.includes(data) && jobtypeResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (companyList.length > 0 && jobType.length > 0 && locationList.length <= 0) {
                    if (companyResults.includes(data) && jobtypeResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (locationList.length > 0 && companyList.length > 0 && jobType.length > 0) {
                    if (locationsResults.includes(data) && companyResults.includes(data) && jobtypeResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
            });
            filteredResults = newData
        }
        setSearchResults(filteredResults);
    }

    return (
        <div className="space-y-4">
            <div className="font-medium text-gray-900">Job Type</div>
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input value={"On-site"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">On site</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"Remote"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">Remote</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"Hybrid"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">Hybrid</span>
                </label>
            </div>

            <div className="border-t pt-4">
                <div className="font-medium text-gray-900">Locations</div>
                <button onClick={() => setIsLocation(prev => !prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
                    Add a location
                    <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {
                    isLocation && (
                        <AddContent filterData={filterData} content={location} setContent={setLocation} contentList={locationList} setContentList={setLocationList} />
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
                        <AddContent filterData={filterData} content={company} setContent={setCompany} contentList={companyList} setContentList={setCompanyList} />
                    )
                }
            </div>
        </div>
    )
}

JobFilter.propTypes = {
    searchResults: PropTypes.array,
    setSearchResults: PropTypes.func,
}

export default JobFilter
