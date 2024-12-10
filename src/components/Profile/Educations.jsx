import { Building2, Pen, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import EducationForm from "../../Forms/EducationForm";

function Educations() {
    const [isOpen, setIsOpen] = useState(false);
    const experiences = [
        {
            college: 'Shree Ram Krishna Institute of Technology',
            degree: 'Bachelor of Technology in Computer Science and Engineering',
            period: '2014 - 2018',
            description: 'Graduated with a Bachelor of Technology degree in Computer Science and Engineering.',
            logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80',
            grade: '9.8 CGPA'
        },
        {
            college: 'VNSGU',
            degree: 'Bachelor of Technology in Computer Science and Engineering',
            period: '2014 - 2018',
            description: 'Graduated with a Bachelor of Technology degree in Computer Science and Engineering.',
            logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80',
            grade: '10 CGPA'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Educations</h2>
                <button onClick={() => setIsOpen(prev => !prev)} className="p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full  "><Plus width={25} height={25} /></button>
            </div>
            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                            {exp.logo ? (
                                <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded" />
                            ) : (
                                <Building2 className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <div className="flex justify-between flex-grow">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-900">{exp.college}</h3>
                                <p className="text-gray-600">{exp.degree}</p>
                                <p className="text-sm text-gray-500">{exp.period}</p>
                                <p className="text-sm text-gray-500">{exp.grade}</p>
                                <p className="mt-2 text-gray-600">{exp.description}</p>
                            </div>
                            <div className="text-gray-500">
                                <button onClick={()=>setIsOpen(true)} className='p-2 hover:bg-[#866f55] hover:bg-opacity-10 rounded-full'><Pen /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Education">
                <EducationForm/>
            </Modal>
        </div>
    )
}

export default Educations
