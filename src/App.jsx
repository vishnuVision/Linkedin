import { Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from "./components/Loaders/Loader"
import Home from "./pages/Home"
import Notfound from "./components/Notfound"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import ChatDashboard from "./pages/ChatDashboard"
import Network from "./pages/Network"
import JobDetails from "./pages/JobDetails"
import Notification from "./pages/Notification"
import AppLayout from "./components/layouts/AppLayout"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Group from "./pages/Groups"
import Events from "./pages/Events"
import Newsletters from "./pages/Newsletters";
import GroupDetails from "./pages/GroupDetails"
import EventDetails from "./pages/EventDetails"
import NewsletterDetails from "./pages/NewsletterDetails"
import Setting from "./pages/Setting"
import JobInfo from "./pages/JobInfo"
import CompanyProfile from "./pages/CompanyProfile"
import CompanyPageDashboard from "./pages/CompanyPageDashboard"
import CompanyForm from "./Forms/CompanyForm"
import JobPostingAccount from "./pages/JobPostingAccount"
import CompanyAdminDashboard from "./pages/CompanyAdminDashboard"
import JobPostPage from "./pages/JobPostPage"
import JobPostingForm from "./Forms/JobPostingForm"
import JobConfirmation from "./Forms/JobConfirmation"
import Writearticle from "./Forms/Writearticle"
import SearchResult from "./pages/SearchResult"
import ProtectedRouting from "./components/auth/ProtectedRouting"
import axios from "axios"
import { useDispatch } from "react-redux"
import { assignUser } from "./redux/slices/authReducer";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isChatDetailsOpen, setIsChatDetailsOpen] = useState(false);
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/getUserDetails`, { withCredentials: true });
      if (response.data) {
        const { success, data, message } = await response.data;
        if (success) {
          dispatch(assignUser(data));
        }
        else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRouting><AppLayout isChatDetailsOpen={isChatDetailsOpen} setIsChatDetailsOpen={setIsChatDetailsOpen} /></ProtectedRouting>}>
            <Route path="/feed" element={<Dashboard />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/company/:id/*" element={<CompanyProfile />} />
            <Route path="/company/:id/admin/dashboard/*" element={<CompanyAdminDashboard />} />
            <Route path="/messaging" element={<ChatDashboard />} />
            <Route path="/mynetwork/*" element={<Network />} />
            <Route path="/jobs" element={<JobDetails />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/group/:id" element={<GroupDetails />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id/*" element={<EventDetails />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/newsletter/:id" element={<NewsletterDetails />} />
            <Route path="/newsletter/:id/createarticle" element={<Writearticle />} />
            <Route path="/jobs/:id" element={<JobInfo />} />
            <Route path="/job-posting" element={<JobPostPage />} />
            <Route path="/job-posting/form" element={<JobPostingForm />} />
            <Route path="/job-posting/form/assesments" element={<JobConfirmation />} />
            <Route path="/settings/*" element={<Setting />} />
            <Route path="/company/setup" element={<CompanyPageDashboard />} />
            <Route path="/company/setup/new" element={<CompanyForm />} />
            <Route path="/my-items/*" element={<JobPostingAccount />} />
            <Route path="/search/results/all/*" element={<SearchResult />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </Router>
  )
}

export default App
