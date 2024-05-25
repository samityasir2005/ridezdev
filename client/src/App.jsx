import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
import { ToastContainer, toast } from "react-toastify";
import AboutUs from "./pages/AboutUs";

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
        element: <Register style={{ marginTop: "100px" }} />,
      },
      {
        path: "dashboard",
        element: <Dashboard style={{ marginTop: "56px" }} />,
      },
      {
        path: "logout",
        element: <Logout style={{ marginTop: "56px" }} />,
      },
      { path: "about", element: <AboutUs style={{ marginTop: "56px" }} /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
