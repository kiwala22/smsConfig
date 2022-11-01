import 'antd/dist/antd.css';
import './stylesheets/custom.css'
import React, { useState, createContext, useEffect, useContext } from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from './components/api'
import Routes from './routes';
import { useHttpRequest } from './components/api';

interface UserContextInterface {
  user: string;
  message: string;
}

export const UserContext = createContext<UserContextInterface | null>(null);

const App = () => {
  const sampleContext: UserContextInterface = {
    user: "",
    message: ""
  };
  const http = useHttpRequest();
  const [user, setUser] = useState(sampleContext);

  useEffect(() => checkUserSession(), []);

  const checkUserSession = () => {
    http.get("/api/v2/check_user").then((response) => {
      setUser(response);
    }).catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </UserContext.Provider>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <ApiProvider>
      <App />
    </ApiProvider>
  );
});