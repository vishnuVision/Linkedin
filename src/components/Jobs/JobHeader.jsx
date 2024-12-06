import { Building2 } from 'lucide-react';
import PropTypes from 'prop-types';

function JobHeader({ jobTitle, company, location }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="p-3 bg-gray-100 rounded-lg">
        <Building2 className="w-8 h-8 text-gray-600" />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{jobTitle}</h1>
        <div className="text-sm text-gray-600">
          <span>{company}</span>
          <span className="mx-2">•</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}

JobHeader.propTypes = {
    jobTitle:PropTypes.string,
    company:PropTypes.string,
    location:PropTypes.string
}

export default JobHeader