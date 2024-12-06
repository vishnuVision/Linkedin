import { Routes, Route } from "react-router-dom";
import { Analytics } from "../components/CompanyAdmin/Analytics";
import { Conversations } from "../components/CompanyAdmin/Conversations";
import RecentPosts from "../components/CompanyAdmin/RecentPosts";
import Sidebar from "../components/CompanyAdmin/Sidebar";
import Feed from "../components/Dashboard/Feed";
import CreatePost from "../components/Dashboard/CreatePost";
import PageUpdateForm from "../Forms/PageUpdateForm";
import { useState } from "react";
import EditCompanyModal from "../Modal/EditCompanyModal";

function CompanyAdminDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="min-h-screen bg-transparent" >
            <main className="pt-20 pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-4">
                        <div className="w-full col-span-12 lg:col-span-3 md:col-span-4">
                            <Sidebar
                                companyName="Tech Solutions Inc."
                                followers={0}
                                activeTab="dashboard"
                                setIsOpen={setIsOpen}
                            />
                        </div>
                        <div className="flex flex-col w-full col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement gap-4">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/page-posts" element={<Pageposts />} />
                                <Route path="/feed" element={<FeedforCompany />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </main>
            <EditCompanyModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit">
                <PageUpdateForm />
            </EditCompanyModal>
        </div >
    );
}

const Dashboard = () => {
    return (
        <>
            <RecentPosts />
            <Analytics />
            <Conversations />
        </>
    )
}

const Pageposts = () => {
    return (
        <div>
            <CreatePost />
            <Feed />
        </div>
    )
}

const FeedforCompany = () => {
    return (
        <>
            <div className="bg-white rounded-lg shadow p-2 md:p-4">
                <h1 className="text-lg font-semibold">Feed</h1>
                <p className="text-slate-500">Join relevant conversations to build brand awareness</p>
            </div>
            <Feed />
        </>
    )
}

export default CompanyAdminDashboard;

