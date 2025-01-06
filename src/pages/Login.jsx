import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Ui/Input"
import { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../redux/slices/authReducer";
import {  toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import Loader from "../components/Loaders/Loader";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const { signIn, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { user } = useUser();
    const { user: userData } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const { signOut } = useAuth();
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
            if (user?.emailAddresses[0]?.emailAddress) {
                toast.promise(
                    login(user.emailAddresses[0].emailAddress),
                    {
                        pending: "Signing in...",
                        success: "Signed in successfully! 🎉",
                        error: "Signed in failed ❌",
                    },
                    { position: "bottom-left" }
                );
            }
            else {
                if (messageParam) {
                    toast.error(messageParam,{position: "bottom-left"});
                }
                else {
                    toast.error("Invalid email or password.",{position: "bottom-left"});
                }
            }
        }

        if (authenticateParam === "false") {
            if (messageParam) {
                toast.error(messageParam,{position: "bottom-left"});
            }
            else {
                toast.error("Invalid email or password.",{position: "bottom-left"});
            }
        }
    }, [])

    const login = async (email) => {
        setIsLoading(true);
        try {
            if (email) {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/login`, { email, password }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.data) {
                    const { success, data, message } = await response.data;
                    if (success) {
                        dispatch(assignUser(data));
                    }
                    else {
                        toast.error(message,{position: "bottom-left"});
                    }
                }
            }
        } catch (err) {
            await signOut({ redirectTo: undefined });
            toast.error(err.errors ? err.errors[0].message : "Invalid email or password.",{position: "bottom-left"});
        }
        setIsLoading(false);
    }

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!isLoaded) return;

        try {
            const attempt = await signIn.create({
                identifier: email,
                password
            });

            if (attempt.status === "complete") {
                login(attempt?.identifier);
            }
        } catch (err) {
            await signOut({ redirectTo: undefined });
            if (err.message.includes("verification strategy is not valid")) {
                toast.error("This account requires social login or email verification.",{position: "bottom-left"});
            } else {
                toast.error(err.errors ? err.errors[0].message : "Invalid email or password.",{position: "bottom-left"});
            }
        }
        setIsLoading(false);
    };

    const handleGoogleSignin = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/signin?authenticate=true",
                redirectUrlComplete: "/signin?authenticate=true",
            });
        } catch (err) {
            await signOut({ redirectTo: undefined });
            window.location.href = `/signin?authenticate=false&&message=${err.errors ? err.errors[0].message : "Failed to login with google"}`;
        }
    };

    const handleMicrosoftSignin = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_microsoft",
                redirectUrl: "/signin?authenticate=true",
                redirectUrlComplete: "/signin?authenticate=true",
            });
        } catch (err) {
            await signOut({ redirectTo: undefined });
            window.location.href = `/signin?authenticate=false&&message=${err.errors ? err.errors[0].message : "Failed to login with microsoft"}`;
        }
    };

    const handleCaptchaChange = (value) => {
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
                    <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                        <div className="mb-4 text-start">
                            <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
                            <p className="text-sm text-gray-600">Stay updated on your professional world.</p>
                        </div>
                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <Input label="Email" value={email} setvalue={setEmail} type="email" placeholder="you@example.com" />
                            <Input label="Password" value={password} setvalue={setPassword} type="password" placeholder="Enter a Password" />
                            <Link to={"/forgot"} className="font-semibold text-[#0a66c2]">Forgot password?</Link>
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            {
                                captchaValue === null &&
                                <div className="flex flex-col justify-start items-start mt-4">
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
                                className={`${isLoading || !captchaValue ? "opacity-50 cursor-not-allowed" : ""} w-full bg-[#0a66c2] text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500`}
                            >
                                Login
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
                        <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn’s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
                        <button disabled={isLoading} type="button" onClick={handleGoogleSignin} className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} flex w-full mt-4 gap-1 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium`}>
                            <img src="/google.webp" className="w-6 h-6" alt="icon" />
                            Continue With Google
                        </button>
                        <button disabled={isLoading} type="button" onClick={handleMicrosoftSignin} className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} flex w-full mt-4 gap-2 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium`}>
                            <img src="/microsoft.png" className="w-6 h-6" alt="icon" />
                            Continue With Microsoft
                        </button>
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                New to LinkedIn?{" "}
                                <a href="/signup" className="text-blue-500 hover:underline">
                                    Join now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login