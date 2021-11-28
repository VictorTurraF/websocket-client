import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";

import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles.css";

const Chat = React.lazy(() => import("./pages/Chat"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<Spinner className="mx-auto" />}>
          <AuthProvider>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/chat" component={Chat} />
          </AuthProvider>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
