import Skeleton from './Skeleton'

function LoaderSidebar() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
    <div className="text-center pb-4 border-b border-gray-200">
      <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
      <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
    </div>
    <div className="pt-4">
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-4 w-5/6 mb-3" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
  )
}

export default LoaderSidebar
