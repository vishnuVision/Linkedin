import SettingsItem from './SettingsItem'

function SettingDashboard() {
    return (
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
            <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Profile information</h2>
                    </div>

                    <SettingsItem
                        title="Name, location, and industry"
                        description="Name, location, and industry information"
                        to={"/profile/1?edit=true"}
                    />

                    <SettingsItem
                        title="Personal demographic information"
                        description="Age, gender, and other personal information"
                    />

                    <SettingsItem
                        title="Verifications"
                        description="Manage your identity verifications"
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Display</h2>
                    </div>

                    <SettingsItem
                        title="Dark mode"
                        value="Off"
                        to={"/settings/dark-mode"}
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">General preferences</h2>
                    </div>

                    <SettingsItem
                        title="Language"
                        value="English"
                        to={"/settings/language"}
                    />
                </div>
                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Account management</h2>
                    </div>

                    <SettingsItem
                        title="Log out"
                    />
                </div>
            </div>
        </div>
    )
}

export default SettingDashboard
