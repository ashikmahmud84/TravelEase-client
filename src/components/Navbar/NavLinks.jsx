import { NavLink } from "react-router";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-primary font-bold"
    : "hover:text-primary transition duration-200";

const NavLinks = () => {
  return (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-vehicles" className={navLinkClass}>
          All Vehicles
        </NavLink>
      </li>

      <li>
        <NavLink to="/add-vehicle" className={navLinkClass}>
          Add Vehicle
        </NavLink>
      </li>

      
    </>
  );
};

export default NavLinks;