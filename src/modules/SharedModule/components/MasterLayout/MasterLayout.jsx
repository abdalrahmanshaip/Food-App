import Navbar from "../Navbar/Navbar";
import SidBar from "../Sidbar/Sidbar";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SidBar  />
        </div>

        <div className="w-100 vh-100 overflow-y-auto">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
