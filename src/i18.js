import i18 from "i18next";
import { initReactI18next } from "react-i18next";

i18.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources:{
        en:{
            translation:{
                h1:"Settings",
                h2:"Account preferences",
                h3:"Sign in & security",
                nav1:"Home",
                nav2:"Network",
                nav3:"Jobs",
                nav4:"Messages",
                nav5:"Notifications",
                nav6:"Me",
                nav7:"For Business",
                title:"Back",
                hea1:"Profile information",
                hea2:"Display",
                hea3:"General preferences",
                hea4:"Account management",
                subhea1:"Name, location, and industry",
                subhea2:"Personal demographic information",
                subhea3:"Contact information",
                subhea4:"Dark mode",
                subhea5:"Language",
                subhea6:"Log out",
                text1:"Name, location, and industry information",
                text2:"Age, gender, and other personal information",
                text3:"Manage your identity verifications",
                searchLabel:"Search",
                info1:"Select the language you use on Linkedin",
                en:"English",
                hi:"Hindi",
                select:"please select",
                info2:"Let us know which language you’re most comfortable using on LinkedIn. You can change it back at any time. Learn more",
                mode:"Off",
                theme:"Theme Settings",
                dark:"Dark",
                light:"Light",
                hea5:"Account access",
                hea6:"Email Address",
                hea7:"Phone number",
                hea8:"Change Password",
                info3:"Add email address",
                info4:"Add phone number",
                info5:"Change password",
                subInfo1:"Create a new password that is at least 8 characters long.",
                cpass:"Type your current password",
                npass:"Type your new password",
                rpass:"Retype your new password",
                forgot:"Forgot password",
                messaging:'Messaging',
                searchmsg:"Search messages",
                view:"View Profile",
                setting:"Settings & Privacy",
                posts:"Posts & Activity",
                com:"Company:",
                job:"Job Posting Account",
                hed:"Account",
                hed1:"Manage",
                ap:"My Apps",
                client:"Find New Clients",
                grp:"Groups",
                evt:"Events",
                news:"Newsletters",
                exp:"Explore more for business",
                free:"Post a job for free",
                apc:"Get qualified applicants quickly",
                started:"Get Started With Premium",
                expa:"Expand and leverage your network",
                page:"Create a company page"
            }
        },
        hi:{
            translation:{
                h1:"सेटिंग्स",
                h2:"अकाउंट प्रेफरेंस",
                h3:"साइन इन और सुरक्षा",
                nav1:"होम",
                nav2:"नेटवर्क",
                nav3:"जॉब्स",
                nav4:"मेसेज",
                nav5:"नोटर्स",
                nav6:"मे",
                nav7:"व्यवसायिक",
                title:"पीछे",
                hea1:"प्रोफाइल जानकारी",
                hea2:"डिस्प्ले",
                hea3:"सामान्य प्रेफरेंस",
                hea4:"अकाउंट मैनेजमेंट",
                subhea1:"नाम, स्थान, और व्याख्यान",
                subhea2:"व्यक्तिगत जानकारी",
                subhea3:"संपर्क जानकारी",
                subhea4:"डार्क मोड",
                subhea5:"भाषा",
                subhea6:"लॉग आउट",
                text1:"नाम, स्थान, और व्याख्यान जानकारी",
                text2:"वय, लिंग, और अन्य व्यक्तिगत जानकारी",
                text3:"अकाउंट मैनेजमेंट",
                searchLabel:"खोज",
                info1:"लिंकडिन में अपनी भाषा का चयन करें",
                en:"अंग्रेजी",
                hi:"हिंदी",
                select:"कृपया चयन करें",
                info2:"हमें बताएं कि आप लिंक्डइन पर किस भाषा का उपयोग करने में सबसे अधिक सहज हैं। आप इसे किसी भी समय वापस बदल सकते हैं. और अधिक जानें",
                mode:"बंद",
                theme:"थीम सेटिंग्स",
                dark:"डार्क",
                light:"लाइट",
                hea5:"अकाउंट एक्सेस",
                hea6:"ईमेल पता",
                hea7:"फोन नंबर",
                hea8:"पासवर्ड बदलें",
                info3:"ईमेल पता जोड़ें",
                info4:"फोन नंबर जोड़ें",
                info5:"पासवर्ड बदलें",
                subInfo1:"एक नया पासवर्ड बनाएं जो कम से कम 8 अक्षर लंबा हो।",
                cpass:"वर्तमान पासवर्ड टाइप करें",
                npass:"नया पासवर्ड टाइप करें",
                rpass:"पासवर्ड दोबारा टाइप करें",
                change:"पासवर्ड बदलें",
                forgot:"पासवर्ड भूल गए?",
                messaging:'मेसेजिंग',
                searchmsg:"मेसेज खोजें",
                view:"प्रोफाइल देखें",
                setting:"सेटिंग्स और प्राइवेसी",
                posts:"पोस्ट्स और अकाउंट",
                com:"कंपनी:",
                job:"जॉब पोस्टिंग अकाउंट",
                hed:"अकाउंट",
                hed1:"मैनेजमेंट",
                ap:"मेरे अप्स",
                client:"नया क्लाइंट खोजें",
                grp:"ग्रूप्स",
                evt:"इवेंट्स",
                news:"न्यूज़लेटर्स",
                exp:"बिजनेस में अधिक अनुभव करें",
                free:"फ्री जॉब पोस्टिंग",
                apc:"जांचित परिचालकों को लागू करें",
                pro:"प्रो जॉब पोस्टिंग",
                started:"प्रीमियम शुरू करें",
                expa:"नेटवर्क को विस्तार करें और अनुभव करें",
                page:"कंपनी पेज बनाएं"
            }
        }
    }
})