import ProfileHeader from '../components/Profile/ProfileHeader';
import About from '../components/Profile/About';
import Experience from '../components/Profile/Experiencs';
import Skills from '../components/Profile/Skills';
import Analytics from '../components/Profile/Analytics';
import Activity from '../components/Profile/Activity';
import Educations from '../components/Profile/Educations';
import { Routes, Route } from 'react-router-dom';
import Notfound from '../components/Notfound';
import { MoveLeft, Trash2 } from 'lucide-react';
import Feed from '../components/Dashboard/Feed';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import EditIntroForm from '../Forms/EditIntroForm';

function Profile() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl max-h-[90vh] overflow-y-scroll someElement mx-auto px-4 pb-2">
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/all-posts" element={<ActivityPage />} />
          <Route path="/all-skills" element={<SkillPage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (profile) => {
    console.log('Saving profile:', profile);
    setIsModalOpen(false);
  };

  return (
    <>
      <ProfileHeader setIsModalOpen={setIsModalOpen}/>
      <Analytics />
      <About />
      <Activity />
      <Experience />
      <Educations />
      <Skills />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit intro"
      >
        <EditIntroForm
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}

const ActivityPage = () => {
  return (
    <div className="bg-white rounded-lg shadow pt-6 mt-4">
      <div className='flex items-center gap-2 px-6 mb-4'>
        <div onClick={handleBack} className='w-10 h-10 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full flex justify-center items-center cursor-pointer'>
          <MoveLeft />
        </div>
        <h2 className="text-xl font-bold text-gray-900">All Posts</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 pb-4">
        <Feed />
      </div>
    </div>
  )
}

const SkillPage = () => {
  const skills = [
    { name: 'React.js', endorsements: 42 },
    { name: 'JavaScript', endorsements: 38 },
    { name: 'Node.js', endorsements: 35 },
    { name: 'TypeScript', endorsements: 29 },
    { name: 'AWS', endorsements: 25 },
  ];

  return (
    <div className="bg-white rounded-lg shadow pt-6 mt-4">
      <div className='flex items-center gap-2 px-6 mb-4'>
        <div onClick={handleBack} className='w-10 h-10 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full flex justify-center items-center cursor-pointer'>
          <MoveLeft />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 pb-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`border-b border-gray-200 flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg ${index === skills.length - 1 ? 'border-b-0' : ''}`}
          >
            <span className="text-gray-700">{skill.name}</span>
            <div className="flex items-center gap-2 text-gray-500">
              <Trash2 />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const handleBack = () => {
  window.history.back();
};

export default Profile;