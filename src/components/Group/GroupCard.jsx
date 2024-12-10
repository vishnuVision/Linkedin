import { Ellipsis, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function GroupCard({ to }) {
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="border-b border-gray-200 flex-grow">
            <div className="">
                <div className="flex flex-wrap gap-2 items-center p-4 mb-6">
                    <div className='flex justify-between'>
                        <div>
                            <img className="w-16 h-16 object-contain rounded-sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </div>
                        <div className='block md:hidden'>
                            <Ellipsis />
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <Link to={to} className="truncate max-w-60 text-ellipsis whitespace-nowrap overflow-hidden font-semibold hover:underline hover:text-blue-600">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</Link>
                        <p className='text-sm'>1 member</p>
                    </div>
                    <button onClick={() => setIsShow(prev => !prev)} className='relative hidden md:block '>
                        <div className='hover:bg-[#866f55] hover:bg-opacity-5 p-2 rounded-full'>
                            <Ellipsis />
                        </div>
                        {
                            isShow && (
                                <div className="fixed w-48 lg:absolute right-0 sm:right-10 mt-2 lg:right-0 lg:mt-2 bg-white border border-gray-200 rounded-md shadow-xl">
                                    <div className='flex items-center gap-2 p-2 hover:bg-[#866f55] hover:bg-opacity-5'>
                                        <LogOut />
                                        <p>Leave this group</p>
                                    </div>
                                </div>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

GroupCard.propTypes = {
    to: PropTypes.string
}

export default GroupCard
