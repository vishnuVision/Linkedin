import PropTypes from 'prop-types'
import { MoveLeft } from 'lucide-react'
import SearchResult from './SearchResult'
import React from 'react'
import CompanyFilter from './CompanyFilter'

function Company({searchResults}) {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div onClick={() => { window.history.back() }} className="p-2 mb-2 bg-slate-300 hover:bg-slate-400 cursor-pointer w-fit rounded-full">
                <MoveLeft />
            </div>
            <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
                <div className="w-full col-span-12 lg:col-span-3 md:col-span-4">
                    <div className="col-span-12 lg:col-span-4 md:col-span-5">
                        <div className="w-full flex-shrink-0">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <CompanyFilter/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                    <div id="peoples" className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            <h1 className='px-4 pt-4 font-semibold text-xl'>Company</h1>
                            {searchResults.map((result, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult {...result} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Company.propTypes = {
    searchResults:PropTypes.array
}

export default Company
