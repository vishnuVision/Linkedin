import { useState } from 'react';
import { Sparkle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function JobPostPage() {
    const [jobTitle, setJobTitle] = useState('');
    const navigate = useNavigate();
    return (
        <div className="max-w-xl w-full mx-auto mt-8 px-4 pt-20">
            <div className="text-center mb-12">
                <div className="flex justify-center items-center mb-4">
                    <Sparkle className='fill-[#084d93]' stroke='none' size={48} />
                </div>
                <h1 className="text-5xl font-semibold text-gray-900 mb-2">
                    Find your next<br />great hire
                </h1>
                <p className="text-gray-600">
                    80% of jobs get a qualified applicant in one day
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job title
                        <span className="ml-1 inline-block" title="Required field">ⓘ</span>
                    </label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Software Engineer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button className="w-full bg-[#0a66c2] text-white font-semibold py-3 rounded-full text-xl hover:bg-[#084d93] transition-colors flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Write with AI
                </button>

                <button onClick={()=>navigate("form")} className="w-full bg-white text-[#0a66c2] py-3 rounded-full text-xl font-medium border border-[#0a66c2] hover:bg-blue-50 transition-colors">
                    Write on my own
                </button>

                <div className="text-sm text-gray-600 text-center mt-4">
                    <p className="mb-2">
                        If you write with AI, we&apos;ll use the job title and details from your company
                        page to suggest a job post. <a href="#" className="text-[#0a66c2] hover:underline">Learn more</a>
                    </p>
                    <p>
                        Limits may apply to free job posts. <a href="#" className="text-[#0a66c2] hover:underline">View our policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default JobPostPage
