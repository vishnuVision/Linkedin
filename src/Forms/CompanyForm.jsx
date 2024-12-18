import { useState } from 'react';
import { MoveLeft, Upload } from 'lucide-react';
import FormInput from '../components/Ui/Input';
import FormSelect from '../components/Ui/Select';
import PreviewCard from '../components/Company/CompanyPreviewCard';
import { useNavigate } from 'react-router-dom';

function CompanyForm() {
  const [formData, setFormData] = useState({
    name: '',
    linkedinUrl: '',
    website: '',
    industry: '',
    organizationSize: '',
    organizationType: '',
    tagline: '',
    logo: null,
    agreed: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/company/1/admin/dashboard/");
  };

  return (
    <div className="max-h-full overflow-scroll py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoveLeft className="w-10 h-10 p-2 mb-4 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-full" onClick={() => window.history.back()}/>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Company name*"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Add your organization's name"
                />

                <FormInput
                  label="LinkedIn URL*"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="Add your unique LinkedIn address"
                  prefix="linkedin.com/company/"
                />

                <FormInput
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Begin with http://, https:// or www."
                />

                <FormInput
                  label="Industry*"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="ex: Information Services"
                />

                <FormSelect
                  label="Organization size*"
                  name="organizationSize"
                  value={formData.organizationSize}
                  onChange={handleChange}
                  options={[
                    '0-1 employees',
                    '2-10 employees',
                    '11-50 employees',
                    '51-200 employees',
                    '201-500 employees',
                    '501-1000 employees',
                    '1001+ employees'
                  ]}
                />

                <FormSelect
                  label="Organization type*"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  options={[
                    'Public Company',
                    'Private Company',
                    'Nonprofit',
                    'Government Agency',
                    'Educational Institution',
                    'Self-Employed'
                  ]}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <button type="button" className="text-blue-600 hover:text-blue-500">
                        Choose file
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      300 x 300px recommended. JPGs, JPEGs, and PNGs supported.
                    </p>
                  </div>
                </div>

                <FormInput
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="ex: An information services firm helping small businesses succeed."
                  maxLength={120}
                  hint="Use your tagline to briefly describe what your organization does. This can be changed later."
                />

                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                    />
                    <label className="ml-2 text-sm text-gray-600">
                      I verify that I am an authorized representative of this organization and have
                      the right to act on its behalf in the creation and management of this page.
                      The organization and I agree to the additional terms for Pages.
                    </label>
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                    Read the LinkedIn Pages Terms
                  </a>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Create page
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <PreviewCard formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm