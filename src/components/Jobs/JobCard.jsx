import { BookmarkPlus, Share2, MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';

function JobCard({
  company,
  title,
  location,
  logo,
  postedDate,
  applicants,
  jobType,
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        <img src={logo} alt={company} className="w-12 h-12 rounded" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-[#0a66c2] hover:underline cursor-pointer">
            {title}
          </h3>
          <p className="text-gray-600">{company}</p>
          <p className="text-gray-500 text-sm">{location}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span

              className="px-2 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
            >
              {jobType}
            </span>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            <span>{postedDate}</span>
            <span className="mx-2">•</span>
            <span>{applicants} applicants</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button>
            <BookmarkPlus className="h-10 w-10 px-2 hover:bg-gray-100 rounded-full text-gray-600" />
          </button>
          <button>
            <Share2 className="h-10 w-10 px-2 hover:bg-gray-100 rounded-full text-gray-600" />
          </button>
          <button>
            <MoreHorizontal className="h-10 w-10 px-2 hover:bg-gray-100 rounded-full text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  company: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  logo: PropTypes.string,
  postedDate: PropTypes.string,
  applicants: PropTypes.number,
  jobType: PropTypes.array
}

export default JobCard
