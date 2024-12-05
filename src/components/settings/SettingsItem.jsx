import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SettingsItem = ({ 
  title, 
  description, 
  value,
  to
}) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b"
    >
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className="text-sm text-gray-500">{value}</span>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </Link>
  );
};

SettingsItem.propTypes = {
    title:PropTypes.string,
    description:PropTypes.string,
    value:PropTypes.string,
    to:PropTypes.string
}

export default SettingsItem;