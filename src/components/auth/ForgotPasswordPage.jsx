import { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const { isSignedIn, signOut } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    navigate("/");
  }

  async function create(e) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
    await signOut();
  }

  async function reset(e) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          setError('')
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
    await signOut();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#866f55] bg-opacity-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password?</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation ? (
            <>
              <label
                htmlFor="email"
                className="text-gray-600 font-medium"
              >
                Provide your email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g. john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Password Reset Code
              </button>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </>
          ) : (
            <>
              <label
                htmlFor="password"
                className="text-gray-600 font-medium"
              >
                Enter your new password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label
                htmlFor="code"
                className="text-gray-600 font-medium"
              >
                Enter the password reset code that was sent to your email
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
              >
                Reset Password
              </button>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </>
          )}

          {secondFactor && (
            <p className="text-yellow-600 text-sm text-center mt-4">
              2FA is required, but this UI does not handle that
            </p>
          )}
        </form>
      </div>
    </div>

  )
}

export default ForgotPasswordPage