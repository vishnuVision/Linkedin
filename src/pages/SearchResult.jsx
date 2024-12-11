
import { Routes,Route } from 'react-router-dom';
import SearchHome from '../components/SearchPage/SearchHome';
import People from '../components/SearchPage/People';
import Post from '../components/SearchPage/Post';
import Groups from '../components/SearchPage/Groups';
import Jobs from '../components/SearchPage/Jobs';
import Company from '../components/SearchPage/Company';
import Schools from '../components/SearchPage/Schools';
import Events from '../components/SearchPage/Events';

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

function App() {
    
    return (
        <div className="min-h-screen bg-transparent" >
            <main className="pt-20">
                <Routes>
                    <Route path="/" element={<SearchHome searchResults={searchResults} />} />
                    <Route path="People" element={<People searchResults={searchResults} />} />
                    <Route path="Posts" element={<Post />} />
                    <Route path="Groups" element={<Groups />} />
                    <Route path="Jobs" element={<Jobs />} />
                    <Route path="Companies" element={<Company searchResults={searchResults}/>} />
                    <Route path="Schools" element={<Schools searchResults={searchResults}/>} />
                    <Route path="Events" element={<Events/>} />
                </Routes>
            </main>
        </div >
    );
}

export default App;