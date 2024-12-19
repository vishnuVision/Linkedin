import { useTranslation } from 'react-i18next'
import SettingsItem from './SettingsItem'

function SettingDashboard() {
    const { t } = useTranslation();
    return (
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-scroll ">
            <div className="p-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">{t("hea1")}</h2>
                    </div>

                    <SettingsItem
                        title={t("subhea1")}
                        description={t("text1")}
                        to={"/profile/1?edit=true"}
                    />

                    <SettingsItem
                        title={t("subhea2")}
                        description={t("text2")}
                    />

                    <SettingsItem
                        title={t("subhea3")}
                        description={t("text3")}
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">{t("hea2")}</h2>
                    </div>

                    <SettingsItem
                        title={t("subhea4")}
                        value={t("mode")}
                        to={"/settings/dark-mode"}
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">{t("hea3")}</h2>
                    </div>

                    <SettingsItem
                        title={t("subhea5")}
                        value={t("en")}
                        to={"/settings/language"}
                    />
                </div>
                <div className="bg-white rounded-lg shadow-sm border mt-6">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">{t("hea4")}</h2>
                    </div>

                    <SettingsItem
                        title={t("subhea6")}
                    />
                </div>
            </div>
        </div>
    )
}

export default SettingDashboard
