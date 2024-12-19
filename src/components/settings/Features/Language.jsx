import { MoveLeft } from "lucide-react";
import { LANGUAGES } from "../../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/slices/language";

function Language() {
    const { language } = useSelector((state) => state?.languageReducer);
    const [selectedlanguage,setSelectedLanguage] = useState(language);
    const { i18n,t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setLanguage(selectedlanguage));
        i18n.changeLanguage(selectedlanguage);
    },[selectedlanguage])

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
                        <h2 className="text-md font-semibold">{t('title')}</h2>
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <div>
                            <h1 className="text-xl font-semibold">{t("subhea5")}</h1>
                            <p className="text-sm"></p>
                        </div>
                        <div>
                            <select onChange={(e)=>setSelectedLanguage(e.target.value)} className="w-64 border border-gray-300 p-2 rounded-lg" name="" id="">
                                <option value="">{t("select")}</option>
                                {
                                    LANGUAGES.map((language, index) => (
                                        <option selected={language.value === selectedlanguage} key={index} value={language.value}>{t(language.value)}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="px-5 pt-5 pb-1">
                        <p className="text-sm">{t("info2")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Language
