import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../Forgotpassword";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import TodoLayout from "../layouts/mainlayout/TodoLayout";
import WelcomePage from "../welcomepage";
import Location from "../Location";
import React from "react";


const Loadable = (Component) => (props) => {
  console.log("🚀 => props", props);
  console.log("🚀 => Component", Component);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { pathname } = useLocation();
  // console.log('🚀 => pathname', pathname);
  //   const isTodoPage = pathname.includes('/todo');

  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return (
    
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/location" element={<Location />} />

      <Route path="/weather" element={<TodoLayout />}>
        <Route
          path="/weather/"
          element={
            <ProtectedRoutes>
              <TodoList />
            </ProtectedRoutes>
          }
        />
       
        <Route path="*" element={<PageNotFound />} />
      </Route>

      <Route path="/servererror" element={<ServerError />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const PageNotFound = Loadable(lazy(() => import("../pages/errors/NotFound")));
const ServerError = Loadable(lazy(() => import("../pages/errors/ServerError")));
const TodoList = Loadable(lazy(() => import("../pages/main/Weather")));

