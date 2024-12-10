import React from 'react';
import FilterTabs from '../components/SearchPage/FilterTabs';
import SearchResult from '../components/SearchPage/SearchResult';
import Filters from '../components/SearchPage/Filters';
import { Link } from 'react-router-dom';

function App() {
    const searchResults = [
        {
            name: "Sarah Johnson",
            title: "Senior Software Engineer",
            location: "San Francisco Bay Area",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
            connections: "500+ connections"
        },
        {
            name: "Michael Chen",
            title: "Product Manager",
            location: "New York City",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
            connections: "1,234 connections"
        },
        {
            name: "Emily Williams",
            title: "UX Designer",
            location: "London, UK",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150",
            connections: "892 connections"
        }
    ];

    return (
        <div className="min-h-screen pt-10">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="fixed left-0 bg-white w-screen">
                    <FilterTabs />
                </div>

                <div className="flex gap-6 pt-16">
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow p-4">
                            <Filters />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow">
                            {searchResults.map((result, index) => (
                                <React.Fragment key={index}>
                                    <SearchResult {...result} />
                                    {index < searchResults.length - 1 && <div className="border-b" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <Link to="/jobs">
                        <img src="/feed_ads.png" alt="Ad" className="w-full rounded-lg" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;