import { Link } from "react-router-dom";
import ProfileCard from "../Dashboard/ProfileCard";
import Sidebar from "../Dashboard/Sidebar";

const DashboardLayout = () => (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        return (
            <main className="pt-20 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3">
                        <ProfileCard />
                        <div className="bg-white rounded-lg shadow mt-4">
                            <div className="p-2 flex flex-col text-sm font-semibold text-[#0a66c2] px-4 gap-2 justify-evenly">
                                <Link to={"/groups"} className="font-semibold hover:underline hover:underline-offset-1">Groups</Link>
                                <Link to={"/events"} className="font-semibold hover:underline hover:underline-offset-1">Events</Link>
                                <Link to={"/newsletters"} className="font-semibold hover:underline hover:underline-offset-1">NewsLetters</Link>
                            </div>
                            <Link className="flex justify-center items-center hover:bg-gray-100 font-semibold text-slate-600 hover:text-black px-4 py-2 rounded-b-lg" to="/mynetwork/grow">
                                <span>Discover more</span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-9 lg:col-span-6 md:max-h-[90vh] md:overflow-scroll someElement">
                        <WrappedComponent {...props} />
                    </div>
                    <div className="col-span-3 hidden lg:block">
                        <Sidebar />
                    </div>
                </div>
            </main>
        )
    }
}

export default DashboardLayout;
