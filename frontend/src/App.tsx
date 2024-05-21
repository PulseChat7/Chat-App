import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PickNamePage from "./pages/PickNamePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Layout from "./components/Layout";
import { AnimatePresence } from "framer-motion";
import SettingsPage from "./pages/SettingsPage";
import IndividualChatPage from "./pages/IndividualChatPage";

const App = () => {
  const location = useLocation();

  return (
    <div className="w-screen h-screen overflow-hidden bg-white dark:bg-dark text-black dark:text-white">
      <div className="w-full h-full overflow-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route element={<HomePage />} index />
              <Route element={<SettingsPage />} path="/settings" />
              <Route element={<IndividualChatPage />} path="/chats/:id" />
            </Route>
            <Route
              element={
                <ProtectedRoutes type="guest">
                  <LoginPage />
                </ProtectedRoutes>
              }
              path="/login"
            />
            <Route
              element={
                <ProtectedRoutes type="guest">
                  <SignUpPage />
                </ProtectedRoutes>
              }
              path="/signup"
            />
            <Route
              element={
                <ProtectedRoutes type="guest">
                  <PickNamePage />
                </ProtectedRoutes>
              }
              path="/pick-username"
            />
            <Route
              element={
                <ProtectedRoutes type="guest">
                  <ForgotPasswordPage />
                </ProtectedRoutes>
              }
              path="/forgot-password"
            />
            <Route
              element={
                <ProtectedRoutes type="guest">
                  <ResetPasswordPage />
                </ProtectedRoutes>
              }
              path="/reset-password/:token"
            />

            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </AnimatePresence>
        <ToastContainer
          stacked
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default App;
