import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Private Route থেকে আসলে আগের Page-এ ফিরে যাবে
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

      toast.success("Login Successful");

      form.reset();

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();

      toast.success("Google Login Successful");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 shadow-xl rounded-xl bg-base-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-2"
          required
        />

        <div className="text-right mb-4">
          <button
            type="button"
            className="text-primary hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <p className="text-center mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;