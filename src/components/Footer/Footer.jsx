import { Link } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-primary">TravelEase</h2>

          <p className="mt-4 text-gray-300 leading-7">
            TravelEase is a vehicle booking platform where users can easily
            rent cars, bikes, buses and other vehicles for comfortable and
            hassle-free trips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>

            <li>
              <Link to="/all-vehicles" className="link link-hover">
                All Vehicles
              </Link>
            </li>

            <li>
              <Link to="/add-vehicle" className="link link-hover">
                Add Vehicle
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Contact</h3>

          <p>Email: support@travelease.com</p>

          <p className="mt-2">Phone: +880 1234-567890</p>

          <p className="mt-2">Dhaka, Bangladesh</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-title">Follow Us</h3>

          <div className="flex gap-4 mt-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TravelEase. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;