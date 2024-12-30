import { Building2, Pen, Plus, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import EducationForm from "../../Forms/EducationForm";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Educations({ educations }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Educations</h2>
                <button onClick={() => setIsOpen(prev => !prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full  "><Plus width={25} height={25} /></button>
            </div>
            <div className="space-y-6">
                {educations && educations.length > 0 && educations.map((edu, index) => (
                    <div key={index} className={`flex gap-4 border-b pb-4 ${educations.length - 1 === index ? 'border-b-0' : ''}`}>
                        <div className="flex-shrink-0">
                            {edu?.school.logo ? (
                                <img src={edu?.school.logo} alt={edu?.school?.name} className="w-12 h-12 rounded" />
                            ) : (
                                <Building2 className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <div className="flex justify-between flex-grow">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-900">{edu?.school.name}</h3>
                                <p className="text-gray-600">{edu.degree}</p>
                                <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                                <p className="text-sm text-gray-500"><span className="font-semibold">Grade:</span> {edu.grade}</p>
                                <p className="text-sm text-gray-500"><span className="font-semibold">Activities:</span> {edu.activities}</p>
                                <p className="mt-2 text-gray-600">{edu.description}</p>
                                {
                                    edu?.media && edu?.media.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {edu?.media.map(({ url }, index) => (
                                                <Link to={url} key={index} className='relative rounded-xl overflow-hidden'>
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
                            <div className="text-gray-500">
                                <button onClick={() => setIsOpen(true)} className='p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full'><Pen /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Education">
                <EducationForm />
            </Modal>
        </div>
    )
}

Educations.propTypes = {
    educations: PropTypes.array,
}

export default Educations
