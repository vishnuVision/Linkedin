import ProfileCard from '../Dashboard/ProfileCard'
import { MoveLeft } from 'lucide-react'
import Feed from '../Dashboard/Feed'
import { useParams } from 'react-router-dom'

function SinglePost() {
    const {id} = useParams();

    // console.log(id);
    return (
        <main className="pt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                    <ProfileCard />
                </div>
                <div className="col-span-12 md:col-span-9 md:max-h-[90vh] md:overflow-scroll someElement">
                    <div className="bg-white rounded-lg shadow pt-6">
                        <div className='flex items-center gap-2 px-6 mb-4'>
                            <div onClick={() => window.history.back()} className='w-10 h-10 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full flex justify-center items-center cursor-pointer'>
                                <MoveLeft />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Post Details</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 px-4 pb-4">
                            <Feed posts={[]} />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default SinglePost
