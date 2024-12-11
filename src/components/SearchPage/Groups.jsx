import { MoveLeft } from "lucide-react"
import GroupCard from "../Group/GroupCard"
import { Link } from "react-router-dom"

function Groups() {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div onClick={() => { window.history.back() }} className="p-2 mb-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                <MoveLeft />
            </div>
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Groups</h1>
                            <GroupCard />
                            <GroupCard />
                            <GroupCard />
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

export default Groups
