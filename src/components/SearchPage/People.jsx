import PropTypes from "prop-types"
import Filters from "./Filters"
import React, { useContext, useEffect, useState } from "react"
import SearchResult from "./SearchResult"
import { MoveLeft } from "lucide-react"
import { filterContext } from "../../contextApi/filterContext"

function People({ handleBack }) {
    const allData = useContext(filterContext);
    const [searchResults,setSearchResults] = useState([]);

    useEffect(() => {
        setSearchResults(allData?.peoples || []);
    }, [allData])
    
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="w-full col-span-12 lg:col-span-3 md:col-span-4">
                    <div className="col-span-12 lg:col-span-4 md:col-span-5">
                        <div className="w-full flex-shrink-0">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <Filters searchResults={searchResults} setSearchResults={setSearchResults}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white mb-4 overflow-hidden rounded-lg shadow">
                            <div className="flex gap-3 items-center p-2">
                                <div onClick={handleBack} className="p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                                    <MoveLeft />
                                </div>
                                <h1 className='font-semibold text-xl'>People</h1>
                            </div>
                            {searchResults && searchResults?.length > 0 && searchResults?.map(({ firstName, lastName, bio, location, avatar, followers }, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult name={firstName + " " + lastName} title={bio} location={location} imageUrl={avatar} connections={followers.length} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                            {
                                searchResults && searchResults.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

People.propTypes = {
    handleBack: PropTypes.func
}

export default People