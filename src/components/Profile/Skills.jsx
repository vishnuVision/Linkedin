import { MoveRight, Plus, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import { useState } from 'react';
import SkillForm from '../../Forms/SkillForm';
import PropTypes from 'prop-types';
import useApi from '../../hook/useApi';
import { useSelector } from 'react-redux';

function Skills({ skills, refreshSkill }) {
  const { id } = useParams();
  const [isAddSkill, setIsSkill] = useState(false);
  const { apiAction } = useApi();
  const { _id } = useSelector(state => state?.authReducer?.user)

  const handleDeleteSkill = async (id) => {
    const { success, data } = await apiAction({
      url: `api/v1/profile/skill/deleteSkill/${id}`,
      method: "DELETE",
      data: {}
    });

    if (success && data) {
      refreshSkill();
    }
  }

  return (
    <div className="bg-white rounded-lg shadow pt-6 mt-4 overflow-hidden">
      <div className="flex justify-between items-center px-6 mb-2">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        {
          id === _id && (
            <button onClick={() => setIsSkill(prev => !prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full  "><Plus className='text-gray-600 h-6 w-6'/></button>
          )
        }
      </div>
      <div className="grid grid-cols-1 gap-4 px-4">
        {skills && skills.length > 0 && skills.map((skill, index) => (
          <div key={index} className={`flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg border-b ${skills.length - 1 === index ? 'border-b-0' : ''}`}>
            <div className='flex flex-col gap-4'>
              <span className="text-gray-800 font-semibold text-lg">{skill.name}</span>
              {
                skill?.references && skill.references.length > 0 && skill.references.map((ref, index) => (
                  <div key={index} className='flex gap-2 items-center'>
                    <img src={ref?.logo} alt={ref?.name} className="w-8 h-8 object-cover" />
                    <span className="text-md text-gray-700">{skill.name + " at " + ref?.name}</span>
                  </div>
                ))
              }
              {
                skill.endorsedBy && skill.endorsedBy.length > 0 && (
                  <div className='flex gap-2 items-center'>
                    <Users className='w-6 h-6 text-gray-600' />
                    <span className="text-sm font-semibold text-gray-600">{skill.endorsedBy.length} endorsement</span>
                  </div>
                )
              }
            </div>
            {
              id === _id && (
                <div className="flex items-center gap-2 text-gray-500">
                  <button onClick={() => handleDeleteSkill(skill._id)} className='p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full'><Trash2 className='w-5 h-5 text-gray-600'/></button>
                </div>
              )
            }
          </div>
        ))}
        {
          skills && skills.length === 0 && (
            <p className="text-gray-500 pb-6">No skills found.</p>
          )
        }
      </div>
      {
        skills.length > 0 && (
          <div className="hover:bg-gray-100 border-t border-gray-200">
            <Link to={`/profile/${id}/all-skills`} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
              Show all Skills
              <MoveRight className='pt-[2px]' />
            </Link>
          </div>
        )
      }
      <Modal isOpen={isAddSkill} onClose={() => setIsSkill(false)} title='Add skill'>
        <SkillForm refreshSkill={refreshSkill} setIsOpen={setIsSkill} />
      </Modal>
    </div>
  );
}

Skills.propTypes = {
  skills: PropTypes.array,
  refreshSkill: PropTypes.func
};

export default Skills