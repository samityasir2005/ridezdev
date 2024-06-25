// src/App.jsx
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
import FAQ from "./pages/Faq";
import CreatePost from "./pages/CreatePost";
import RidePosts from "./pages/RidePosts";
import { UserProvider } from "./usercontext/UserContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import EmailVerification from "./components/EmailVerification";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout style={{ marginTop: "90px" }} />,
    children: [
      {
        index: true,
        element: <Landing style={{ marginTop: "56px" }} />,
      },
      {
        path: "login",
        element: <Login style={{ marginTop: "90px" }} />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "createpost",
        element: <CreatePost />,
      },
      {
        path: "rideposts",
        element: <RidePosts />,
      },
      {
        path: "verify-email/:token",
        element: <EmailVerification />,
      },
    ],
  },
]);

function App() {
  return (
    <ProSidebarProvider>
      <UserProvider>
        <Header />
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </UserProvider>
    </ProSidebarProvider>
  );
}

export default App;
