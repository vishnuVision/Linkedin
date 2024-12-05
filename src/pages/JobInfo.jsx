import { useState } from 'react';
import JobList from '../components/Jobs/JobList'
import JobDetails from '../components/Jobs/JobDetails'
import { useParams } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

function JobInfo() {
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="min-h-screen flex justify-center">
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className='flex gap-2 items-center'>
            <div onClick={handleBack} className='w-10 h-10 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full flex justify-center items-center cursor-pointer'>
              <MoveLeft />
            </div>
            <h1 className="text-lg md:text-2xl font-semibold">Jobs recommended for you</h1>
          </div>
        </div>
        <div className="mt-6 flex lg:flex-row gap-6">
          <div className="hidden lg:flex">
            <JobList
              onSelectJob={setSelectedJob}
              selectedJobId={selectedJob?.id || null}
              isJobPage={false}
              jobId={id}
            />
          </div>
          <div className="w-[100%] lg:w-[480px] sticky top-16">
            {selectedJob && <JobDetails job={selectedJob} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default JobInfo
