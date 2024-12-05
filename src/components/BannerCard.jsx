import { Camera, Ellipsis, LogOut, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'

function BannerCard() {
    const [showOptions,setShowOptions] = useState(false)
    return (
        <div className="bg-white rounded-lg shadow mb-4">
            <div className="relative">
                <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
                    <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full hover:bg-gray-100">
                        <Camera className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="absolute -bottom-16 left-4">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                            alt="Profile"
                            className="w-32 h-32 rounded-lg border-4 border-white"
                        />
                        <button className="absolute bottom-0 -right-1 bg-white p-2 rounded-full hover:bg-gray-100 border border-gray-200">
                            <Camera className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
                <div className='absolute px-4 py-2 right-0'>
                    <button onClick={()=>setShowOptions(prev=>!prev)} className='relative'>
                    <Ellipsis className='hover:bg-gray-100 w-8 h-8 px-1 rounded-full'/>
                    <div>
                        {
                            showOptions && 
                            <div className='absolute top-10 border right-0 w-48 bg-white rounded-l-lg rounded-b-lg shadow-md'>
                                <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                    <Settings />
                                    Edit Details
                                </p>
                                <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                    <LogOut />
                                    Leave this group
                                </p>
                                <p className='flex justify-start items-center gap-2 hover:bg-gray-100 px-4 py-2'>
                                    <Trash2 />
                                    Delete this group
                                </p>
                            </div>
                        }
                    </div>
                    </button>
                </div>
            </div>

            <div className="pt-20 px-4 pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                        <p className="text-lg text-gray-600">Senior Software Engineer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerCard
