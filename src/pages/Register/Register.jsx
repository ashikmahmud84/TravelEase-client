import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate(); // ✅ এখানে

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    createUser(email, password)
      .then(() => {
        return updateUserProfile(name, photo);
      })
      .then(() => {
        toast.success("Registration Successful");
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    // তোমার JSX আগের মতোই থাকবে
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;