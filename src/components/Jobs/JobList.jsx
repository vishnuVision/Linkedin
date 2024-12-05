import PropTypes from 'prop-types';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const jobs = [
  {
    id: '1',
    company: 'Xcellence-IT',
    title: 'MERN Full Stack Developer',
    location: 'Surat, Gujarat, India',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    postedDate: '2 weeks ago',
    applicants: 'Over 100 applicants',
    jobType: ['Full-time', 'On-site'],
    salary: '$50,000 - $80,000 per year',
    description: 'We are looking for a MERN Stack Developer to join our dynamic team. The ideal candidate will be responsible for developing and maintaining web applications using MongoDB, Express.js, React.js, and Node.js.',
    requirements: [
      'Bachelors degree in Computer Science or related field',
      '3+ years of experience with MERN stack development',
      'Strong understanding of React.js and its core principles',
      'Experience with Node.js and Express framework',
      'Proficiency in MongoDB and database design',
      'Excellent problem-solving skills'
    ],
    benefits: [
      'Competitive salary package',
      'Health insurance coverage',
      'Flexible working hours',
      'Professional development opportunities',
      'Modern office environment',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ]
  },
  {
    id: '2',
    company: 'Braincuber Technologies',
    title: 'Node JS Developer',
    location: 'Surat, Gujarat, India',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    postedDate: '1 week ago',
    applicants: '50 applicants',
    jobType: ['Full-time', 'Remote'],
    salary: '$40,000 - $70,000 per year',
    description: 'We are seeking a skilled Node.js Developer to join our engineering team. You will be working on building scalable backend services and APIs.',
    requirements: [
      'Strong proficiency in Node.js and Express.js',
      'Experience with RESTful APIs',
      'Knowledge of SQL and NoSQL databases',
      'Understanding of server-side templating languages',
      'Familiarity with version control systems'
    ],
    benefits: [
      'Remote work opportunity',
      'Flexible schedule',
      'Health and dental insurance',
      'Paid time off',
      'Learning and development budget'
    ]
  },
  {
    id: '3',
    company: 'Declone Labs PVT LTD',
    title: 'Full Stack Engineer',
    location: 'Mumbai, Maharashtra, India',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    postedDate: '3 days ago',
    applicants: '25 applicants',
    jobType: ['Full-time', 'Hybrid'],
    salary: '$60,000 - $90,000 per year',
    description: 'Join our team as a Full Stack Engineer and work on cutting-edge web applications. You will be responsible for developing both client-side and server-side applications.',
    requirements: [
      '5+ years of full stack development experience',
      'Expertise in JavaScript/TypeScript',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Annual bonus'
    ]
  },
  {
    id: '7',
    company: 'Declone Labs PVT LTD',
    title: 'Full Stack Engineer',
    location: 'Mumbai, Maharashtra, India',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    postedDate: '3 days ago',
    applicants: '25 applicants',
    jobType: ['Full-time', 'Hybrid'],
    salary: '$60,000 - $90,000 per year',
    description: 'Join our team as a Full Stack Engineer and work on cutting-edge web applications. You will be responsible for developing both client-side and server-side applications.',
    requirements: [
      '5+ years of full stack development experience',
      'Expertise in JavaScript/TypeScript',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Annual bonus'
    ]
  },
  {
    id: '6',
    company: 'Declone Labs PVT LTD',
    title: 'Full Stack Engineer',
    location: 'Mumbai, Maharashtra, India',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    postedDate: '3 days ago',
    applicants: '25 applicants',
    jobType: ['Full-time', 'Hybrid'],
    salary: '$60,000 - $90,000 per year',
    description: 'Join our team as a Full Stack Engineer and work on cutting-edge web applications. You will be responsible for developing both client-side and server-side applications.',
    requirements: [
      '5+ years of full stack development experience',
      'Expertise in JavaScript/TypeScript',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Annual bonus'
    ]
  },
  {
    id: '4',
    company: 'Declone Labs PVT LTD',
    title: 'Full Stack Engineer',
    location: 'Mumbai, Maharashtra, India',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    postedDate: '3 days ago',
    applicants: '25 applicants',
    jobType: ['Full-time', 'Hybrid'],
    salary: '$60,000 - $90,000 per year',
    description: 'Join our team as a Full Stack Engineer and work on cutting-edge web applications. You will be responsible for developing both client-side and server-side applications.',
    requirements: [
      '5+ years of full stack development experience',
      'Expertise in JavaScript/TypeScript',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Annual bonus'
    ]
  },
  {
    id: '5',
    company: 'Declone Labs PVT LTD',
    title: 'Full Stack Engineer',
    location: 'Mumbai, Maharashtra, India',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    postedDate: '3 days ago',
    applicants: '25 applicants',
    jobType: ['Full-time', 'Hybrid'],
    salary: '$60,000 - $90,000 per year',
    description: 'Join our team as a Full Stack Engineer and work on cutting-edge web applications. You will be responsible for developing both client-side and server-side applications.',
    requirements: [
      '5+ years of full stack development experience',
      'Expertise in JavaScript/TypeScript',
      'Experience with modern frontend frameworks',
      'Strong backend development skills',
      'Knowledge of cloud services (AWS/Azure/GCP)'
    ],
    benefits: [
      'Competitive compensation',
      'Stock options',
      'Health insurance',
      'Gym membership',
      'Annual bonus'
    ]
  }
];

function JobList({ onSelectJob, selectedJobId,isJobPage=true,jobId }) {
  useEffect(()=>{
    if(!isJobPage){
      const job = jobs.filter((job) => job.id === jobId);
      onSelectJob(job[0]);
    }
  },[])
  if(isJobPage){
    return <JobListCard/>
  }
  else
  {
    return <JobLink onSelectJob={onSelectJob} selectedJobId={selectedJobId}/>
  }
}

const JobLink = ({onSelectJob,selectedJobId}) => {
  return (
    <div className="space-y-4 overflow-scroll h-[calc(100vh-4rem)] someElement">
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => onSelectJob(job)}
          className={`cursor-pointer ${
            selectedJobId === job.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <JobCard {...job} />
        </div>
      ))}
    </div>
  );
}

const JobListCard = () => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <Link
          to={`/jobs/${job.id}`}
          key={job.id}
        >
          <JobCard {...job} />
        </Link>
      ))}
    </div>
  );
}

JobLink.propTypes = {
  onSelectJob: PropTypes.func,
  selectedJobId: PropTypes.string,
}

JobList.propTypes = {
  onSelectJob: PropTypes.func,
  selectedJobId: PropTypes.string,
  isJobPage:PropTypes.bool,
  jobId:PropTypes.string
}

export default JobList