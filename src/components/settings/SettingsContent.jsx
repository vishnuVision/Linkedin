import { Route, Routes } from 'react-router-dom';
import SettingsItem from './SettingsItem';
import Notfound from '../Notfound';
import SettingDashboard from './SettingDashboard';
import DarkMode from './Features/DarkMode';
import Language from './Features/Language';
import { MoveLeft } from 'lucide-react';
import Input from '../Ui/Input';

const SettingsContent = () => {
  return (
    <Routes>
      <Route path="/*" element={<SettingHome />} />
      <Route path="/sign-in-and-security/*" element={<SignAndSecurity />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
};

const SettingHome = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingDashboard />} />
      <Route path="/dark-mode" element={<DarkMode />} />
      <Route path="/language" element={<Language />} />
    </Routes>
  );
}

const SignAndSecurity = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSecurityHome />} />
      <Route path="/manage-email-address" element={<ManageEmail />} />
      <Route path="/manage-phone-number" element={<ManagePhone />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  )
}

const SignInSecurityHome = () => {
  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Account access</h2>
          </div>

          <SettingsItem
            title="Email address"
            to={"manage-email-address"}
            value={"mandlesaravishnu06092004@gmail.com"}
          />

          <SettingsItem
            title="Phone number"
            to={"manage-phone-number"}
            value={"6748383939"}
          />

          <SettingsItem
            to={"change-password"}
            title="Change Password"
          />
        </div>
      </div>
    </div>
  )
}

const ManageEmail = () => {
  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-2 border-b flex items-center">
            <div className="hover:bg-gray-100 rounded-full">
              <button onClick={() => { window.history.back() }} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                <MoveLeft className="pt-[2px]" />
              </button>
            </div>
            <h2 className="text-md font-semibold">Back</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">Email address</h1>
              <p className="text-sm">mandlesaravishnu06092004@gmail.com</p>
            </div>
          </div>
          <div className='mx-5 mt-2 mb-2'>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>Add email address</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ManagePhone = () => {
  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-2 border-b flex items-center">
            <div className="hover:bg-gray-100 rounded-full">
              <button onClick={() => { window.history.back() }} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                <MoveLeft className="pt-[2px]" />
              </button>
            </div>
            <h2 className="text-md font-semibold">Back</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">Phone number</h1>
              <p className="text-sm">+91 6463847646</p>
            </div>
          </div>
          <div className='mx-5 mt-2 mb-2'>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>Add phone number</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChangePassword = () => {
  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-2 border-b flex items-center">
            <div className="hover:bg-gray-100 rounded-full">
              <button onClick={() => { window.history.back() }} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                <MoveLeft className="pt-[2px]" />
              </button>
            </div>
            <h2 className="text-md font-semibold">Back</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">Change password</h1>
              <p className="text-sm">Create a new password that is at least 8 characters long.</p>
            </div>
            <div className='w-64 mt-4 flex flex-col gap-3'>
              <Input label="Type your current password"/>
              <Input label="Type your new password"/>
              <Input label="Retype your new password"/>
            </div>
            <div className='flex gap-2 mt-2'>
              <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>Change password</button>
              <button className='border py-2 px-4 rounded-lg'>Forgot password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsContent;