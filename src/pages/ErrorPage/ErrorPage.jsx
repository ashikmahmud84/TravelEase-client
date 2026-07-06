import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl font-extrabold text-primary">404</h1>

        <h2 className="text-4xl font-bold mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            🏠 Back to Home
          </Link>

          <Link to="/all-vehicles" className="btn btn-outline">
            🚗 Browse Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;