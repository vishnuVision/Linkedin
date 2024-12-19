import { Settings, UserCircle, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';



const Sidebar = () => {
  const {pathname} = useLocation();
  const {t,i18n} = useTranslation();
  const { language } = useSelector((state) => state?.languageReducer);

  useEffect(()=>{
    i18n.changeLanguage(language);
  },[language])

  const menuItems = [
    { icon: UserCircle, text: `${t("h2")}`, to:"/settings/" },
    { icon: Lock, text: `${t("h3")}`, to:"/settings/sign-in-and-security" },
  ];

  return (
    <div className="w-full md:w-64 bg-white md:min-h-screen p-4 border-r">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6" />
        <h1 className="text-xl font-semibold">{t("h1")}</h1>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors
              ${pathname === item.to 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-50'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;