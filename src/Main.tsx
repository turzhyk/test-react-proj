import { useContext } from "react";
import "./index.css";

import { AuthContext } from "./AuthContext/AuthContext";
import { auth } from "./firebaseSetup";
import firebase from "firebase/compat/app";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Events } from "./pages/Events";
import { Account } from "./pages/Account";
import { LoginWarning } from "./pages/LoginWarning";
import { Login } from "./pages/LogIn";
import { Roles } from "./pages/Roles";
import { Page404 } from "./pages/404/Page404";

function Main() {
  const user = useContext(AuthContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // alert(`The name you entered was: ${email}`);
  };

  const logIn = async (event: any) => {
    try {
      await auth.signInWithEmailAndPassword("email", "pwd");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    await auth.signOut();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
        
      />
      <Route path='*' element={<Page404 />}/>
      <Route
        path="/sign_in"
        element={
          <>
            <Header />
            <SignIn />
          </>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/users"
        element={
          <>
            <Header />
            <News />
          </>
        }
      />
      <Route
        path="/events"
        element={
          <>
            <Header />
            <Events />
          </>
        }
      />
      <Route
        path="/my-account"
        element={
          <>
            <Header />
            {auth.currentUser == null ? <></> : <Account />}
          </>
        }
      />
      <Route
        path="/roles"
        element={
          <>
            <Header />
            <Roles />
          </>
        }
      />
      <Route
        path="/account/:params"
        element={
          <>
            <Header />
            <Account />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Header />
            {auth.currentUser == null ? <Login /> : <Login />}
          </>
        }
      />
    </Routes>
  );
}

export default Main;
