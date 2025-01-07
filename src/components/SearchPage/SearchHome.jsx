import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";
import Feed from "../Dashboard/Feed";
import GroupCard from "../Group/GroupCard";
import JobList from "../Jobs/JobList";
import { filterContext } from "../../contextApi/filterContext";
import PropTypes from "prop-types";

function SearchHome({setSelectedTab}) {
    const { hash } = useLocation();
    const searchResults = useContext(filterContext)?.allData;
    const navigate = useNavigate();

    const handleNavigation = (tab) => {
        setSelectedTab(tab);
        navigate(`/search/results/all/${tab}`);
    }

    return (
        <div className="max-w-7xl relative flex justify-center mx-auto px-4">
            <div className="md:fixed w-full md:max-w-7xl px-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-3 md:col-span-4">
                    <div className="w-full flex-shrink-0">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='font-semibold text-xl p-4'>On this page</h1>
                            <div className='flex flex-col pb-2'>
                                <a href="#peoples" className={`px-4 py-2 text-gray-500 ${hash === "" || hash === "#peoples" ? "border-s-2 border-[#01754f] box-border" : ""}`}>People</a>
                                <a href="#companies" className={`px-4 py-2 text-gray-500 ${hash === "#companies" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Companies</a>
                                <a href='#posts' className={`px-4 py-2 text-gray-500 ${hash === "#posts" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Posts</a>
                                <a href='#groups' className={`px-4 py-2 text-gray-500 ${hash === "#groups" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Groups</a>
                                <a href='#jobs' className={`px-4 py-2 text-gray-500 ${hash === "#jobs" ? "border-s-2 border-[#01754f] box-border" : ""}`}>Jobs</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6 space-y-4 pb-20 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>People</h1>
                            {searchResults?.peoples && searchResults?.peoples.length > 0 && searchResults?.peoples.slice(0, 3).map(({ firstName, lastName, bio, location, avatar, followers, _id }, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult name={firstName + " " + lastName} title={bio} location={location} imageUrl={avatar} connections={followers.length} id={_id} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                            {
                                searchResults?.peoples && searchResults?.peoples.length > 3 &&
                                <div onClick={() => handleNavigation('People')} className='text-center hover:bg-gray-100 py-2 text-blue-500 font-semibold cursor-pointer'>
                                    View all
                                </div>
                            }
                            {
                                searchResults?.peoples && searchResults?.peoples.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
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

                    <div id="companies" className="flex-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Companies</h1>
                            {searchResults?.pages && searchResults?.pages.length > 0 && searchResults?.pages.slice(0, 3).map(({ name, tagline, location, logo, organizationSize, _id }, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult name={name} title={tagline} location={location} imageUrl={logo} connections={organizationSize} isCompany={true} id={_id}/>
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                            {
                                searchResults?.pages && searchResults?.pages.length > 3 &&
                                <div onClick={() => handleNavigation('Companies')} className='text-center hover:bg-gray-100 py-2 text-blue-500 font-semibold cursor-pointer'>
                                    View all
                                </div>
                            }
                            {
                                searchResults?.pages && searchResults?.pages.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
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

                    <div id="posts" className="flex-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Posts</h1>
                            {
                                searchResults?.posts && searchResults.posts.length > 0 && <div className="p-2"><Feed posts={searchResults.posts} isLimit={true} /></div>
                            }
                            {
                                searchResults?.posts && searchResults.posts.length > 3 &&
                                <div onClick={() => handleNavigation('Posts')} className='text-center hover:bg-gray-100 py-2 text-blue-500 font-semibold cursor-pointer'>
                                    View all
                                </div>
                            }
                            {
                                searchResults?.posts && searchResults.posts.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
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

                    <div id="groups" className="flex-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Groups</h1>
                            {
                                searchResults?.groups && searchResults.groups.length > 0 && <GroupCard groups={searchResults.groups} isLimit={true} />
                            }
                            {
                                searchResults?.groups && searchResults.groups.length > 3 &&
                                <div onClick={() => handleNavigation('Groups')} className='text-center hover:bg-gray-100 py-2 text-blue-500 font-semibold cursor-pointer'>
                                    View all
                                </div>
                            }
                            {
                                searchResults?.groups && searchResults.groups.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
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

                    <div id="jobs" className="flex-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Jobs</h1>
                            {
                                searchResults?.jobs && searchResults.jobs.length > 0 && <div className="p-2"><JobList isJobPage={true} searchResults={searchResults.jobs} isLimit={true} /></div>
                            }
                            {
                                searchResults?.jobs && searchResults.jobs.length > 3 &&
                                <div onClick={() => handleNavigation('Jobs')} className='text-center hover:bg-gray-100 py-2 text-blue-500 font-semibold cursor-pointer'>
                                    View all
                                </div>
                            }
                            {
                                searchResults?.jobs && searchResults.jobs.length === 0 && (
                                    <div className="p-4">
                                        <p className="text-gray-500">No results found</p>
                                    </div>
                                )
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

                <div className='col-span-12 lg:col-span-3 hidden lg:block'>
                    <Link to="/jobs">
                        <img src="/feed_ads.png" alt="Ad" className="w-full rounded-lg" />
                    </Link>
                </div>

            </div>
        </div>
    )
}

SearchHome.propTypes = {
    setSelectedTab: PropTypes.func,
}

export default SearchHome
