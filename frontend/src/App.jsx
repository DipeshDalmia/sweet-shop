import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      {/* Full app background */}
      <div className="min-h-screen bg-gray-100">
        
        {/* Navbar always on top */}
        <Navbar />

        {/* Page content */}
        <div className="pt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
