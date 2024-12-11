import { ChevronDown } from "lucide-react"
import AddContent from "./AddContent"
import { useState } from "react";

function CompanyFilter() {
    const [isLocation, setIsLocation] = useState(false);
    const [isIndustry, setIsIndustry] = useState(false);
    const [industry, setIndustry] = useState("");
    const [industryList, setIndustryList] = useState([]);
    const [location, setLocation] = useState("");
    const [locationList, setLocationList] = useState([]);
    return (
        <div className="space-y-4">
            <div className="font-medium text-gray-900">Company Size</div>
            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">1-10 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">11-50 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">51-200 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">201-500 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">501-1000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">1001-5000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">5001-10,000 employees</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-sm">10,001+ employees</span>
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
                <div className="font-medium text-gray-900">Industry</div>
                <button onClick={()=>setIsIndustry(prev=>!prev)} className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
                    Add a Industry
                    <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {
                    isIndustry && (
                        <AddContent content={industry} setContent={setIndustry} contentList={industryList} setContentList={setIndustryList} />
                    )
                }
            </div>
        </div>
    )
}

export default CompanyFilter
