import JobList from '../Jobs/JobList'
import { MoveLeft } from 'lucide-react'
import JobFilter from './JobFilter'

function Jobs() {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div onClick={() => { window.history.back() }} className="p-2 mb-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                <MoveLeft />
            </div>
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="w-full col-span-12 lg:col-span-3 md:col-span-4">
                    <div className="col-span-12 lg:col-span-4 md:col-span-5">
                        <div className="w-full flex-shrink-0">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <JobFilter/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h1 className='pb-4 font-semibold text-xl'>Jobs</h1>
                            <JobList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
