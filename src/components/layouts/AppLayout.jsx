import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import { ChevronUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import MessageToggle from "../Message/MessageToggle";
import Chat from "../../Dialogues/Chat";
import PropTypes from "prop-types";
import HandleModalContext from "../../contextApi/handleModalContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const conversations = [
    {
        id: 1,
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        lastMessage: 'Thanks for connecting! Looking forward to...',
        time: '2m ago',
        unread: true,
    },
    {
        id: 2,
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        lastMessage: 'Would love to discuss the opportunity...',
        time: '1h ago',
        unread: false,
    },
    {
        id: 3,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 4,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 5,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 6,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 7,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 8,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 9,
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        lastMessage: 'Great presentation yesterday! I wanted to...',
        time: '3h ago',
        unread: true,
    },
    {
        id: 1,
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        lastMessage: 'Thanks for connecting! Looking forward to...',
        time: '2m ago',
        unread: true,
    },
];

const AppLayout = ({ isChatDetailsOpen, setIsChatDetailsOpen }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);
    const { user } = useSelector(state => state.authReducer);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { language } = useSelector((state) => state?.languageReducer);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language])

    useEffect(() => {
        if (user) {
            if (!user?.firstName && !user?.lastName && !user?.location && user?.educations?.length === 0 && user?.experiences?.length === 0) {
                navigate("/provide-details");
            }
            else {
                setIsChatOpen(true);
                setIsDisplay(true);
            }
        }
    }, [])

    return (
        <HandleModalContext value={{ isChatDetailsOpen, setIsChatDetailsOpen }}>
            <div className="">
                <Navbar />
                <div className="h-[100vh] overflow-scroll md:overflow-hidden bg-[#866f55] bg-opacity-10">
                    <Outlet />
                </div>
                <div className={`hidden lg:flex absolute w-72 shadow-2xl border bottom-0 right-8 bg-white flex-col rounded-t-lg`}>
                    {
                        isDisplay &&
                        <div onClick={() => setIsChatOpen(prev => !prev)} className={`border-b-[1px] hover:bg-gray-100 cursor-pointer border-slate-200 flex px-4 py-2 justify-between items-center`}>
                            <div className="flex justify-center items-center gap-2">
                                <img className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="User Avatar" />
                                <p className="text-sm font-semibold">{t("messaging")}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                {
                                    isChatOpen &&
                                    <ChevronUp className="rotate-180" />
                                }
                                {
                                    !isChatOpen &&
                                    <ChevronUp />
                                }
                            </div>
                        </div>
                    }
                    {
                        isChatOpen &&
                        <div className="h-[80vh] overflow-y-scroll">
                            <div className="border-b border-gray-200">
                                <div className="flex items-center m-2 space-x-2 bg-gray-100 rounded-full px-4 py-2">
                                    <Search className="w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder={t("searchmsg")}
                                        className="bg-transparent w-full focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                            {conversations.map((conversation) => (
                                <MessageToggle isOpen={isChatDetailsOpen} setIsOpen={setIsChatDetailsOpen} key={conversation.id} {...conversation} />
                            ))}
                        </div>
                    }
                    {
                        isChatDetailsOpen &&
                        <div className="h-[70vh] w-96 absolute bottom-0 right-[110%] bg-white rounded-t-lg shadow-xl border">
                            <div className="h-full border-b border-gray-200">
                                <div className="h-full">
                                    <Chat setIsVisible={setIsChatDetailsOpen} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </HandleModalContext>
    )
}

AppLayout.propTypes = {
    isChatDetailsOpen: PropTypes.bool,
    setIsChatDetailsOpen: PropTypes.func,
}

export default AppLayout;
