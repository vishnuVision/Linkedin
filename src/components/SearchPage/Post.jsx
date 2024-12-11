import { MoveLeft } from 'lucide-react'
import Feed from '../Dashboard/Feed'
import { Link } from 'react-router-dom'

function Post() {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div onClick={() => { window.history.back() }} className="p-2 mb-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                <MoveLeft />
            </div>
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="col-span-12 pb-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h1 className='pb-2 font-semibold text-xl'>Posts</h1>
                            <Feed/>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3 hidden md:block'>
                    <Link to="/jobs">
                        <img src="/feed_ads.png" alt="Ad" className="w-full rounded-lg" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Post
