import Signin from "./components/Authentication/Signin";
import Signup from "./components/Authentication/Signup";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Trending from "./pages/Trending/Trending";
import Favourite from "./pages/Favourite/Favourite";
import "./App.css";
import AppBar from "./components/AppBar";
import Movies from "./pages/Movies/Movies";
import Search from "./pages/Search/Search";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <AppBar />
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourite"
            element={
              <ProtectedRoute>
                <Favourite />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
