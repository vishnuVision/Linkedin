
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchHome from '../components/SearchPage/SearchHome';
import People from '../components/SearchPage/People';
import Post from '../components/SearchPage/Post';
import Groups from '../components/SearchPage/Groups';
import Jobs from '../components/SearchPage/Jobs';
import Company from '../components/SearchPage/Company';
import Schools from '../components/SearchPage/Schools';
import Events from '../components/SearchPage/Events';
import { useState } from 'react';
import FilterTabs from '../components/SearchPage/FilterTabs';

function App() {

    const [selectedTab, setSelectedTab] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        setSelectedTab('');
        navigate("/search/results/all/")
    }

    return (
        <div className="min-h-screen bg-transparent" >
            <main className="pt-20">
                <div className='fixed z-40 top-16 left-0 flex justify-center items-center w-full bg-gray-50'>
                    <FilterTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                </div>
                <div className='pt-14'>
                    <Routes>
                        <Route path="/" element={<SearchHome setSelectedTab={setSelectedTab}/>} />
                        <Route path="People" element={<People handleBack={handleBack} />} />
                        <Route path="Posts" element={<Post handleBack={handleBack} />} />
                        <Route path="Groups" element={<Groups handleBack={handleBack} />} />
                        <Route path="Jobs" element={<Jobs handleBack={handleBack} />} />
                        <Route path="Companies" element={<Company handleBack={handleBack} />} />
                        <Route path="Schools" element={<Schools handleBack={handleBack} />} />
                        <Route path="Events" element={<Events handleBack={handleBack} />} />
                    </Routes>
                </div>
            </main>
        </div >
    );
}

export default App;