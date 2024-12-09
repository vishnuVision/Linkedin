import { Camera, Plus, X } from 'lucide-react';
import Input from '../components/Ui/Input';
import Textarea from '../components/Ui/Textarea';
import { useState } from 'react';

function Create_group_form() {

    const [industry,setIndustry] = useState("");
    const [industries,setIndustries] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const addIndustries = () => {
        if (industries.length <= 3) {
            setIndustries(prev => [...prev, industry]);
            setIndustry("");
        }
    }

    const deleteIndustries = (index) => {
        setIndustries(industries.filter((skill, idx) => idx !== index));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='max-h-[60vh] overflow-y-scroll'>
                <div className="relative">
                    <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
                        <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full hover:bg-gray-100">
                            <Camera className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="absolute -bottom-10 left-4">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                                alt="Profile"
                                className="w-24 h-24 border-4 border-white"
                            />
                            <button className="absolute bottom-0 -right-1 bg-white p-2 rounded-full hover:bg-gray-100 border border-gray-400">
                                <Camera className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='pt-16 flex flex-col gap-2'>
                    <Input
                        label="Group name"
                        name="name"
                        required
                        maxLength={100}
                        placeholder="Inspiring Entrepreneurs in DC"
                    />

                    <Textarea
                        label="Description"
                        name="description"
                        required
                        maxLength={2000}
                        rows={4}
                        placeholder="What is the purpose of your group?"
                    />

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Industry (up to 3)
                        </label>
                        <div className='flex gap-2 items-center mt-2'>
                            <div className='w-52'>
                                <Input value={industry} setvalue={setIndustry} />
                            </div>
                            <button onClick={addIndustries} disabled={industries.length >= 3 ? true : false} className={`flex border items-center gap-1 border-gray-600 px-4 py-1 rounded-full ${industries.length >= 3 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:ring-1 hover:ring-black"}`}>
                                <Plus size={20} /> Add Industry
                            </button>
                        </div>
                        <div className='flex flex-wrap gap-2 mt-3'>
                            {
                                industries && industries.length > 0 && industries.map((skill, index) => (
                                    <span onClick={() => deleteIndustries(index)} key={index} className='bg-[#01754f] cursor-pointer hover:bg-[#10382a] flex items-center gap-2 text-gray-50 px-4 py-1 rounded-full'>
                                        {skill} <X size={20} />
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <Input
                        label="Location"
                        name="location"
                        placeholder="Add a location to your group"
                    />

                    <Textarea
                        label="Rules"
                        placeholder="Set the tone and expections of your group"
                        required
                        maxLength={2000}
                        rows={4}
                    />

                    <div className='flex flex-col gap-2'>
                        <label className="block text-sm font-medium text-gray-700">Group type</label>
                        <div className='flex gap-2 items-start'>
                            <input type="radio" name="gtype" className='w-8 h-8' />
                            <div className=''>
                                <span className='text-md text-gray-800'>Public</span>
                                <p className='text-sm text-gray-600'>Anyone, on or off LinkedIn can see posts in the group. The group appears in search results and is visible to others on members’ profiles.</p>
                            </div>
                        </div>
                        <div className='flex gap-2 items-start'>
                            <input type="radio" name="gtype" className='w-6 h-6' />
                            <div className=''>
                                <span className='text-md text-gray-800'>Private</span>
                                <p className='text-sm text-gray-600 flex-grow'>Only group members can see posts in the group.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
                    Create
                </button>
            </div>
        </form>
    )
}

export default Create_group_form
