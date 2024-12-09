import JobList from "../components/Jobs/JobList";
import NetworkSidebar from "../components/Network/NetworkSidebar";

function JobDetails() {
  return (
    <div className=" bg-transparent">
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center md:grid md:grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3 md:col-span-4">
              <NetworkSidebar />
            </div>
            <div className="col-span-12 lg:col-span-9 md:col-span-8 h-[90vh] md:overflow-y-auto someElement">
              <div className="col-span-9">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Recommended Jobs</h2>
                  <p className="text-gray-600 mt-1">Based on your profile and search history</p>
                </div>
                <JobList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetails;