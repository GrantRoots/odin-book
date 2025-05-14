import App from "./App";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Customize } from "./components/Customize/Customize";
import { CreatePost } from "./components/CreatePost/CreatePost";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "customize",
    element: <Customize />,
  },
  {
    path: "create",
    element: <CreatePost />,
  },
];

export default routes;
