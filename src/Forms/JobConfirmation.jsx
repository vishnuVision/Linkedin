import { Check, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import JobHeader from '../components/Jobs/JobHeader';
import ApplicantCollection from '../components/Jobs/ApplicantCollection';
import ScreeningQuestion from '../components/Jobs/ScreeningQuestion';
import Modal from '../Modal/Modal';
import Input from '../components/Ui/Input';
import OtpVerification from './OtpVerification';

const questions = [
    ['Background Check', true, false], ['Driver\'s License', true, false], ['Drug Test', true, false], ['Education', true, true],
    ['Expertise with Skill', false, true], ['Hybrid Work', true, false], ['Industry Experience', false, false], ['Language', false, false],
    ['Location', true, false], ['Onsite Work', true, false], ['Remote Work', true, false], ['Urgent Hiring Need', true, false],
    ['Visa Status', true, false], ['Work Authorization', true, false], ['Work Experience', false, true], ['Custom Question', true, false]
];

function JobConfirmation() {
    const questionsWithAnswer = [
        { type: "Background Check", question: "Are you willing to undergo a background check, in accordance with local law/regulations?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: 'Driver\'s License', question: "Do you have a valid driver's license?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Drug Test", question: "Are you willing to take a drug test, in accordance with local law/regulations?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Education", recommended:true , question: "Have you completed the following level of education: [Degree]", isEditable: true, isCustom: false, mustHave:true,degree:"",isDegree:true },
        { type: "Expertise with Skill", recommended: true, question: "How many years of work experience do you have with [Skill]?", isEditable: true, isCustom: false, mustHave:true,skill:"",minimumYears:0,isSkill:true },
        { type: "Hybrid Work", question: "Are you comfortable working in a hybrid setting?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Industry Experience", question: "How many years of [Industry] experience do you currently have?", isEditable: true, isCustom: false, mustHave:true,minimumYears:0,experience:"",isExperience:true },
        { type: "Language", question: "What is your level of proficiency in [Language]?", isEditable: true, isCustom: false, mustHave:true,language:"",isLanguage:true,languageLevel:""},
        { type: "Location", question: "Are you comfortable commuting to this job's location?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Onsite Work", question: "Are you comfortable working in an onsite setting?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Remote Work", question: "Are you comfortable working in a remote setting?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Urgent Hiring Need", question: "We must fill this position urgently. Can you start immediately?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Visa Status", question: "Will you now or in the future require sponsorship for employment visa status?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Work Authorization", question: "Are you legally authorized to work in India?", answer: "Yes", isEditable: false, isCustom: false, mustHave:true },
        { type: "Work Experience",recommended:true,question: "How many years of [Job Function] experience do you currently have?", isEditable: true, isCustom: false, minimumYears: 0 ,experience:"", mustHave:true,isExperience:true},
        { type: "Custom Question", isCustom: true, mustHave:true },
    ];
    const [email, setEmail] = useState('mandlesaravishnu06092004@gmail.com');
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOTP, setIsOTP] = useState(false);
    const [questionsList, setQuestionsList] = useState(questions);
    const [askedQuestions, setAskedQuestions] = useState([]);

    useEffect(() => {
        if (askedQuestions.length <= 0) {
            const data = questions.filter((qu) => qu[2]);
            data.map((qu) => {
                setAskedQuestions(prev => [...prev, ...questionsWithAnswer.filter((ques) => ques.type === qu[0])]);
            })
        }
    }, [])

    const changeMustHave = (index) => {
        let data=[];
        askedQuestions.map((question,idx)=>{
            if(idx===index)
            {
                question.mustHave = !question.mustHave;
                data = [...data,question];
            }
            else
            {
                data = [...data,question]; 
            }
        })
        setAskedQuestions(data);
    }

    const changeFields = (newValue,index,field) => {
        let data=[];
        askedQuestions.map((question,idx)=>{
            if(idx===index)
            {
                question[field] = newValue;
                data = [...data,question];
            }
            else
            {
                data = [...data,question];
            }
        })
        setAskedQuestions(data);
    }

    const handleQuestions = (question) => {
        if (question[1]) {
            setQuestionsList(questionsList.map((q) => {
                if (q[0] === question[0]) {
                    return [q[0], q[1], !q[2]];
                }
                return q;
            }));
        }
        setAskedQuestions(prev => [...prev, ...questionsWithAnswer.filter(({ type }) => type === question[0])])
    }

    const removeQuestion = (question,index) => {
        setAskedQuestions(askedQuestions.filter((data,idx)=>idx!==index));
        setQuestionsList(questionsList.map((q) => {
            if (q[0] === question.type) {
                console.log(q);
                if(q[1])
                {
                    return [q[0], q[1], !q[2]];
                }
                else
                {
                    return [q[0], q[1], q[2]];
                }
                
            }
            return q;
        }));
    }

    return (
        <div className="max-h-screen overflow-scroll py-8 px-4 pt-20">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2 of 2: Confirm job settings</h2>
                    <p className="text-sm text-gray-600">* Indicates required</p>
                </div>

                <div className="space-y-6">
                    <JobHeader
                        jobTitle="Software Engineer"
                        company="Vision Infotech"
                        location="Surat, Gujarat, India (On-site)"
                    />

                    <ApplicantCollection
                        email={email}
                        onEmailChange={setEmail}
                    />

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Screening questions</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            We recommend adding 3 or more questions. Applicants must answer each question.
                        </p>
                        <div className="space-y-4">
                            {
                                askedQuestions.map((question, index) => (
                                    <ScreeningQuestion
                                        key={index}
                                        index={index}
                                        onChange={changeMustHave}
                                        onRemove={removeQuestion}
                                        questionDetail={question}
                                        changeFields={changeFields}
                                    />
                                ))
                            }
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-3">Add screening questions:</h4>
                            <div className="flex flex-wrap gap-2">
                                {questionsList.map((question, index) => (
                                    <>
                                        {
                                            question[2] && (
                                                <button
                                                    key={index}
                                                    onClick={() => handleQuestions(question)}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border rounded-full bg-gray-200"
                                                >
                                                    <Check className="w-4 h-4" />
                                                    {question[0]}
                                                </button>
                                            )
                                        }
                                        {
                                            !question[2] && (
                                                <button
                                                    key={index}
                                                    onClick={() => handleQuestions(question)}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border rounded-full hover:bg-gray-50"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    {question[0]}
                                                </button>
                                            )
                                        }
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white flex justify-end gap-4 p-6 rounded-lg shadow-sm">
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            Back
                        </button>
                        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={"Confirm your company email address"}>
                <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                        <img className='w-14 h-14 object-cover rounded-full' src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800" alt="job-confirmation" />
                        <img className='w-14 h-14 object-cover rounded-full' src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800" alt="job-confirmation" />
                    </div>
                    <p className='text-md text-gray-900'>
                        To confirm you work with Vision Infotech we&apos;ll need to send a verification code to your company email address. Enter your company email address to continue.
                    </p>
                    <Input type='email' value={organizationEmail} setvalue={setOrganizationEmail} label={"Email address"} placeholder={"Enter email address"} />
                    <ul className='text-sm text-gray-600' style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                        <li>This email address will be added to your account</li>
                        <li>Your organization will see your email address is confirmed</li>
                        <li>We&apos;ll ask permission before sharing any other information with your organization</li>
                    </ul>
                </div>
                <div className='flex flex-row-reverse mt-4'>
                    <button onClick={() => { setIsOpen(false); setIsOTP(true) }} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Send code</button>
                </div>
            </Modal>
            <OtpVerification isOTP={isOTP} setIsOTP={setIsOTP} email={organizationEmail} />
        </div >
    );
}

export default JobConfirmation;