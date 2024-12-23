import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { assignUser } from "./redux/slices/authReducer";
import { Toaster } from "react-hot-toast";
import useApi from "./hook/useApi";

const RoutesPage = lazy(() => import('./RoutesPage'));
const Loader = lazy(() => import('./components/Loaders/Loader'));
const Notfound = lazy(() => import('./components/Notfound'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const LoadinData = lazy(() => import('./pages/LoadinData'));

function App() {
  const dispatch = useDispatch();
  const { apiAction } = useApi();
  const { isLoading } = useSelector(state => state.stateReducer);

  const getUserDetails = async () => {
      const {success, data} = await apiAction({
        url: "/api/v1/getUserDetails",
        method: "get",
        message: "Fetched user details",
      });

      if(success){
        dispatch(assignUser(data));
      }
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
