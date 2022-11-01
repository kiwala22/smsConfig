import * as React from "react";
import { Routes, Route } from "react-router-dom";
import GuestGuard from "./components/GuestGuard";
import AuthGuard from "./components/AuthGuard";
const Login = React.lazy(() => import("./pages/login"));
const Root = React.lazy(() => import("./pages/index"));

const Loading = () => <p>Loading ...</p>;

export default (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      ></Route>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Root />
          </AuthGuard>
        }
      />
    </Routes>
  </React.Suspense>
);
