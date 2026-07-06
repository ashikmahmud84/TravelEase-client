import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photo = form.photo.value.trim();

    // Password Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(password)) {
      return toast.error(
        "Password must contain at least one lowercase letter."
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      await createUser(email, password);

      await updateUserProfile(
        name,
        photo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`
      );

      toast.success("Registration Successful!");

      form.reset();

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-xl p-8 rounded-xl bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Register
      </h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full mb-4"
          required
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered w-full mb-4"
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL (Optional)"
          className="input input-bordered w-full mb-6"
        />

        <button className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;