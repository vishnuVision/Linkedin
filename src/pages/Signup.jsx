import { Link } from "react-router-dom"
import { SignUp } from "@clerk/clerk-react";

function Signup() {
    return (
        <div className="bg-[#866f55] bg-opacity-10 w-screen h-screen flex flex-col justify-start p-2">
            <div className="flex justify-between py-4">
                <div className="px-12">
                    <Link className='flex gap-1 justify-center items-center font-bold text-[#0a66c2] text-4xl'>Linked<img src="/logo.png" alt="LinkedIn" className="w-9 h-9" /></Link>
                </div>
                <div></div>
            </div>
            <div className="mt-10">
                <div className="flex flex-col items-center justify-center">
                    <SignUp
                        afterSignUpUrl="/provideInformation"
                        signInUrl="/signin"
                    />
                </div>
            </div>
        </div>
    )
}

export default Signup