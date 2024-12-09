import Sidebar from '../components/settings/Sidebar';
import SettingsContent from '../components/settings/SettingsContent';

function Setting() {
  return (
    <div className="pt-16">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <SettingsContent />
      </div>
    </div>
  );
}

export default Setting;