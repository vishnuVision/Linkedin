import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchResult from "./SearchResult";
import Feed from "../Dashboard/Feed";
import GroupCard from "../Group/GroupCard";
import JobList from "../Jobs/JobList";
import PropTypes from "prop-types";
import FilterTabs from "./FilterTabs";

function SearchHome({ searchResults }) {
    const { hash } = useLocation();
    return (
        <div className="max-w-6xl relative flex justify-center mx-auto px-4">
            <div className='fixed z-40 top-16 left-0 flex justify-center items-center w-full bg-gray-50'>
                <FilterTabs />
            </div>
            <div className="md:fixed max-w-6xl px-2 pt-14 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-3 md:col-span-4">
                    <div className="w-full flex-shrink-0">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='font-semibold text-xl p-4'>On this page</h1>
                            <div className='flex flex-col pb-2'>
                                <a href="#peoples" className={`px-4 py-2 text-gray-500 ${hash === "" || hash === "#peoples" ? "border-s-2 border-[#01754f] box-border" : ""}`}>People</a>
                                <a href='#posts' className={`px-4 py-2 text-gray-500 ${hash === "#posts" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Posts</a>
                                <a href='#groups' className={`px-4 py-2 text-gray-500 ${hash === "#groups" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Groups</a>
                                <a href='#jobs' className={`px-4 py-2 text-gray-500 ${hash === "#jobs" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Jobs</a>
                                <a href='#more' className={`px-4 py-2 text-gray-500 ${hash === "#more" ? "border-s-2 border-[#01754f] box-border" : ""}`}>More people</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6 space-y-4 pb-20 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>People</h1>
                            {searchResults.map((result, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult {...result} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div id="posts" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Posts</h1>
                            <div className='p-2'>
                                <Feed />
                            </div>
                        </div>
                    </div>

                    <div id="groups" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Groups</h1>
                            <GroupCard />
                        </div>
                    </div>

                    <div id="jobs" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Jobs</h1>
                            <div className='p-2'>
                                <JobList />
                            </div>
                        </div>
                    </div>

                    <div id='more' className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>More People</h1>
                            {searchResults.map((result, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult {...result} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
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

SearchHome.propTypes = {
    searchResults: PropTypes.array
}

export default SearchHome
