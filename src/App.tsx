import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./Common/Constants/theme";
import { UnauthApp } from "./Modules/Auth/UnauthApp";
import { PageNotFound } from "./Modules/Layout/PageNotFound";
import { AuthApp } from "./Modules/Layout/AuthApp";
import { LoginPage } from "./Modules/Auth/LoginPage";
import { RegisterForm } from "./Modules/Auth/Register/RegisterForm";
import { ForgotPassword } from "./Modules/Auth/ForgotPassword";
import { ClientList } from "./Modules/Clients/ClientList";
import { ReportsAll } from "./Modules/Reports/ReportsAll";
import { localStorageName } from "./Common/Constants/names";
import { store } from "./Config/Redux/core";
import { Accounts } from "./Modules/Accounts/Accounts";
import { Discussions } from "./Modules/Discussions/Discussions";
import { Settings } from "./Modules/Settings/Settings";

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
            <Route path="/reports" element={<ReportsAll />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/unauth" element={<UnauthApp />}>
            <Route path="/unauth/login" element={<LoginPage />} />
            <Route path="/unauth/register" element={<RegisterForm />} />
            <Route path="/unauth/recover-pass" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
