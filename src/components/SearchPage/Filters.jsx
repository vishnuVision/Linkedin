import { ChevronDown } from 'lucide-react';

const Filters = () => {
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
        <button className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
          Add a location
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="font-medium text-gray-900">Current company</div>
        <button className="mt-2 text-sm text-blue-600 hover:underline flex items-center">
          Add a company
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Filters;