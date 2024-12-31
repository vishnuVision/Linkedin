import { Link, useLocation, useNavigate } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useEffect, useState } from "react"
import { useAuth, useSignUp, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../redux/slices/authReducer";
import toast from "react-hot-toast";
import Loader from "../components/Loaders/Loader";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
    const [page, setPage] = useState(0);
    const { isLoaded, signUp, setActive } = useSignUp();
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState();
    const user = useUser();
    const dispatch = useDispatch();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const { user: userData } = useSelector((state) => state.authReducer);
    const [isLoading, setIsLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const authenticateParam = queryParams.get("authenticate");
    const messageParam = queryParams.get("message");

    useEffect(() => {
        if (userData) {
            if (!userData?.firstName && !userData?.lastName && !userData?.location && userData?.educations?.length === 0 && userData?.experiences?.length === 0) {
                navigate("/provide-details");
            }
            else {
                navigate("/feed");
            }
        }
    }, [userData])

    useEffect(() => {
        if (authenticateParam === "true") {
            if (user?.user?.emailAddresses[0]?.emailAddress) {
                signUpUser();
            }
            else {
                setError("Someone's already using that email.");
            }
        }

        if (authenticateParam === "false") {
            if(messageParam)
            {
                setError(messageParam);
            }
            else
            {
                setError("Someone's already using that email.");
            }
        }
    }, [])

    const signUpUser = async (emailAddress) => {
        setIsLoading(true);
        let email = emailAddress || user?.user?.emailAddresses[0]?.emailAddress;
        try {
            if (email) {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/register`, { email: email, password }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.data) {
                    const { success, data, message } = await response.data;
                    if (success) {
                        dispatch(assignUser(data));
                        setError("");
                        navigate("/feed");
                    }
                    else {
                        toast.error(message);
                    }
                }
            }
        }
        catch (err) {
            await signOut({ redirectTo: undefined });
            setError(err.errors ? err.errors[0].message : "Someone's already using that email.");
        }
        setIsLoading(false);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;
        setIsLoading(true);

        try {
            const signUpAttempt = await signUp.create({
                emailAddress: email,
                password: password,
            });
            await signUpAttempt.prepareEmailAddressVerification();
            setError("");
            setPage(1);
        } catch (err) {
            await signOut({ redirectTo: undefined });
            setError(err.errors ? err.errors[0].message : "Someone's already using that email.");
        }
        setIsLoading(false);
    };

    const handleVerifyOTP = async () => {
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: otp,
            });

            if (signUpAttempt.status === "complete") {
                setError("");
                signUpUser(signUpAttempt.emailAddress);
                await setActive({ session: signUpAttempt.createdSessionId });
            }
            setPage(0);
        } catch (err) {
            setOtp("");
            await signOut({ redirectTo: undefined });
            window.location.href = `/signup?authenticate=false&&message=Invalid OTP. Please try again`;
            setError(err.errors ? "Invalid OTP. Please try again." : "Something went wrong");
        }
    };

    const handleGoogleSignup = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/signup?authenticate=true",
                redirectUrlComplete: "/signup?authenticate=true",
            });
        } catch (err) {
            await signOut({ redirectTo: undefined });
            window.location.href = `/signup?authenticate=false&&message=${err.errors ? err.errors[0].message : "Someone's already using that email."}`;
        }
    };

    const handleMicrosoftSignup = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_microsoft",
                redirectUrl: "/signup?authenticate=true",
                redirectUrlComplete: "/signup?authenticate=true",
            });
        } catch (err) {
            await signOut({ redirectTo: undefined });
            window.location.href = `/signup?authenticate=false&&message=${err.errors ? err.errors[0].message : "Someone's already using that email."}`;
        }
    };

    const handleCaptchaChange = (value) => {
        setError("");
        setCaptchaValue(value);
    };

    if (userData) {
        return <Loader />
    }

    return (
        <div className="bg-[#866f55] bg-opacity-10 w-screen h-screen flex flex-col justify-start p-2">
            <div className="flex justify-between py-4">
                <div className="px-12">
                    <Link className='flex gap-1 justify-center items-center font-bold text-[#0a66c2] text-4xl'>Linked<img src="/logo.png" alt="LinkedIn" className="w-9 h-9" /></Link>
                </div>
                <div></div>
            </div>
            <div className="mt-10">
                <div className="flex flex-col items-center justify-center min-h-full">
                    <div className="mb-6 text-center">
                        <p className="text-4xl text-black">Make the most of your professional life</p>
                    </div>
                    {
                        page === 0 &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input label="Email" type="email" placeholder="you@example.com" value={email} setvalue={setEmail} />
                                <Input label="Password" type="password" placeholder="Enter a Password" value={password} setvalue={setPassword} />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn&apos;s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
                                {
                                    captchaValue === null &&
                                    <div className="flex justify-start flex-col items-start mt-4">
                                        <ReCAPTCHA
                                            sitekey="6LekZKUqAAAAAMZ5FCTLw5oQ8SZdtXq5c7VlT_xV"
                                            onChange={handleCaptchaChange}
                                            onExpired={() => setError("CAPTCHA expired. Please try again.")}
                                            onErrored={() => setError("CAPTCHA verification failed. Please try again.")}
                                        />
                                        <p className="text-sm text-gray-600 ml-2">Please verify that you are not a robot</p>
                                    </div>
                                }
                                <button
                                    type="submit"
                                    disabled={isLoading || !captchaValue}
                                    className={`${isLoading || !captchaValue ? "opacity-50 cursor-not-allowed" : ""}  w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
                                >
                                    Agree & Join
                                </button>
                            </form>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">or</span>
                                </div>
                            </div>
                            <button disabled={isLoading || !captchaValue} type="button" onClick={handleGoogleSignup} className={`${isLoading || !captchaValue ? "opacity-50 cursor-not-allowed" : ""} flex w-full mt-4 gap-1 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium`}>
                                <img src="/google.webp" className="w-6 h-6" alt="icon" />
                                Continue With Google
                            </button>
                            <button disabled={isLoading || !captchaValue} type="button" onClick={handleMicrosoftSignup} className={`${isLoading || !captchaValue ? "opacity-50 cursor-not-allowed" : ""} flex w-full mt-4 gap-2 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium`}>
                                <img src="/microsoft.png" className="w-6 h-6" alt="icon" />
                                Continue With Microsoft
                            </button>
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-600">
                                    Already on LinkedIn?{" "}
                                    <a href="/signin" className="text-blue-500 hover:underline">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    }
                    {
                        page === 1 &&
                        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleVerifyOTP();
                                }}
                                className="space-y-4"
                            >
                                <Input label="Enter OTP" type="text" name="otp" value={otp} setvalue={setOtp} placeholder="Enter OTP" />
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                >
                                    Verify & Continue
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Signup