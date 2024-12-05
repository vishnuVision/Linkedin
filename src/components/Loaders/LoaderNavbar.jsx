import Skeleton from './Skeleton'

function LoaderNavbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-64 h-8 rounded-full" />
        </div>
        <div className="flex items-center space-x-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-6 h-6" />
          ))}
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default LoaderNavbar
