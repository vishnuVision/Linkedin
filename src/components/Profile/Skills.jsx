import { MoveRight, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import { useState } from 'react';
import SkillForm from '../../Forms/SkillForm';

export default function Skills() {
  const { id } = useParams();
  const [isAddSkill,setIsSkill] = useState(false);
  const skills = [
    { name: 'React.js', endorsements: 42 },
    { name: 'JavaScript', endorsements: 38 },
    { name: 'Node.js', endorsements: 35 },
    { name: 'TypeScript', endorsements: 29 },
    { name: 'AWS', endorsements: 25 },
  ];

  return (
    <div className="bg-white rounded-lg shadow pt-6 mt-4">
      <div className="flex justify-between items-center px-6 mb-2">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <button onClick={()=>setIsSkill(prev=>!prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full  "><Plus width={25} height={25} /></button>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span className="text-gray-700">{skill.name}</span>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex items-center gap-2 text-gray-500">
                <button className='p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full'><Trash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hover:bg-gray-100 border-t border-gray-200">
        <Link to={`/profile/${id}/all-skills`} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
          Show all Skills
          <MoveRight className='pt-[2px]' />
        </Link>
      </div>
      <Modal isOpen={isAddSkill} onClose={()=>setIsSkill(false)} title='Add skill'>
        <SkillForm/>
      </Modal>
    </div>
  );
}