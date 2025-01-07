import { createContext, lazy, Suspense, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify';
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";

const RoutesPage = lazy(() => import('./RoutesPage'));
const Loader = lazy(() => import('./components/Loaders/Loader'));
const Notfound = lazy(() => import('./components/Notfound'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const LoadinData = lazy(() => import('./pages/LoadinData'));

export const sampleContext = createContext({});

function App() {
  const { isLoading } = useSelector(state => state.stateReducer);
  const [page, setPage] = useState(1);

  return (
    <sampleContext.Provider value={{ page, setPage }}>
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
          <ToastContainer />
        </Suspense>
      </Router>
    </sampleContext.Provider>
  )
}

export default App
