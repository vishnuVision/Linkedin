import CatchupCard from "./CatchupCard"

function Catchup() {
  return (
    <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
      <div className='flex flex-col mt-4 items-start bg-gray-50 rounded-lg border'>
        <CatchupCard/>
        <CatchupCard/>
        <CatchupCard/>
      </div>
    </div>
  )
}

export default Catchup
