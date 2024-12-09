import { Camera } from 'lucide-react'
import Input from '../components/Ui/Input'
import Textarea from '../components/Ui/Textarea'
import Select from '../components/Ui/Select'

function Create_event_form() {

    const handleSubmit = async () => {

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
                </div>
                <div className='pt-4 flex flex-col gap-4'>
                    <Select label={"Organizer"} list={["Vishnu Mandlesara", "Vaishali Mandlesara"]} />

                    <div className='flex flex-col gap-2'>
                        <label className="block text-sm font-medium text-gray-700">Event type</label>
                        <div className='flex gap-4'>
                            <div className='flex gap-2 items-start'>
                                <input type="radio" name="etype" className='w-8 h-8' />
                                <div className=''>
                                    <span className='text-md text-gray-800'>Online</span>
                                </div>
                            </div>
                            <div className='flex gap-2 items-start'>
                                <input type="radio" name="etype" className='w-6 h-6' />
                                <div className=''>
                                    <span className='text-md text-gray-800'>In person</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Input
                        label="Event name"
                    />

                    <Select label={"Timezone"} list={["New Delhi", "Kolkata"]} />

                    <div className='flex gap-4'>
                        <div className='flex-grow'>
                            <Input type='date' label={"Start date"} />
                        </div>
                        <div className='flex-grow'>
                            <Input type='time' label={"Start time"} />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='flex-grow'>
                            <Input type='date' label={"End date"} />
                        </div>
                        <div className='flex-grow'>
                            <Input type='time' label={"End time"} />
                        </div>
                    </div>

                    <Input
                        label="External event link"
                    />

                    <Textarea
                        label="Description"
                        name="description"
                        required
                        maxLength={2000}
                        rows={4}
                        placeholder="Ex: topics, schedule, etc."
                    />

                    <Select label={"Speakers"} list={["Vishnu Mandlesara", "Vaishali Mandlesara"]} />

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

export default Create_event_form
