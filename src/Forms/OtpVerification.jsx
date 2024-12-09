import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import Input from '../components/Ui/Input'
import { useEffect, useState } from 'react';

function OtpVerification({ isOTP, setIsOTP, email }) {
    const [verifyEmail,setVerifyEmail] = useState("");
    useEffect(() => {
        if (email.length > 4) {
            setVerifyEmail(email.slice(0, 3) + "*".repeat(((email.split("@")[0].length) - 3)) + email.split("@")[1]);
        }
    }, [email])

    return (
        <Modal isOpen={isOTP} onClose={() => setIsOTP(false)} title={"Security Verification"}>
            <div className='space-y-1'>
                <p className='text-center text-xl font-semibold'>Two-Factor Verification</p>
                <p className='text-center text-gray-500'>Enter the verification code we sent to <br /> {verifyEmail}</p>
                <Input type='number' label={"Enter OTP"} />
            </div>
            <div className='flex flex-row-reverse mt-4'>
                <button onClick={() => setIsOTP(false)} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Submit</button>
            </div>
        </Modal>
    )
}

OtpVerification.propTypes = {
    isOTP: PropTypes.bool,
    setIsOTP: PropTypes.func,
    email: PropTypes.string
}

export default OtpVerification
