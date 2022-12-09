import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Trending from "./pages/Trending";
import "./App.css";
import AppBar from "./components/AppBar";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <AppBar />
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
