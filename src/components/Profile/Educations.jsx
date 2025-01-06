import { Pencil, Plus, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import EducationForm from "../../Forms/EducationForm";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Educations({ educations, refreshEducation }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [educationsData, setEducationsData] = useState({});
    const { id } = useParams();
    const { _id } = useSelector(state => state?.authReducer?.user);

    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Educations</h2>
                {
                    id === _id && (
                        <button onClick={() => setIsOpen(prev => !prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full  "><Plus className="text-gray-600 h-6 w-6" /></button>
                    )
                }
            </div>
            <div className="space-y-6">
                {educations && educations.length > 0 && educations.map((edu, index) => (
                    <div key={index} className={`flex gap-4 border-b pb-4 ${educations.length - 1 === index ? 'border-b-0' : ''}`}>
                        <div className="flex-shrink-0">
                            {edu?.school.logo ? (
                                <img src={edu?.school.logo} alt={edu?.school?.name} className="w-12 h-12 rounded" />
                            ) : (
                                <img src="/building.jpg" alt={edu?.company?.name || ""} className="w-12 h-12 rounded object-cover" />
                            )}
                        </div>
                        <div className="flex justify-between flex-grow">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-900">{edu?.school.name}</h3>
                                <p className="text-gray-600">{edu.degree}</p>
                                {
                                    edu.startYear && edu.endYear && !edu.isPresent && (
                                        <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                                    )
                                }
                                {
                                    edu.isPresent && edu.startYear && (
                                        <p className="text-sm text-gray-500">{edu.startYear} - present</p>
                                    )
                                }
                                <p className="text-sm text-gray-500"><span className="font-semibold">Grade:</span> {edu.grade}</p>
                                <p className="text-sm text-gray-500"><span className="font-semibold">Activities:</span> {edu.activities}</p>
                                <p className="line-clamp-2">{edu.description}</p>
                                {
                                    edu?.media && edu?.media.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {edu?.media.map(({ url }, index) => (
                                                <Link to={url} target="_blank" key={index} className='relative rounded-xl overflow-hidden'>
                                                    <img src={url} alt={`media-${index}`} key={index} className="w-32 h-16 object-cover" />
                                                    <div className='absolute -bottom-1 -right-1 bg-white rounded-xl p-2'>
                                                        <SquareArrowOutUpRight width={20} height={20} />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                            {
                                id === _id && (
                                    <div className='text-gray-500'>
                                        <button onClick={() => { setIsEditOpen(true); setEducationsData(edu) }} className="p-2 hover:bg-gray-100 rounded-full">
                                            <Pencil className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
                {
                    educations && educations.length === 0 && (
                        <p className="text-gray-500">No educations found.</p>
                    )
                }
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Education">
                <EducationForm refreshEducation={refreshEducation} setIsOpen={setIsOpen} />
            </Modal>
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Education">
                <EducationForm isUpdate={true} educationsData={educationsData} refreshEducation={refreshEducation} setIsOpen={setIsEditOpen} />
            </Modal>
        </div>
    )
}

Educations.propTypes = {
    educations: PropTypes.array,
    refreshEducation: PropTypes.func,

}

export default Educations
