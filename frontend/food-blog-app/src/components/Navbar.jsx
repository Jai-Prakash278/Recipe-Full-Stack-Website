import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Food Blog
        </Link>

        {/* Center: Navigation Links */}
        <ul className="flex justify-center space-x-10 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>
          </li>

          {/* Recipes visible to everyone */}
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }
            >
              Recipes
            </NavLink>
          </li>

          {/* Favourite visible only when logged in */}
          {token && (
            <li>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }
              >
                Favourite
              </NavLink>
            </li>
          )}

          {/* Host-only */}
          {role === "host" && (
            <li>
              <NavLink
                to="/myRecipe"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }
              >
                My Recipe
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right: Auth Button */}
        <div className="flex justify-end">
          {!token ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
