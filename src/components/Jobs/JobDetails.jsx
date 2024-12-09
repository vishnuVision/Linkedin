import { Building2, MapPin, Clock, Users, DollarSign, BookmarkPlus, Share2, Send } from 'lucide-react';
import PropTypes from 'prop-types';

function JobDetails({ job }) {
  if (!job) return null;

  return (
    <div className="bg-white border-l border-gray-200 p-6 h-full md:overflow-y-auto md:h-[calc(100vh-4rem)]">
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-4">
          <img src={job.logo} alt={job.company} className="w-16 h-16 rounded" />
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Apply now
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BookmarkPlus className="h-6 w-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Share2 className="h-6 w-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Send className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Building2 className="h-5 w-5" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>{job.postedDate}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="h-5 w-5" />
          <span>{job.applicants}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <DollarSign className="h-5 w-5" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">About the job</h3>
        <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Benefits</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

JobDetails.propTypes = {
  job: PropTypes.object
};

export default JobDetails;