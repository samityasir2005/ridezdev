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
import AboutUs from "./pages/AboutUs";
import CreatePost from "./pages/CreatePost"; // Import your CreatePost component
import { UserProvider } from "./usercontext/UserContext";

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
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "createpost",
        element: <CreatePost />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <Header />
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </UserProvider>
  );
}

export default App;
