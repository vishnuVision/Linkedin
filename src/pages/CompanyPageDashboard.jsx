import CardGrid from "../components/Company/CardGrid";

function CompanyPageDashboard() {
    return (
        <main className="pt-24 px-4 pb-12 max-h-screen overflow-scroll">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-semibold mb-4">Create a LinkedIn Page</h1>
                <p className="text-gray-600">
                    Connect with clients, employees, and the LinkedIn community. To get started, choose a page type.
                </p>
            </div>
            <CardGrid />
            <div className="flex justify-center items-center">
                <div className="mt-12 relative w-full md:w-[90%] lg:w-[60%]">
                    <img
                        src="/company_dashboard.png"
                        alt="LinkedIn Pages"
                        className="w-full mx-auto rounded-lg"
                    />
                    <img
                        src="/company_phone.png"
                        alt="LinkedIn Pages"
                        className="absolute md:top-20 top-10 right-0 w-[25%] mx-auto rounded-lg"
                    />
                </div>
            </div>
        </main>
    );
}

export default CompanyPageDashboard;