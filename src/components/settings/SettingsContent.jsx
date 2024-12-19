import { Route, Routes } from 'react-router-dom';
import SettingsItem from './SettingsItem';
import Notfound from '../Notfound';
import SettingDashboard from './SettingDashboard';
import DarkMode from './Features/DarkMode';
import Language from './Features/Language';
import { MoveLeft } from 'lucide-react';
import Input from '../Ui/Input';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{t("hea5")}</h2>
          </div>

          <SettingsItem
            title={t("hea6")}
            to={"manage-email-address"}
            value={"mandlesaravishnu06092004@gmail.com"}
          />

          <SettingsItem
            title={t("hea7")}
            to={"manage-phone-number"}
            value={"6748383939"}
          />

          <SettingsItem
            to={"change-password"}
            title={t("hea8")}
          />
        </div>
      </div>
    </div>
  )
}

const ManageEmail = () => {
  const { t } = useTranslation();
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
            <h2 className="text-md font-semibold">{t("title")}</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">{t("hea6")}</h1>
              <p className="text-sm">mandlesaravishnu06092004@gmail.com</p>
            </div>
          </div>
          <div className='mx-5 mt-2 mb-2'>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>{t("info3")}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ManagePhone = () => {
  const { t } = useTranslation();
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
            <h2 className="text-md font-semibold">{t("title")}</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">{t("hea7")}</h1>
              <p className="text-sm">+91 6463847646</p>
            </div>
          </div>
          <div className='mx-5 mt-2 mb-2'>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>{t("info4")}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChangePassword = () => {
  const { t } = useTranslation();
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
            <h2 className="text-md font-semibold">{t("title")}</h2>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div>
              <h1 className="text-xl font-semibold">{t("info5")}</h1>
              <p className="text-sm">{t("subInfo1")}</p>
            </div>
            <div className='w-64 mt-4 flex flex-col gap-3'>
              <Input label={t("cpass")}/>
              <Input label={t("npass")}/>
              <Input label={t("rpass")}/>
            </div>
            <div className='flex gap-2 mt-2'>
              <button className='bg-blue-600 text-white py-2 px-4 rounded-lg'>{t("info5")}</button>
              <button className='border py-2 px-4 rounded-lg'>{t("forgot")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsContent;