import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./Common/Constants/theme";
import { UnauthApp } from "./Modules/Auth/UnauthApp";
import { PageNotFound } from "./Modules/Layout/PageNotFound";
import { AuthApp } from "./Modules/Layout/AuthApp";
import { LoginPage } from "./Modules/Auth/LoginPage";
import { RegisterForm } from "./Modules/Auth/Register/RegisterForm";
import { ForgotPasswordEmail } from "./Modules/Auth/ForgotPasswordEmail";
import { ClientList } from "./Modules/Clients/ClientList";
import { Reports } from "./Modules/Reports/Reports";
import { localStorageName } from "./Common/Constants/names";
import { store } from "./Config/Redux/core";
import { Accounts } from "./Modules/Accounts/Accounts";
import { Discussions } from "./Modules/Discussions/Discussions";
import { Settings } from "./Modules/Settings/Settings";
import { Logout } from "./Modules/Layout/Logout";
import { notification } from "antd";
import { themeColors } from "./themeColors";
import { ForgotPassword } from "./Modules/Auth/ForgotPassword";
import { ForgotPasswordEmailConfirmed } from "./Modules/Auth/ForgotPasswordEmailConfirmed";

interface NotificationProps {
  icon?: any;
  message: string;
  customClass?: string;
  type?: "error" | "info";
}
export const openAppNotification = (props: NotificationProps) => {
  const notificationStyle = {
    padding: "9px 16px",
    width: "500px",
    minHeight: "40px",
    background: themeColors.red1,
    border: "1px solid " + themeColors.red3,
    borderRadius: "2px",

    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    color: themeColors.gray8,
  };
  const infoStyle = {
    padding: "9px 16px",
    width: "500px",
    minHeight: "40px",
    background: themeColors.green1,
    border: "1px solid " + themeColors.green3,
    borderRadius: "2px",

    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    color: themeColors.green6,
  };
  const currentStyle = props.type === "info" ? infoStyle : notificationStyle;
  notification.open({
    icon: props.icon,
    message: props.message,
    className: props.customClass,
    duration: 0,
    style: currentStyle,
  });
};

function App() {
  useEffect(() => {
    return () => {
      window.onbeforeunload = () => {
        localStorage.setItem(
          localStorageName,
          JSON.stringify(store.getState())
        );
      };
    };
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<AuthApp />}>
            <Route path="/clients" element={<ClientList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/unauth" element={<UnauthApp />}>
            <Route path="/unauth/login" element={<LoginPage />} />
            <Route path="/unauth/register" element={<RegisterForm />} />
            <Route
              path="/unauth/recover-pass-email"
              element={<ForgotPasswordEmail />}
            />
            <Route
              path="/unauth/recover-pass-email-confirmed"
              element={<ForgotPasswordEmailConfirmed />}
            />
            <Route path="/unauth/recover-pass" element={<ForgotPassword />} />
            <Route
              path="/unauth/recover-pass/:email"
              element={<ForgotPassword />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
