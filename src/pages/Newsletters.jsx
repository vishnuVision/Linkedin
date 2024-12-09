import GroupCard from "../components/Group/GroupCard"
import DashboardLayout from "../components/layouts/DashboardLayout"

function Newsletters() {
    return (
        <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
            <div className='flex flex-col mt-4 items-start bg-gray-50 rounded-lg border'>
                <div className='flex w-full justify-between items-center px-2 md:px-4 border-b border-gray-200'>
                    <div className='flex gap-1'>
                        <h1 className="h-full break-words py-4 px-1 text-center text-sm md:text-lg md:px-4 text-green-600 border-b-2 border-green-600 font-semibold">Your Newsletters</h1>
                    </div>
                    <div className='py-2'>
                        <button className='px-2 py-0 md:px-4 md:py-1 text-md md:text-lg rounded-full border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100'>Create Newsletters</button>
                    </div>
                </div>
                <div className='w-full'>
                    <GroupCard to={"/newsletter/1"}/>
                    <GroupCard to={"/newsletter/2"}/>
                    <GroupCard to={"/newsletter/3"}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout()(Newsletters)
