import { Link } from 'react-router-dom'
import GroupCard from '../Group/GroupCard'
import { MoveLeft } from 'lucide-react'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react';
import { filterContext } from '../../contextApi/filterContext';

function Events({ handleBack }) {

    const allData = useContext(filterContext)?.allData;
    const [searchResults,setSearchResults] = useState([]);

    useEffect(() => {
        setSearchResults(allData?.events || []);
    }, [allData])

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow mb-4">
                            <div className="flex gap-3 items-center p-2">
                                <div onClick={handleBack} className="p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                                    <MoveLeft />
                                </div>
                                <h1 className='font-semibold text-xl'>Events</h1>
                            </div>
                            {
                                searchResults && searchResults.length > 0 && <GroupCard groups={searchResults} isEventPage={true}/>
                            }
                            {
                                !searchResults || (searchResults && searchResults.length) === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
                            }
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

Events.propTypes = {
    handleBack: PropTypes.func,
}

export default Events
