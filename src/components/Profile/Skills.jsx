import { MoveRight,Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Skills() {
  const { id } = useParams();
  const skills = [
    { name: 'React.js', endorsements: 42 },
    { name: 'JavaScript', endorsements: 38 },
    { name: 'Node.js', endorsements: 35 },
    { name: 'TypeScript', endorsements: 29 },
    { name: 'AWS', endorsements: 25 },
  ];

  return (
    <div className="bg-white rounded-lg shadow pt-6 mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4 px-6">Skills</h2>
      <div className="grid grid-cols-1 gap-4 px-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <span className="text-gray-700">{skill.name}</span>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex items-center gap-2 text-gray-500">
                <Trash2 />
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
    </div>
  );
}