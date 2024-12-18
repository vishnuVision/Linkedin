import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const ChatDashboard = lazy(() => import('./pages/ChatDashboard'));
const Network = lazy(() => import('./pages/Network'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Notification = lazy(() => import('./pages/Notification'));
const AppLayout = lazy(() => import('./components/layouts/AppLayout'));
const Group = lazy(() => import('./pages/Groups'));
const Events = lazy(() => import('./pages/Events'));
const Newsletters = lazy(() => import('./pages/Newsletters'));
const GroupDetails = lazy(() => import('./pages/GroupDetails'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const NewsletterDetails = lazy(() => import('./pages/NewsletterDetails'));
const Setting = lazy(() => import('./pages/Setting'));
const JobInfo = lazy(() => import('./pages/JobInfo'));
const CompanyProfile = lazy(() => import('./pages/CompanyProfile'));
const CompanyPageDashboard = lazy(() => import('./pages/CompanyPageDashboard'));
const CompanyForm = lazy(() => import('./Forms/CompanyForm'));
const JobPostingAccount = lazy(() => import('./pages/JobPostingAccount'));
const CompanyAdminDashboard = lazy(() => import('./pages/CompanyAdminDashboard'));
const JobPostPage = lazy(() => import('./pages/JobPostPage'));
const JobPostingForm = lazy(() => import('./Forms/JobPostingForm'));
const JobConfirmation = lazy(() => import('./Forms/JobConfirmation'));
const Writearticle = lazy(() => import('./Forms/Writearticle'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const ProtectedRouting = lazy(() => import('./components/auth/ProtectedRouting'));
const ProvideDetails = lazy(() => import('./pages/ProvideDetails'));
const Home = lazy(() => import('./pages/Home'));
const Loader = lazy(() => import('./components/Loaders/Loader'));

function RoutesPage() {
    const [isChatDetailsOpen, setIsChatDetailsOpen] = useState(false);
    return (
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
                    <Route path="/provide-details" element={<ProvideDetails />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default RoutesPage
