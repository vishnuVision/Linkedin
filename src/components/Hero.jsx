import { useSignIn, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assignUser } from "../redux/slices/authReducer";

export default function Hero() {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {search} = useLocation();
  const { user } = useUser();
  const { user: userData } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.replace("?", "").split("=")[1] === "true") {
      login(user.emailAddresses[0].emailAddress)
    }
  }, [])

  useEffect(() => {
    if (user?.emailAddresses[0]?.emailAddress && !userData) {
      navigate("/signup")
    }
  }, [user])

  const login = async (email) => {
    setIsLoading(true);
    try {
      if (email) {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/login`, { email }, {
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
            toast.error(message);
          }
        }
      }
    } catch (err) {
      setError(err.errors ? err.errors[0].message : "Failed to sign in");
    }
    setIsLoading(false);
  }

  const handleGoogleSignin = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/?authenticate=true",
        redirectUrlComplete: "/?authenticate=true",
      });
    } catch (err) {
      window.location.href = "/?authenticate=false";
      setError(err.errors ? err.errors[0].message : "Failed to sign in with Google");
    }
  };

  const handleMicrosoftSignin = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_microsoft",
        redirectUrl: "/?authenticate=true",
        redirectUrlComplete: "/?authenticate=true",
      });
    } catch (err) {
      window.location.href = "/?authenticate=false";
      setError(err.errors ? err.errors[0].message : "Failed to sign in with Microsoft");
    }
  };

  return (
    <div className="bg-linkedin-gray pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <h1 className="text-5xl text-center md:text-start font-normal leading-tight text-[#526a6e]">
              Welcome to your professional community
            </h1>
            <div className="space-y-2 flex flex-col justify-center items-center md:justify-start md:items-start">
              <div className="w-10/12 flex flex-col justify-center items-center gap-2">
                <button disabled={isLoading} type="button" onClick={handleGoogleSignin} className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} flex w-full bg-[#0a66c2] gap-2 text-white justify-center items-center py-2 text-left border rounded-full hover:bg-blue-600 font-medium`}>
                  <img src="/google.webp" className="w-8 h-8 bg-white rounded-full" alt="icon" />
                  Continue With Google
                </button>
                <button disabled={isLoading} type="button" onClick={handleMicrosoftSignin} className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} flex w-full gap-2 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium`}>
                  <img src="/microsoft.png" className="w-6 h-6" alt="icon" />
                  Continue With Microsoft
                </button>
                <Link to={isLoading ? "#" : "/signin"} className={`${isLoading ? "disabled-link opacity-50 cursor-not-allowed flex w-full justify-center items-center py-2 border rounded-full" : "flex w-full gap-1 justify-center items-center py-2 text-left border rounded-full hover:bg-gray-100 font-medium"}`}>
                  Sign in With email
                </Link>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <p className="break-words text-sm text-center mt-2 px-4">By clicking Continue to join or sign in, you agree to LinkedIn’s <span className="text-[#0a66c2] font-semibold">User Agreement, Privacy Policy,</span> and <span className="text-[#0a66c2] font-semibold">Cookie Policy.</span></p>
                <div className="flex justify-center items-center mt-4">
                  <p>New to Linkedin? <Link to={"/signup"} className="no-underline text-[#0a66c2] font-semibold text-lg hover:underline hover:text-blue-900">Join now</Link></p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src="/hero.png"
              alt="Professional community"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}