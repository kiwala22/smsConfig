import * as React from "react";
import { Routes, Route } from "react-router-dom";
const Login = React.lazy(() => import('./pages/login'));
const Root = React.lazy(() => import('./pages/index'));
const Loading = () => <p>Loading ...</p>;

export default (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Root />}></Route>
    </Routes>
  </React.Suspense>
)