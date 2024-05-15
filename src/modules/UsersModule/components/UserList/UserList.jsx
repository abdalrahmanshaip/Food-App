import { useContext, useEffect, useState } from "react";
import recipesavatar from "../../../../assets/media/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import imgNodata from "../../../../assets/media/no-data.png";
import DeleteItem from "../../../SharedModule/components/DeleteItem/DeleteItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

export default function UserList() {
  const { baseUrl, requestHeaders, loginData } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [catId, setCatId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [nameValue, setNamevalue] = useState("");
  const [groupsValue, setGoundValue] = useState("");
  const [arrayOfPage, setArrayOfPage] = useState([]);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setShowDelete(true);
  };

  const getUsers = async (userName, groups, pageSize, pageNumber) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?groups=${groups}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            userName: userName,
          },
        }
      );

      setArrayOfPage(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => ++i)
      );

      setUserList(response.data.data);
    } catch (error) {}
  };
  const hadnleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/Users/${catId}`, {
        headers: requestHeaders,
      });
      handleDeleteClose();
      toast.error("The Recipe has been deleted");
      getUsers();
    } catch (error) {}
  };
  const getNameValue = (input) => {
    setNamevalue(input);
    getUsers(input, "", "", "");
  };

  const getAdminAccount = (input) => {
    setGoundValue(input.target.value);
    getUsers(nameValue, input.target.value);
  };
  useEffect(() => {
    getUsers("", "", 15, 1);
  }, []);
  return (
    <>
      <div>
        <Header
          title={"User"}
          sectitle={"List"}
          description={
            "You can now add your items that any user can order it from the Application and you can edit"
          }
          imgurl={recipesavatar}
        />
      </div>
      <div className="container-fluid p-5 col-lg-11 col-md-10 col-sm-10">
        <div className="row ">
          <div className="col-md-6">
            <h4>Users Table Details</h4>
            <p>You can check all details</p>
          </div>
        </div>
      </div>
      <Modal
        show={showDelete}
        onHide={handleDeleteClose}
        className=" col-md-8 col-sm-2"
      >
        <Modal.Header closeButton className=" border-0"></Modal.Header>
        <Modal.Body>
          <DeleteItem name={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" text-bg-danger border-danger"
            onClick={hadnleDeleteSubmit}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="filtertion px-5 mb-4 ">
        <div className="row">
          <div className="col-md-8 position-relative">
            <i className="fa-solid fa-magnifying-glass position-absolute  mt-3 ms-3 text-muted"></i>
            <input
              type="text"
              placeholder="serach here..."
              className=" form-control ps-5 py-2 mb-sm-0 mb-3"
              onChange={(e) => getNameValue(e.target.value)}
            />
          </div>
          <div className="col-md-4 position-relative">
            <select
              className="form-control ps-4 py-2 "
              aria-label="Default select example"
              onChange={getAdminAccount}
            >
              <option selected className="" value={1}>
                All Users
              </option>
              <option className="" value={1}>
                SuperAdmin
              </option>
              <option className="" value={2}>
                SystemUser
              </option>
            </select>
            <i className="fa-solid fa-angle-down position-absolute top-0 end-0 me-4 mt-3"></i>
          </div>
        </div>
      </div>
      <table className=" text-center table">
        <thead>
          <tr className=" table-secondary ">
            <th scope="col" className="p-4 rounded-start-3">
              Name
            </th>
            <th scope="col" className="p-4">
              Image
            </th>
            <th scope="col" className="p-4">
              Country
            </th>
            <th scope="col" className="p-4">
              Email
            </th>
            <th scope="col" className="p-4">
              Number
            </th>
            <th scope="col" className="p-4">
              UserType
            </th>
            <th scope="col" className=" rounded-end-3 p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {userList.length > 0 ? (
            userList.map((item, index) => (
              <>
                <tr
                  key={item}
                  className={`${
                    index % 2 !== 0 ? "bg-light" : "bg-transparent"
                  } m-5 position-relative`}
                >
                  <td className="pt-4 " scope="row">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Name:{" "}
                    </p>
                    {item.userName}
                  </td>
                  {item.imagePath ? (
                    <td className="pt-2">
                      <p className=" position-absolute d-lg-none d-sm-block">
                        Image:{" "}
                      </p>
                      <img
                        src={
                          `https://upskilling-egypt.com:3006/` + item.imagePath
                        }
                        width={66}
                        height={66}
                        className=" rounded-3 "
                        alt="imgrec"
                      />
                    </td>
                  ) : (
                    <td className="pt-2">
                      <p className=" position-absolute d-lg-none d-sm-block">
                        Image:{" "}
                      </p>
                      <img
                        src={imgNodata}
                        alt="noimg"
                        className=" rounded-3 "
                        width={66}
                        height={66}
                      />
                    </td>
                  )}

                  <td className="pt-4">
                    {" "}
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Country:{" "}
                    </p>
                    {item.country}
                  </td>
                  <td className="pt-4">
                    {" "}
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Email:{" "}
                    </p>
                    {item.email}
                  </td>
                  <td className="pt-4">
                    {" "}
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Number:{" "}
                    </p>
                    {item.phoneNumber}
                  </td>
                  <td className="pt-4">
                    {" "}
                    <p className=" position-absolute d-lg-none d-sm-block">
                      UserType:{" "}
                    </p>
                    {item.group.name}
                  </td>

                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Action:{" "}
                    </p>
                    <i
                      className="fa-solid fa-trash text-danger btn"
                      onClick={() => handleDeleteShow(item.id)}
                    ></i>
                  </td>
                </tr>
              </>
            ))
          ) : (
            <NoData />
          )}
        </tbody>
      </table>
      {userList.length > 0 ? (
        <nav aria-label="Page navigation example ">
          <ul className="pagination justify-content-center btn border-0 flex-wrap gap-1">
            <li className="page-item">
              <a className="page-link text-success" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {arrayOfPage.map((pageNu) => (
              <li
                className="text-success"
                key={pageNu}
                onClick={() => getUsers(nameValue, groupsValue, 15, pageNu)}
              >
                <a className="page-link text-success">{pageNu}</a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link text-success" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}
