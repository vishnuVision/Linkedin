import { Building2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Tech Company Inc.',
      role: 'Senior Software Engineer',
      period: '2020 - Present',
      description: 'Leading frontend development initiatives and mentoring junior developers.',
      logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80'
    },
    {
      company: 'StartUp Co.',
      role: 'Software Engineer',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple client-facing applications.',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
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
            <div>
              <h3 className="font-semibold text-gray-900">{exp.role}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
              <p className="mt-2 text-gray-600">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}