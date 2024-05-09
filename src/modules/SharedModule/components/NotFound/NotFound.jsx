import logo from "../../../../assets/media/logo.png";
import notfound from "../../../../assets/media/not-found-bg.png";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"

export default function NotFound() {
  return (
    <>
      <div className="logo notfound">
        <img
          src={logo}
          alt=""
          width={366}
          className=" position-absolute mt-5 ms-5"
        />
        <div className=" d-flex justify-content-center align-items-center ">
          <div className=" ms-5 position-absolute start-0">
            <h1>Oops.</h1>
            <h2 className=" text-success fs-2">Page not found</h2>
            <p className=" ">
              This Page doesn't exist or was removed! We suggest you back to
              home.
            </p>
            <button className="btn btn-success w-75 d-flex justify-content-center align-items-center position-relative">
              <Link
                to={"/dashboard"}
                className=" text-white text-decoration-none"
              >
                <h6 className="mb-0">Back to</h6>
              <i className={`fa-solid fa-arrow-left ${styles.icon}`}></i>
                <p className="mt-0 mb-0">home</p>
              </Link>
            </button>
          </div>
          <div className={`img-notfound text-end w-100`}>
            <img src={notfound} alt="" width={1258} height={994} className={`${styles.notfound}`}/>
          </div>
        </div>
      </div>
    </>
  );
}
