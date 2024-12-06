import { useState } from 'react';
import { Camera, Info, MoveLeft, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import Input from '../components/Ui/Input';
import Select from '../components/Ui/Select';

function PageUpdateForm({ onSubmit }) {
    const [section, setSection] = useState(0);

    return (
        <div className="">
            <div className="flex flex-col justify-center md:grid md:grid-cols-12">
                <div className="w-full col-span-12 lg:col-span-3 md:col-span-3 border-b md:border-r">
                    <div className='flex flex-col mt-2'>
                        <button onClick={() => setSection(0)} className={`px-4 text-start text-sm py-2 font-semibold hover:bg-[#866f55] hover:bg-opacity-10 ${section === 0 ? "bg-[#866f55] bg-opacity-10 " : ""}`}>
                            Page info
                        </button>
                        <button onClick={() => setSection(1)} className={`px-4 text-start text-sm py-2 font-semibold hover:bg-[#866f55] hover:bg-opacity-10 ${section === 1 ? "bg-[#866f55] bg-opacity-10 " : ""}`}>
                            Details
                        </button>
                        <button onClick={() => setSection(2)} className={`px-4 text-start text-sm py-2 font-semibold hover:bg-[#866f55] hover:bg-opacity-10 ${section === 2 ? "bg-[#866f55] bg-opacity-10 " : ""}`}>
                            Locations
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full col-span-12 lg:col-span-9 md:col-span-9 max-h-[90vh] md:overflow-y-scroll someElement gap-4">
                    {
                        section === 0 ? <PageInfo onSubmit={onSubmit} /> : section === 1 ? <DetailsForm /> : <AddLocation />
                    }
                </div>
            </div>

        </div>
    );
}

const PageInfo = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: 'abcjndjnd',
        url: 'linkedin.com/company/abcjndjnd',
        tagline: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Page info</h2>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex items-start space-x-4">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop"
                                alt="Company Logo"
                                className="w-24 h-24 rounded object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                />
                            </label>
                            <div className="mt-1 text-right text-sm text-gray-500">9/100</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            LinkedIn public URL
                            <div className="flex items-center mt-1">
                                <span className="text-gray-500 mr-2">linkedin.com/company/</span>
                                <input
                                    type="text"
                                    value={formData.url.replace('linkedin.com/company/', '')}
                                    onChange={(e) => setFormData({ ...formData, url: `linkedin.com/company/${e.target.value}` })}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                />
                                <button type="button" className="ml-2 text-gray-400 hover:text-gray-600">
                                    <Info size={16} />
                                </button>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tagline
                            <textarea
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                rows={3}
                            />
                        </label>
                        <div className="mt-1 text-right text-sm text-gray-500">3/120</div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-3 mt-2 border-t">
                        <button
                            type="button"
                            onClick={() => onSubmit(formData)}
                            className="px-5 py-1 text-gray-700 hover:bg-gray-50 rounded-full border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const DetailsForm = () => {
    return (
        <div className='px-4 py-2'>
            <h2 className='text-lg mb-2'>Provide details to display on your page</h2>
            <form className='max-h-[60vh] overflow-y-auto pr-2 pb-4' >
                <div className="">
                    <div className='space-x-4'>
                        <label className="block text-sm font-medium text-gray-700">
                            Overview
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                rows={3}
                            />
                        </label>
                        <div className="mt-1 text-right text-sm text-gray-500">3/120</div>
                    </div>
                    <Input label={"Website URL"} />
                    <div className='w-[60%] mt-3 space-y-3'>
                        <Input label={"Industry"} />
                        <Select label={"Company size"} list={["0-1 employees", "2-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "501-1000 employees", "1001-5000 employees", "5001-10000 employees", "10001+ employees"]} />
                        <Select label={"Company type"} list={["Educational", "Goverment Agency", "Non Profit", "Partnership", "Privately Held", "Public company", "Self Employed", "Self Owned",]} />
                        <Input label={"Phone"} />
                        <Input label={"Year founded"} type='number' />
                    </div>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium text-gray-700">
                            Specialities
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                rows={3}
                            />
                        </label>
                        <div className="mt-1 text-right text-sm text-gray-500">3/120</div>
                    </div>
                </div>
            </form>
        </div>
    )
}

const AddLocation = () => {
    const [isDisplay, setIsDisplay] = useState(false);
    return (
        <div className='px-4 py-2 min-h-[50vh]'>
            {
                !isDisplay &&
                <div>
                    <h2 className='text-lg'>Update locations to let members know where you&apos;re based</h2>
                    <p className='text-sm text-slate-500 mb-4'>If you don&apos;t have a street address, you can exclude it.</p>
                    <button onClick={() => setIsDisplay(true)} className='flex bg-[#0a66c2] py-1 px-2 rounded-lg text-gray-50'><Plus className='pr-1' /> Add a location</button>
                </div>
            }
            {
                isDisplay &&
                <form className='max-h-[60vh] overflow-y-auto pr-2 pb-4' >
                    <MoveLeft className="w-10 h-10 p-2 mb-2 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full" onClick={() => setIsDisplay(false)}/>
                    <h2 className='text-lg'>Add a location</h2>
                    <p className='text-sm text-slate-500 mb-4'>Let&apos;s enter your primary location. You can edit, remove, or add more locations later.</p>
                    <div className="flex flex-col gap-2">
                        <Select label={"Country/Region"} list={["Educational", "Goverment Agency", "Non Profit", "Partnership", "Privately Held", "Public company", "Self Employed", "Self Owned",]} />
                        <Input label={"Street address"} />
                        <Input label={"Apt, suite, etc."} />
                        <Input label={"City"} />
                        <div className='flex gap-2'>
                            <div className='flex-grow'>
                                <Input label={"State/Province"} />
                            </div>
                            <div className='flex-grow'>
                                <Input label={"ZIP/Postal code"} />
                            </div>
                        </div>
                        <Input label={"Location name"} />
                    </div>
                </form>
            }
        </div>
    )
}

PageInfo.propTypes = {
    onSubmit: PropTypes.func
}

PageUpdateForm.propTypes = {
    onSubmit: PropTypes.func
}

export default PageUpdateForm;