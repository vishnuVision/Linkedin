import { MoveLeft } from "lucide-react"

function Language() {
    return (
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
            <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-2 border-b flex items-center">
                        <div className="hover:bg-gray-100 rounded-full">
                            <button onClick={() => { window.history.back() }} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                                <MoveLeft className="pt-[2px]" />
                            </button>
                        </div>
                        <h2 className="text-md font-semibold">Back</h2>
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <div>
                            <h1 className="text-xl font-semibold">Language</h1>
                            <p className="text-sm">Select the language you use on Linkedin</p>
                        </div>
                        <div>
                            <select className="w-64 border border-gray-300 p-2 rounded-lg" name="" id="">
                                <option value="">please select</option>
                                <option value="">English</option>
                                <option value="">Hindi</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-5 pt-5 pb-1">
                        <p className="text-sm">Let us know which language you’re most comfortable using on LinkedIn. You can change it back at any time. Learn more</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Language
