import logo from "../../../../assets/media/logo.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import { AuthContext } from "../../../context/AuthContext";

export default function Register() {
  const { baseUrl } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  const onSubmit = async (data) => {
    let registerData = appendToFormData(data);
    try {
      const respons = await axios.post(
        `${baseUrl}/Users/Register`,
        registerData
      );
      toast.success(respons.data.message, {
        position: "top-center",
      });
      navigate("/VerificationAccount");
    } catch (errors) {
      toast.error(`The username or email already exists go to login`, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6 col-11  col-sm-10 bg-white border border-3 p-4 rounded-4">
              <div className=" img-container">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form py-4 ms-4">
                <h3>Register</h3>
                <p className=" text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="row">
                  <div className="container col-md-6  left">
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UserName"
                        {...register("userName", {
                          required: "userName is required",
                          pattern: {
                            value: /^[a-zA-Z]{1,8}\d+$/,
                            message:
                              "userName less than 9 characters, and numbers without space",
                          },
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger error-massage">
                        {errors.userName.message}
                      </p>
                    )}
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock text-muted"></i>
                      </span>
                      <input
                        type={"text"}
                        className={`form-control pointer-event`}
                        placeholder="Country"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger error-massage">
                        {errors.country.message}
                      </p>
                    )}
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPass ? "text" : "password"}
                        className={`form-control pointer-event`}
                        placeholder="password"
                        {...register("password", {
                          required: "password is required",
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
                  </div>
                  <div className="col-md-6 right">
                    <div className="input-group mb-2">
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
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen text-muted"></i>
                      </span>
                      <input
                        type={"number"}
                        className={`form-control pointer-event`}
                        placeholder="phoneNumber"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                          pattern: {
                            value: /^\d{11}$/,
                            message: "Pleas inter a valied mobile number",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="alert alert-danger error-massage">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen text-muted"></i>
                      </span>
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        className={`form-control pointer-event`}
                        placeholder="confirmPassword"
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
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                      >
                        {showConfirmPass ? (
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
                  </div>
                  <div className="input-group mb-4 position-relative">
                    <label htmlFor="inputTag" className={`${styles.label}`}>
                      <i
                        className={`fa-solid fa-upload ${styles.iconupload}`}
                      ></i>
                      <p className=" fw-bold mt-5">
                        Drag & Drop or
                        <span className="text-success">
                          Choose a Item Image
                        </span>
                        to Upload
                      </p>
                      <input
                        id="inputTag"
                        type="file"
                        {...register("profileImage", {
                          required: "profileImage is required",
                        })}
                      />
                    </label>
                  </div>
                  {errors.profileImage && (
                    <p className="alert alert-danger error-massage">
                      {errors.profileImage.message}
                    </p>
                  )}
                  <div className="link text-end mb-4">
                    <Link
                      to={"/login"}
                      className=" text-success text-decoration-none"
                    >
                      Login now
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
