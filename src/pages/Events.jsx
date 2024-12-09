import { useState } from "react"
import GroupCard from "../components/Group/GroupCard"
import DashboardLayout from "../components/layouts/DashboardLayout"
import Modal from "../Modal/Modal"
import Create_event_form from "../Forms/Create_event_form";

function Events() {
    const [isOpen,setIsOpen] = useState(false);
    return (
        <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
            <div className='flex flex-col mt-4 items-start bg-gray-50 rounded-lg border'>
                <div className='flex w-full justify-between items-center px-4 border-b border-gray-200'>
                    <div className='flex gap-1'>
                        <h1 className="h-full py-4 px-4 text-green-600 border-b-2 border-green-600 font-semibold">Your Events</h1>
                    </div>
                    <div className='py-2'>
                        <button onClick={()=>setIsOpen(true)} className='px-4 py-1 rounded-full border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100'>Create Event</button>
                    </div>
                </div>
                <div className='w-full'>
                    <GroupCard to={"/event/1/"} />
                    <GroupCard to={"/event/2/"} />
                    <GroupCard to={"/event/3/"} />
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={"Create group"}>
                <Create_event_form/>
            </Modal>
        </div>
    )
}
export default DashboardLayout()(Events)
