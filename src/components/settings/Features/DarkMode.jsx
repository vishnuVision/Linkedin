import { MoveLeft } from "lucide-react"

function DarkMode() {
    return (
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
            <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-2 border-b flex items-center">
                        <div className="hover:bg-gray-100 rounded-full">
                            <button onClick={()=>{window.history.back()}} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                                <MoveLeft className="pt-[2px]" />
                            </button>
                        </div>
                        <h2 className="text-md font-semibold">Back</h2>
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <h1 className="text-xl font-semibold">Theme Settings</h1>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="mode" id="dark" className="w-4 h-4" />
                            <label htmlFor="light" className="text-md">Dark</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="mode" id="light" className="w-4 h-4" />
                            <label htmlFor="light" className="text-md">Light</label>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default DarkMode
