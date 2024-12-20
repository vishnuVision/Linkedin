import { Ellipsis, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GroupCard({ to, groups }) {
    const [isShow, setIsShow] = useState(false);
    console.log(groups);
    return (
        <div className="border-b border-gray-200 flex-grow">
            <div className="">
                {
                    groups && groups?.length > 0 && groups?.map((group, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-wrap gap-2 items-center p-4 mb-6">
                                <div className='flex justify-between'>
                                    <div>
                                        <img className="w-16 h-16 object-contain rounded-sm" src={group?.avatar} alt={group?.name} />
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
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

GroupCard.propTypes = {
    to: PropTypes.string,
    groups: PropTypes.array
}

export default GroupCard
