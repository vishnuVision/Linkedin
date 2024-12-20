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
import axios from "axios";
import toast from "react-hot-toast";
import FilterContextProvider from "../../contextApi/filterContext";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [allData,setAllData] = useState();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language])

    useEffect(() => {
        getResult();
    }, [searchQuery])

    function shuffleArray(array) {
        array = array.filter(item => item !== undefined);
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    const getResult = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/filter/getAllData/${searchQuery}`, { withCredentials: true });
            if (response.data) {
                const { success, data, message } = await response.data;
                if (success) {
                    setAllData(data);
                    const persons = data?.peoples?.map((person) => ({ ...person, type: "person" })) || [];
                    const jobs = data?.jobs?.map((job) => ({ ...job, type: "job" })) || [];
                    const events = data?.events?.map((event) => ({ ...event, type: "event" })) || [];
                    const groups = data?.groups?.map((group) => ({ ...group, type: "group" })) || [];
                    const newsLetters = data?.newsLetters?.map((newsletter) => ({ ...newsletter, type: "newsLetter" })) || [];
                    const company = data?.pages?.map((company) => {
                        if (company.type === "company")
                            return ({ ...company, type: "company" });
                    }) || [];
                    const school = data?.pages?.map((school) => {
                        if (school.type === "school")
                            return ({ ...school, type: "school" });
                    }) || [];
                    const articles = data?.posts?.map((post) => {
                        if (post.type === "article")
                            return ({ ...post, type: "article" });
                    }) || [];
                    const posts = data?.posts?.map((post) => {
                        if (post.type === "post")
                            return ({ ...post, type: "post" });
                    }) || [];

                    const resultData = shuffleArray([...persons, ...jobs, ...events, ...groups, ...newsLetters, ...company, ...school, ...articles, ...posts]);
                    setSearchResults(resultData.slice(0, 10));
                    return resultData;
                }
                else {
                    toast.error(message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                <Navbar setSearchQuery={setSearchQuery} searchResults={searchResults} />
                <div className="h-[100vh] overflow-scroll md:overflow-hidden bg-[#866f55] bg-opacity-10">
                    <FilterContextProvider value={allData}>
                        <Outlet />
                    </FilterContextProvider>
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
