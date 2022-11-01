import 'antd/dist/antd.css';
import './stylesheets/custom.css'
import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from './components/api'
import Routes from './routes';
import { AuthenticationProvider } from './components/AuthProvider';

const App = () => {
  return (
    <BrowserRouter>
      {Routes}
    </BrowserRouter>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <ApiProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </ApiProvider>
  );
});