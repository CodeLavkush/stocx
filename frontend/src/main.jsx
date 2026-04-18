import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from './pages/index.js';
import { Inventory, Summary, Profile, Register, Login, OTP } from "./components/index.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verification", element: <OTP /> },

      {
        path: "dashboard",
        element: <Dashboard />, // layout
        children: [
          { path: "profile", element: <Profile /> },
          { path: "summary", element: <Summary /> },
          { path: "inventory", element: <Inventory /> },
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
