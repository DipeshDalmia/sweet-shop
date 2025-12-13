import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Sweet Shop 🍭</h1>

      <div className="space-x-4 flex items-center">
        {token ? (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            {role === "admin" && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;