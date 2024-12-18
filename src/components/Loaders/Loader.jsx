import LoaderSidebar from './LoaderSidebar'
import LoaderCard from './LoaderCard'
import LoaderNavbar from './LoaderNavbar'

function Loader() {
  return (
    <div className="min-h-screen bg-gray-100">
      <LoaderNavbar />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-1">
              <LoaderSidebar />
            </div>
            <div className="lg:col-span-2">
              {[1, 2, 3].map((i) => (
                <LoaderCard key={i} />
              ))}
            </div>
            <div className="hidden lg:block lg:col-span-1">
              <LoaderSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Loader
