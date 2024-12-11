import { ChevronDown } from 'lucide-react'
import { useState } from 'react';
import AddContent from './AddContent';

function JobFilter() {
    const [isLocation, setIsLocation] = useState(false);
    const [isDropCompany, setIsDropCompany] = useState(false);
    const [company, setCompany] = useState("");
    const [companyList, setCompanyList] = useState([]);
    const [location,setLocation] = useState("");
    const [locationList,setLocationList] = useState([]);
    return (
        <div className="space-y-4">
            <div className="font-medium text-gray-900">Job Type</div>
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">On site</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">Remote</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">Hybrid</span>
                </label>
            </div>

            <div className="border-t pt-4">
                <div className="font-medium text-gray-900">Locations</div>
                <button onClick={()=>setIsLocation(prev=>!prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
                    Add a location
                    <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {
                    isLocation && (
                        <AddContent content={location} setContent={setLocation} contentList={locationList} setContentList={setLocationList} />
                    )
                }
            </div>

            <div className="border-t pt-4">
                <div className="font-medium text-gray-900">Current company</div>
                <button onClick={()=>setIsDropCompany(prev=>!prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
                    Add a company
                    <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {
                    isDropCompany && (
                        <AddContent content={company} setContent={setCompany} contentList={companyList} setContentList={setCompanyList} />
                    )
                }
            </div>
        </div>
    )
}

export default JobFilter
