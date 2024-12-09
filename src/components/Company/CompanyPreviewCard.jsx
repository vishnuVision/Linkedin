import { Building2, Plus } from 'lucide-react';
import PropTypes from 'prop-types';

function PreviewCard({ formData }) {
    return (
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className=''>
                <div className='border-b border-gray-300'>
                    <h2 className="p-2 py-3 text-sm font-semibold text-gray-900">Page preview</h2>
                </div>
                <div className="overflow-hidden p-6 bg-[#eae6df]">
                    <div className='rounded-lg border border-gray-300 bg-white'>
                        <div className="relative px-4 pt-3 pb-2">
                            <div className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-300">
                                {formData.logo ? (
                                    <img
                                        src={URL.createObjectURL(formData.logo)}
                                        alt="Company logo"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ) : (
                                    <Building2 className="w-20 h-20 text-gray-400" />
                                )}
                            </div>
                        </div>
                        <div className="px-4 pb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {formData.name || 'Company name'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.tagline || 'Tagline'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {formData.industry || 'Industry'}
                            </p>

                            <button className="mt-4 inline-flex items-center px-4 py-1 border bg-blue-700 font-semibold text-md  rounded-full text-white">
                                <Plus className="pr-1" /> Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PreviewCard.propTypes = {
    formData: PropTypes.object
};

export default PreviewCard;