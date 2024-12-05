import { Routes,Route } from "react-router-dom"
import CompanyProfileHeader from "../components/Company/CompanyProfileHeader"
import Notfound from "../components/Notfound"
import Home from "../components/Company/Home"
import About from "../components/Company/About"
import Posts from "../components/Company/Posts"
import Jobs from "../components/Company/Jobs"
import People from "../components/Company/People"

function CompanyProfile() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl max-h-[90vh] overflow-y-scroll pb-4 someElement mx-auto px-4">
        <CompanyProfileHeader/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/people" element={<People />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  )
}

export default CompanyProfile
