import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import Routes from './routes/index';

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
  root.render(<App />);
});