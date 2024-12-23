import { Ellipsis, LogOut, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GroupCard({ to, groups, isEventPage = false, isAdmin = false }) {
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="flex-grow">
            <div className="">
                {
                    groups && groups?.length > 0 && groups?.map((group, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-wrap gap-2 items-center p-4 mb-6">
                                <div className='flex justify-between'>
                                    <div>
                                        {
                                            isEventPage &&
                                            <img className="w-16 h-16 object-contain rounded-sm" src={group?.backgroundImage} alt={group?.name} />
                                        }
                                        {
                                            !isEventPage &&
                                            <img className="w-16 h-16 object-contain rounded-full" src={group?.avatar} alt={group?.name} />
                                        }
                                    </div>
                                    <div className='block md:hidden'>
                                        <Ellipsis />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <Link to={to} className="truncate max-w-60 text-ellipsis whitespace-nowrap overflow-hidden font-semibold hover:underline hover:text-blue-600">{group?.name}</Link>
                                    <p className='text-sm truncate max-w-60 text-ellipsis whitespace-nowrap overflow-hidden'>{group?.description}</p>
                                    <p className='text-sm'>{group?.memberCount} member</p>
                                </div>
                                {
                                    isAdmin && (
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
                                    )
                                }
                                {
                                    !isAdmin && (
                                        <button className="flex items-center gap-1 px-4 py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm font-medium">
                                            <Plus className="h-4 w-4" />
                                            {isEventPage ? "Join" : "Follow"}
                                        </button>
                                    )
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

GroupCard.propTypes = {
    to: PropTypes.string,
    groups: PropTypes.array,
    isEventPage: PropTypes.bool,
    isAdmin: PropTypes.bool
}

export default GroupCard
