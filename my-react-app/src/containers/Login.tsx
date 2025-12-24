import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand-title">ELITE CINEMA</h1>
        <p className="muted">Sign in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <button className="btn primary" type="submit">
            Sign In
          </button>
        </form>
         <div className="login-footer">
          <span className="muted">Back to</span>{" "}
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
