import { Routes, Route, Link, useLocation } from "react-router-dom";
import Growpage from "../components/Network/Growpage";
import Catchup from "../components/Network/Catchup";
import NetworkSidebar from "../components/Network/NetworkSidebar";
import Notfound from "../components/Notfound";

function Network() {
  const { pathname: url } = useLocation();
  return (
    <div className="min-h-screen bg-transparent" >
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
            <div className="w-full col-span-12 lg:col-span-3 md:col-span-4">
              <NetworkSidebar />
            </div>
            <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
              <div className='flex gap-4 items-start bg-gray-50 rounded-lg px-6 border'>
                <div className={`${url === "/mynetwork/grow" ? "text-[#01754f] border-b-2 border-[#01754f]" : ""} h-full font-semibold py-2 px-4`}>
                  <Link to={"/mynetwork/grow"} className=''>Grow</Link>
                </div>
                <div className={`${url === "/mynetwork/catch-up" ? "text-[#01754f] border-b-2 border-[#01754f]" : ""} h-full font-semibold py-2 px-4`}>
                  <Link to={"/mynetwork/catch-up"} className=''>Catch up</Link>
                </div>
              </div>
              <Routes>
                <Route path="/grow" element={<Growpage />} />
                <Route path="/catch-up" element={<Catchup />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div >
  );
}

export default Network;