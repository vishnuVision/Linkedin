import { ChevronDown } from "lucide-react"
import AddContent from "./AddContent"
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CompanyFilter({ searchResults, setSearchResults }) {
    const [isLocation, setIsLocation] = useState(false);
    const [isIndustry, setIsIndustry] = useState(false);
    const [industry, setIndustry] = useState("");
    const [industryList, setIndustryList] = useState([]);
    const [location, setLocation] = useState("");
    const [locationList, setLocationList] = useState([]);
    const [results, setResults] = useState([]);
    const [isFirst, setisFirst] = useState(true);
    const [organizationSize, setOrganizationSize] = useState([]);

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
            setOrganizationSize([...organizationSize, value]);
        } else {
            setOrganizationSize(organizationSize.filter(size => size !== value));
        }
    }

    useEffect(() => {
        filterData();
    }, [organizationSize])

    const filterData = () => {
        if (locationList.length === 0 && industryList.length === 0 && organizationSize.length === 0) {
            setSearchResults(results);
            return;
        }

        let locationsResults = [];
        let industryResults = [];
        let organizationSizeResults = [];
        let filteredResults = [];

        if (organizationSize.length > 0) {
            organizationSizeResults = results.filter((data) => {
                const isMatched = organizationSize.some((item) => {
                    const isMatch1 = item === data?.organizationSize;
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
                    const isMatch = data?.locations.some((location) => {
                        return location?.toLowerCase().includes(item?.toLowerCase());
                    });
                    return isMatch;
                });
                if (isMatched) {
                    return data;
                }
            });
        }

        if (industryList.length > 0) {
            industryResults = results.filter((data) => {
                const isMatched = industryList.some((item) => {
                    const isMatch1 = data.industry.toLowerCase() === item?.toLowerCase();
                    return isMatch1;
                });
                if (isMatched) {
                    return data;
                }
            });
        }

        if (locationsResults.length > 0 && industryResults.length <= 0 && organizationSizeResults.length <= 0) {
            filteredResults = locationsResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if (industryResults.length > 0 && locationsResults.length <= 0 && organizationSizeResults.length <= 0) {
            filteredResults = industryResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if (organizationSizeResults.length > 0 && locationsResults.length <= 0 && industryResults.length <= 0) {
            filteredResults = organizationSizeResults.map((data) => {
                if (!filteredResults.includes(data)) {
                    return data;
                }
            });
        }

        if ((industryList.length > 0 && locationList.length > 0) || (locationList.length > 0 && organizationSize.length > 0) || (industryList.length > 0 && organizationSize.length > 0) || (industryList.length > 0 && locationList.length > 0 && organizationSize.length > 0)) {
            let newData = [];

            if (locationsResults?.length > 0) {
                filteredResults = [...filteredResults, ...locationsResults];
            }
            else if (industryResults?.length > 0) {
                filteredResults = [...filteredResults, ...industryResults];
            }
            else if (organizationSizeResults?.length > 0) {
                filteredResults = [...filteredResults, ...organizationSizeResults];
            }

            filteredResults.map((data) => {
                if (locationList.length > 0 && industryList.length > 0 && organizationSize.length <= 0) {
                    if (locationsResults.includes(data) && industryResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (locationList.length > 0 && organizationSize.length > 0 && industryList.length <= 0) {
                    if (locationsResults.includes(data) && organizationSizeResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (industryList.length > 0 && organizationSize.length > 0 && locationList.length <= 0) {
                    if (industryResults.includes(data) && organizationSizeResults.includes(data)) {
                        if (!newData.includes(data)) {
                            newData.push(data);
                        }
                    }
                }
                else if (locationList.length > 0 && industryList.length > 0 && organizationSize.length > 0) {
                    if (locationsResults.includes(data) && industryResults.includes(data) && organizationSizeResults.includes(data)) {
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
            <div className="font-medium text-gray-900">Company Size</div>
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input value={"0-1 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">1-10 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"2-10 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">11-50 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"51-200 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">51-200 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"201-500 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">201-500 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"501-1000 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">501-1000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"1001-5000 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">1001-5000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"5001-10000 employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">5001-10,000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input value={"10001+ employees"} onChange={hanldeJobType} type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">10,001+ employees</span>
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
                <div className="font-medium text-gray-900">Industry</div>
                <button onClick={() => setIsIndustry(prev => !prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
                    Add a Industry
                    <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {
                    isIndustry && (
                        <AddContent filterData={filterData} content={industry} setContent={setIndustry} contentList={industryList} setContentList={setIndustryList} />
                    )
                }
            </div>
        </div>
    )
}

CompanyFilter.propTypes = {
    searchResults: PropTypes.array,
    setSearchResults: PropTypes.func
}

export default CompanyFilter
