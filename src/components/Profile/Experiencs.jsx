import { Pencil, Plus, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import ExperienceForm from '../../Forms/ExperienceForm';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

function Experience({ experiences, refreshExperience }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [experienceData, setExperienceData] = useState({});
  const { id } = useParams();
  const { _id } = useSelector(state => state?.authReducer?.user)

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        {
          id === _id && (
            <button onClick={() => setIsOpen(prev => !prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full"><Plus className='text-gray-600 w-6 h-6' /></button>
          )
        }
      </div>
      <div className="space-y-6">
        {experiences && experiences.length > 0 && experiences.map((exp, index) => (
          <div key={index} className={`flex gap-4 border-b pb-4 ${experiences.length - 1 === index ? 'border-b-0' : ''}`}>
            <div className="flex-shrink-0">
              {exp?.company?.logo ? (
                <img src={exp?.company?.logo} alt={exp?.company?.name} className="w-12 h-12 rounded" />
              ) : (
                <img src="/building.jpg" alt={exp?.company?.name || ""} className="w-12 h-12 rounded object-cover" />
              )}
            </div>
            <div className='flex items-start flex-grow'>
              <div className='flex-grow'>
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-500">{exp?.company?.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 p-[3px] w-1 rounded-full bg-slate-500"></div>
                    <p className="text-sm text-gray-500">{exp?.employmentType}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {
                    exp.startYear && exp.endYear && !exp.isPresent && (
                      <p className="text-sm text-gray-500">{exp.startYear} - {exp.endYear}</p>
                    )
                  }
                  {
                    exp.isPresent && exp.startYear && (
                      <p className="text-sm text-gray-500">{exp.startYear} - present</p>
                    )
                  }
                  <div className="flex items-center gap-2">
                    <div className="h-1 p-[3px] w-1 rounded-full bg-slate-500"></div>
                    {
                      exp?.startYear && exp?.startMonth && (
                        <p className="text-sm text-gray-500">
                          {(() => {
                            const start = moment(`${exp.startYear}-${exp.startMonth}`, "YYYY-MMMM");
                            const end = moment();

                            if (!start.isValid()) {
                              return "";
                            }

                            const years = end.diff(start, "years");
                            if (years >= 1) {
                              return `${years} year${years > 1 ? "s" : ""}`;
                            }

                            const months = end.diff(start, "months");
                            if (months >= 1) {
                              return `${months} month${months > 1 ? "s" : ""}`;
                            }

                            const days = end.diff(start, "days");
                            return `${days} day${days > 1 ? "s" : ""}`;
                          })()}
                        </p>
                      )
                    }
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-500">{exp?.location}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 p-[3px] w-1 rounded-full bg-slate-500"></div>
                    <p className="text-sm text-gray-500">{exp?.locationType}</p>
                  </div>
                </div>
                <div className="line-clamp-2">
                  {exp.description}
                </div>
                {
                  exp?.media && exp?.media.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {exp?.media?.map(({ url }, index) => (
                        <Link to={url} target='_blank' key={index} className='relative rounded-xl overflow-hidden'>
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
                    <button onClick={() => { setIsEditOpen(true); setExperienceData(exp); }} className="p-2 hover:bg-gray-100 rounded-full">
                      <Pencil className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        ))}
        {
          experiences && experiences.length === 0 && (
            <p className='text-gray-500'>No experience found.</p>
          )
        }
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Add Experience'>
        <ExperienceForm setIsOpen={setIsOpen} refreshExperience={refreshExperience} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title='Edit Experience'>
        <ExperienceForm isUpdate={true} setIsOpen={setIsEditOpen} experienceData={experienceData} refreshExperience={refreshExperience} />
      </Modal>
    </div>
  );
}

Experience.propTypes = {
  experiences: PropTypes.array,
  refreshExperience: PropTypes.func
}

export default Experience

