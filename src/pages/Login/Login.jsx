import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);

        toast.success("Login Successful");
        
        navigate("/");

        form.reset();
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        toast.success("Google Login Successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

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
          className="input input-bordered w-full mb-4"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
        <FaGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
