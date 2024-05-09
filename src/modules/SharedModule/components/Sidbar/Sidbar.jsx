/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import toggler from "../../../../assets/media/3.png";
import ChangePass from "../../../AuthenticationModule/components/changepass/ChangePass";
import { AuthContext } from "../../../context/AuthContext";

export default function SidBar() {
  const {loginData} = useContext(AuthContext)
  // const [group, setGroup] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toogleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass logout={logout} />
        </Modal.Body>
      </Modal>

      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              icon={<img src={toggler} alt="" className="toggler-icon" />}
              onClick={toogleCollapsed}
              className=" mt-5 "
            ></MenuItem>
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
              className="mt-5"
            >
              Home
            </MenuItem>
            {loginData.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-solid fa-user-group"></i>}
                component={<Link to="/dashboard/user" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa-solid fa-utensils"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            {loginData.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-regular fa-calendar-days"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                Categories
              </MenuItem>
            ) : (
              <MenuItem
              icon={<i className="fa-regular fa-heart"></i>}
              component={<Link to="/dashboard/favorites" />}
            >
              Favorites
            </MenuItem>
            )}


            <MenuItem
              icon={<i className="fa-solid fa-unlock"></i>}
              onClick={handleShow}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={logout}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
