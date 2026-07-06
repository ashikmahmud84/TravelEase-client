import { Link, NavLink } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[1]"
          >
            <NavLinks />
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold text-primary">
          TravelEase
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                className="w-10 rounded-full tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60"
            >
              <li className="menu-title">
                <span>{user.displayName || "User"}</span>
              </li>

              <li>
                <span className="text-xs break-all">
                  {user.email}
                </span>
              </li>

              <div className="divider my-1"></div>

              <li>
                <NavLink to="/my-vehicles">
                  My Vehicles
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-bookings">
                  My Bookings
                </NavLink>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-primary"
                  : "btn btn-outline"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-primary"
                  : "btn btn-outline"
              }
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;