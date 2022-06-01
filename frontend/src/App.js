import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import "./App.css";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  if (isAuth) {
    return <Navigate {...rest} to="/rooms" state={{ from: window.location }} />;
  } else {
    return children;
  }
};

const SemiProtectedRoute = ({ children, ...rest }) => {
  if (!isAuth) {
    return <Navigate {...rest} to="/" state={{ from: window.location }} />;
  } else if (isAuth && !user.activated) {
    return children;
  } else {
    return <Navigate {...rest} to="/rooms" state={{ from: window.location }} />;
  }
};

const ProtectedRoute = ({ children, ...rest }) => {
  if (!isAuth) {
    return <Navigate {...rest} to="/" state={{ from: window.location }} />;
  } else if (isAuth && !user.activated) {
    return (
      <Navigate {...rest} to="/activate" state={{ from: window.location }} />
    );
  } else {
    return children;
  }
};

export default App;
