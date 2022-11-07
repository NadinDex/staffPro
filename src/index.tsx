import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Config/Redux/core";
import { ConfigProvider } from "antd";
import ruRU from "antd/es/locale/ru_RU";
import { IntlProvider } from "react-intl";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <IntlProvider locale="en" defaultLocale="ru">
      <Provider store={store}>
        <ConfigProvider locale={ruRU}>
          <App />
        </ConfigProvider>
      </Provider>
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
