import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";

const RoutesPage = lazy(() => import('./RoutesPage'));
const Loader = lazy(() => import('./components/Loaders/Loader'));
const Notfound = lazy(() => import('./components/Notfound'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const LoadinData = lazy(() => import('./pages/LoadinData'));

function App() {
  const { isLoading } = useSelector(state => state.stateReducer);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<LoadinData isLoading={isLoading} />}>
            <Route path="/*" element={<RoutesPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </Router>
  )
}

export default App
