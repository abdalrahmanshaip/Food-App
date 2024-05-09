import axios from "axios";
import logo from "../../../../../src/assets/media/logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
// eslint-disable-next-line react/prop-types
export default function Login({ saveLoginData }) {
  const {baseUrl} = useContext(AuthContext)
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const respons = await axios.post(
        `${baseUrl}/Users/Login`,
        data
      );
      toast.success("login", {
        position: "top-center",
      });
      navigate("/dashboard");
      localStorage.setItem("token", respons.data.token);
      saveLoginData();
    } catch (errors) {
      toast.error(errors.response.data.message, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6  col-sm-10 bg-white border border-3 p-4 rounded-4">
              <div className=" img-container">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form py-4 ms-4">
                <h3>Log In</h3>
                <p className=" text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-4">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-mobile-screen text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invald Email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger error-massage">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock text-muted"></i>
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      className={`form-control pointer-event`}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <div className="" onClick={() => setShowPass(!showPass)}>
                      {showPass ? (
                        <i className=" show-pass fa-solid fa-eye"></i>
                      ) : (
                        <i className=" show-pass fa-solid fa-eye-slash"></i>
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger error-massage">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="link d-flex justify-content-between mb-4">
                    <Link
                      to={"/register"}
                      className=" text-success text-decoration-none"
                    >
                      Register Now?
                    </Link>
                    <Link
                      to={"/forgotpass"}
                      className=" text-success text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="btn btn-success w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
