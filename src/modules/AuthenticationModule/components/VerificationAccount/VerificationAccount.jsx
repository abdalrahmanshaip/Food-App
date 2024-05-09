import axios from "axios";
import logo from "../../../../../src/assets/media/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
export default function VerificationAccount() {
  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const respons = await axios.put(`${baseUrl}/Users/verify`, data);
      
      toast.success(respons.data.message, {
        position: "top-center",
      });
      navigate("/login");
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
            <div className="col-md-6 bg-white border border-3 p-4 rounded-4">
              <div className=" img-container">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form py-4 ms-4">
                <h3>Verification Account</h3>
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
                      type={"text"}
                      className={`form-control pointer-event`}
                      placeholder="code"
                      {...register("code", {
                        required: "code is required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <p className="alert alert-danger error-massage">
                      {errors.code.message}
                    </p>
                  )}
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
