import logo from "../../../../assets/media/logo.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
export default function ResetPass() {
  const { baseUrl } = useContext(AuthContext);
  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    
    try {
      const response = await axios.post(`${baseUrl}/Users/Reset`, data);
      
      toast.success(response.data.message, {
        position: "top-center",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, {
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
              <div className="img-container text-center">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form py-4 mt-4 ms-4 ">
                <h3>Reset Password</h3>
                <p className=" text-muted">
                  Please Enter Your Otp or Check Your Inbox
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-4">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope text-muted"></i>
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
                      type={"seed"}
                      className={`form-control`}
                      placeholder="OTP"
                      {...register("seed", {
                        required: "Check otp on your Email",
                      })}
                    />
                  </div>
                  {errors.seed && (
                    <p className="alert alert-danger error-massage">
                      {errors.seed.message}
                    </p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock text-muted"></i>
                    </span>
                    <input
                      type={showPassOne ? "text" : "password"}
                      className={`form-control`}
                      placeholder="New Password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
                          message:
                            "The passord must inclde at least one lowercase letter, one appercase, one secial chractor",
                        },
                      })}
                    />
                    <div
                      className=""
                      onClick={() => setShowPassOne(!showPassOne)}
                    >
                      {showPassOne ? (
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
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text text-muted"
                      id="basic-addon1"
                    >
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showPassTwo ? "text" : "password"}
                      className={`form-control`}
                      placeholder="Confirm New Password"
                      {...register("confirmPassword", {
                        required: "confirmPassword is required",
                        validate: (value) => {
                          const { password } = getValues();
                          return (
                            password === value ||
                            "Confirm passwords should match password!"
                          );
                        },
                      })}
                    />
                    <div
                      className=""
                      onClick={() => setShowPassTwo(!showPassTwo)}
                    >
                      {showPassTwo ? (
                        <i className=" show-pass fa-solid fa-eye"></i>
                      ) : (
                        <i className=" show-pass fa-solid fa-eye-slash"></i>
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="alert alert-danger error-massage">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button className="btn btn-success w-100">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
