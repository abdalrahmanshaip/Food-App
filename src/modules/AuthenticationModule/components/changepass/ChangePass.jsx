import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../../assets/media/logo.png";
import { AuthContext } from "../../../context/AuthContext";
// eslint-disable-next-line react/prop-types
export default function ChangePass({ logout }) {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      
      const response = await axios.put(
        `${baseUrl}/Users/ChangePassword`,
        data,
        {
          headers: {
            requestHeaders,
          },
        }
      );
      toast.success(response.data.message);
      reset();
      logout();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className="container h-auto text-center">
      <img src={logo} alt="" width={360} className="text-center" />
      <div className="title text-start w-100">
        <h3 className="">Change Your password</h3>
        <p className=" text-muted">Enter your details below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={showOldPass ? "text" : "password"}
            className="form-control p-3 bg-light z-0"
            placeholder="oldPassword"
            {...register("oldPassword", {
              required: "oldPassword is required",
              validate: (value) => {
                const { newPassword, confirmNewPassword } = getValues();
                return (
                  (newPassword !== value && confirmNewPassword !== value) ||
                  "change to new password"
                );
              },
            })}
          />
          <div
            className=" position-absolute end-0 me-3 mt-3"
            onClick={() => setShowOldPass(!showOldPass)}
          >
            {showOldPass ? (
              <i className=" show-pass fa-solid fa-eye z-3"></i>
            ) : (
              <i className=" show-pass fa-solid fa-eye-slash z-3"></i>
            )}
          </div>
        </div>
        {errors.oldPassword && (
          <p className="alert alert-danger error-massage">
            {errors.oldPassword.message}
          </p>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock text-muted"></i>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control z-0 p-3 bg-light`}
            placeholder="New Password"
            {...register("newPassword", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
                message:
                  "The passord must inclde at least one lowercase letter, one appercase, one secial chractor, one digit, At least one special character ",
              },
            })}
          />
          <div
            className=" position-absolute end-0  me-3 mt-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className=" show-pass fa-solid fa-eye z-3"></i>
            ) : (
              <i className=" show-pass fa-solid fa-eye-slash z-3"></i>
            )}
          </div>
        </div>
        {errors.newPassword && (
          <p className="alert alert-danger error-massage">
            {errors.newPassword.message}
          </p>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`form-control z-0 p-3 bg-light`}
            placeholder="Confirm New Password"
            {...register("confirmNewPassword", {
              required: "confirmPassword is required",
              validate: (value) => {
                const { newPassword } = getValues();
                return (
                  newPassword === value ||
                  "Confirm passwords should match password!"
                );
              },
            })}
          />
          <div
            className="position-absolute end-0  me-3 mt-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <i className=" show-pass fa-solid fa-eye z-3"></i>
            ) : (
              <i className=" show-pass fa-solid fa-eye-slash z-3"></i>
            )}
          </div>
        </div>
        {errors.confirmNewPassword && (
          <p className="alert alert-danger error-massage">
            {errors.confirmNewPassword.message}
          </p>
        )}

        <button className="btn btn-success d-block w-100 my-4">Submit</button>
      </form>
    </div>
  );
}
