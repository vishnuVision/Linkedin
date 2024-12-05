import Skeleton from './Skeleton'

function LoaderCard() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex items-center space-x-3 mb-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-3" />
    <Skeleton className="h-4 w-5/6 mb-3" />
    <Skeleton className="h-4 w-4/6" />
  </div>
  )
}

export default LoaderCard
