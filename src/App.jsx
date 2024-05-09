import {
  Navigate,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import ChangePass from "./modules/AuthenticationModule/components/changepass/ChangePass";
import ForgetPass from "./modules/AuthenticationModule/components/forgetpass/ForgetPass";
import Login from "./modules/AuthenticationModule/components/login/Login";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ResetPass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import CategoriesList from "./modules/CategoriesModule/components/CategoriesList/CategoriesList";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/compeonets/RecipesList/RecipesList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import UserList from "./modules/UsersModule/components/UserList/UserList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import VerificationAccount from "./modules/AuthenticationModule/components/VerificationAccount/VerificationAccount";
import Favorites from "./modules/FavoritesModule/components/Favorites/Favorites";
import RecipesData from "./modules/RecipesModule/compeonets/RecipesData/RecipesData";
import ProdectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProdectedRoute";
import { useContext } from "react";
import { AuthContext } from "./modules/context/AuthContext";
function App() {
  const { loginData, saveLoginData } = useContext(AuthContext);

  let routes = createHashRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgotpass", element: <ForgetPass /> },
        { path: "changepass", element: <ChangePass /> },
        { path: "resetpass", element: <ResetPass /> },
        { path: "VerificationAccount", element: <VerificationAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProdectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProdectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "favorites", element: <Favorites /> },
        { path: "favorites/:id", element: <Favorites /> },
        {
          path: "recipesdata",
          element:
            loginData.userGroup == "SuperAdmin" ? (
              <RecipesData />
            ) : (
              <Navigate to={"/nofound"} />
            ),
        },
        {
          path: "recipesdata/:id",
          element:
            loginData.userGroup == "SuperAdmin" ? (
              <RecipesData />
            ) : (
              <Navigate to={"/nofound"} />
            ),
        },
        {
          path: "categories",
          element:
            loginData.userGroup == "SuperAdmin" ? (
              <CategoriesList />
            ) : (
              <Navigate to={"/nofound"} />
            ),
        },
        {
          path: "user",
          element:
            loginData.userGroup == "SuperAdmin" ? (
              <UserList />
            ) : (
              <Navigate to={"/nofound"} />
            ),
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
