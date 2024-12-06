import { Plus } from 'lucide-react';
import { useState } from 'react';
import JobHeader from '../components/Jobs/JobHeader';
import ApplicantCollection from '../components/Jobs/ApplicantCollection';
import ScreeningQuestion from '../components/Jobs/ScreeningQuestion';
import Modal from '../Modal/Modal';

function JobConfirmation() {
    const [email, setEmail] = useState('mandlesaravishnu06092004@gmail.com');
    const [isOpen,setIsOpen] = useState(false);

    return (
        <div className="max-h-screen overflow-scroll py-8 px-4 pt-20">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2 of 2: Confirm job settings</h2>
                    <p className="text-sm text-gray-600">* Indicates required</p>
                </div>

                <div className="space-y-6">
                    <JobHeader
                        jobTitle="Software Engineer"
                        company="Vision Infotech"
                        location="Surat, Gujarat, India (On-site)"
                    />

                    <ApplicantCollection
                        email={email}
                        onEmailChange={setEmail}
                    />

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Screening questions</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            We recommend adding 3 or more questions. Applicants must answer each question.
                        </p>

                        <div className="space-y-4">
                            <ScreeningQuestion
                                question="Have you completed the following level of education: [Degree]?"
                                recommended
                                degree="Bachelor's Degree"
                                idealAnswer="Yes"
                                mustHave
                            />

                            <ScreeningQuestion
                                question="How many years of work experience do you have with [Skill]?"
                                recommended
                                skill="Data Analysis"
                                minimumYears="1"
                                mustHave
                            />

                            <ScreeningQuestion
                                question="How many years of [Job Function] experience do you currently have?"
                                recommended
                                skill="Engineering"
                                minimumYears="1"
                                mustHave
                            />
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-3">Add screening questions:</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Background Check', 'Driver\'s License', 'Drug Test', 'Education',
                                    'Expertise with Skill', 'Hybrid Work', 'Industry Experience', 'Language',
                                    'Location', 'Onsite Work', 'Remote Work', 'Urgent Hiring Need',
                                    'Visa Status', 'Work Authorization', 'Work Experience', 'Custom Question'
                                ].map((question) => (
                                    <button
                                        key={question}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border rounded-full hover:bg-gray-50"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white flex justify-end gap-4 p-6 rounded-lg shadow-sm">
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            Back
                        </button>
                        <button onClick={()=>setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}  title={"Confirm your company email address"}>
                <div className="space-y-4">
                    <div className='flex items-center gap-2'>
                        <img className='w-14 h-14 object-cover rounded-full' src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800" alt="job-confirmation" />
                        <img className='w-14 h-14 object-cover rounded-full' src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800" alt="job-confirmation" />
                    </div>
                    <p className='text-md text-gray-500'>
                        To confirm you work with Vision Infotech we&apos;ll need to send a verification code to your company email address. Enter your company email address to continue.
                    </p>
                    <p className="text-sm text-gray-600">
                        We will send an email to <span className="font-medium">{email}</span> to confirm your company email address.
                    </p>
                </div>
            </Modal>
        </div>
    );
}

export default JobConfirmation;