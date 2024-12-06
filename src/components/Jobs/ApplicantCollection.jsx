import { HelpCircle } from 'lucide-react';
import PropTypes from 'prop-types';

function ApplicantCollection({ email, onEmailChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Applicant collection</h3>
        <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-48">
            <label className="block text-sm text-gray-600 mb-1">Receive applicants</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>By email</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Email address*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ApplicantCollection.propTypes = {
  email:PropTypes.string,
  onEmailChange:PropTypes.func
}

export default ApplicantCollection