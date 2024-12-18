import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux"
import { assignUser } from "./redux/slices/authReducer";
import toast, { Toaster } from "react-hot-toast";

const RoutesPage = lazy(() => import('./RoutesPage'));
const Loader = lazy(() => import('./components/Loaders/Loader'));
const Notfound = lazy(() => import('./components/Notfound'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const LoadinData = lazy(() => import('./pages/LoadinData'));

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/getUserDetails`, { withCredentials: true });
      if (response.data) {
        const { success, data, message } = await response.data;
        if (success) {
          dispatch(assignUser(data));
        }
        else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<LoadinData isLoading={isLoading} />}>
            <Route path="/*" element={<RoutesPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </Router>
  )
}

export default App
