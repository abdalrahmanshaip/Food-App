import axios from "axios";
import logo from "../../../../assets/media/logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
export default function ForgetPass() {
  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/Users/Reset/Request`, data);
      toast.success(response.data.message, {
        position: "top-center",
      });

      navigate("/resetpass");
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
            <div className="col-md-8 col-lg-6 col-11 col-sm-10 bg-white border border-3 p-4 rounded-4">
              <div className="img-container text-center">
                <img src={logo} alt="" className=" w-50" />
              </div>
              <div className="form mb-3  ms-4 mt-5">
                <h3>Forgot Your Password</h3>
                <p className=" text-muted">
                  No Worries! Please enter your email and we will send a
                  password reset link
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-5 mt-5">
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
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <button className="btn btn-success w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
