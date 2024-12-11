import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react'
import Loader from './components/Loaders/Loader.jsx';
import { Provider } from "react-redux";
import store from './redux/store/store.js';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <App />
      </ClerkLoaded>
    </ClerkProvider>
  </Provider>,
)
