import PropTypes from 'prop-types';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

function JobList({ onSelectJob, selectedJobId, isJobPage=true, jobId, searchResults, isLimit=false }) {

  useEffect(()=>{
    if(!isJobPage){
      const job = searchResults.filter((job) => job.id === jobId);
      onSelectJob(job[0]);
    }
  },[])

  if(isJobPage){
    return <JobListCard jobs={searchResults} isLimit={isLimit}/>
  }
  else
  {
    return <JobLink jobs={searchResults} onSelectJob={onSelectJob} selectedJobId={selectedJobId} isLimit={isLimit}/>
  }
}

const JobLink = ({onSelectJob,selectedJobId,jobs,isLimit}) => {
  return (
    <div className="space-y-4 overflow-scroll h-[calc(100vh-4rem)] someElement">
      {(jobs && jobs.length > 0 && isLimit ? jobs.slice(0, 3) : jobs)?.map((job) => (
        <div
          key={job.id}
          onClick={() => onSelectJob(job)}
          className={`cursor-pointer ${
            selectedJobId === job.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <JobCard company={job.company[0].name} title={job.title} location={job.location} logo={job.company[0].logo} postedDate={moment(job.createdAt).fromNow()} applicants={job.applicantsCount} jobType={job.jobType} />
        </div>
      ))}
    </div>
  );
}

const JobListCard = ({jobs,isLimit}) => {
  return (
    <div className="flex flex-col gap-4">
      {(jobs && jobs.length > 0 && isLimit ? jobs.slice(0, 3) : jobs)?.map((job) => (
        <Link
          to={`/jobs/${job._id}`}
          key={job._id}
        >
          <JobCard company={job.company[0].name} title={job.title} location={job.location} logo={job.company[0].logo} postedDate={moment(job.createdAt).fromNow()} applicants={job.applicantsCount} jobType={job.jobType} />
        </Link>
      ))}
    </div>
  );
}

JobListCard.propTypes = {
  jobs: PropTypes.array,
  isLimit: PropTypes.bool
}

JobLink.propTypes = {
  onSelectJob: PropTypes.func,
  selectedJobId: PropTypes.string,
  jobs: PropTypes.array,
  isLimit: PropTypes.bool
}

JobList.propTypes = {
  onSelectJob: PropTypes.func,
  selectedJobId: PropTypes.string,
  isJobPage:PropTypes.bool,
  jobId:PropTypes.string,
  searchResults: PropTypes.array,
  isLimit: PropTypes.bool
}

export default JobList