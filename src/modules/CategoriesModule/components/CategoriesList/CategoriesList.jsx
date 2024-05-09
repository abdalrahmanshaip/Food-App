import { useContext, useState } from "react";
import recipesavatar from "../../../../assets/media/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import { useEffect } from "react";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import DeleteItem from "../../../SharedModule/components/DeleteItem/DeleteItem";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
export default function CategoriesList() {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState("");
  const [editCatName, setEditCatName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [arrayOfPage, setArrayOfPage] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id, name) => {
    if ((id, name)) {
      setEditCatName(name);
      setCatId(id);
      reset();
    } else {
      setEditCatName("");
      setCatId("");
      reset();
    }
    setShow(true);
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setShowDelete(true);
  };

  const getCategories = async (name, pageSize, pageNumber) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
          },
        }
      );
      setArrayOfPage(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
    } catch (error) {}
  };

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      
      const response = await axios.post(`${baseUrl}/Category/`, data, {
        headers: {
          requestHeaders,
        },
      });
      toast.success("The Categories has been added");
      handleClose();
      getCategories();
      reset();
    } catch (error) {}
  };

  const onEdit = async (data) => {
    
    try {
      const response = await axios.put(`${baseUrl}/Category/${catId}`, data, {
        headers: requestHeaders,
      });
      toast.success("The Categories has been updated");
      handleClose();
      getCategories();
    } catch (error) {}
  };

  const hadnleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/Category/${catId}`, {
        headers: requestHeaders,
      });
      toast.error("The Categories has been deleted");
      handleDeleteClose();
      getCategories();
    } catch (error) {}
  };
  const getNameValue = (input) => {
    setNameValue(input);
    getCategories(input);
  };

  useEffect(() => {
    getCategories("", 7, 1);
  }, []);
  return (
    <div>
      <Header
        title={"Categores"}
        sectitle={"Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgurl={recipesavatar}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className=" border-0">
          <h3 className="p-3">{catId ? "Edit Category" : "Add Category"}</h3>
        </Modal.Header>
        <Modal.Body className="">
          <form onSubmit={handleSubmit(catId ? onEdit : onSubmit)} className="">
            <div className="input-group mb-2 mt-5">
              <input
                defaultValue={editCatName}
                type="text"
                className="form-control"
                placeholder="Category Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="alert alert-danger p-2">{errors.name.message}</p>
            )}

            <button className="btn btn-success d-block ms-auto">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton className=" border-0"></Modal.Header>
        <Modal.Body>
          <DeleteItem name={"Category"} />
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

      <div className="container-fluid p-5 col-lg-11 col-md-10 col-sm-10">
        <div className="row ">
          <div className="col-md-6">
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end h-25">
            <button className="btn bg-success text-white " onClick={handleShow}>
              Add New Category
            </button>
          </div>
        </div>
      </div>
      <div className="filtertion px-5 mb-4">
        <div className="row">
          <div className="col-md-12 position-relative">
            <i className="fa-solid fa-magnifying-glass position-absolute  mt-3 ms-3 text-muted"></i>
            <input
              type="text"
              placeholder="serach here..."
              className=" form-control ps-5 py-2"
              onChange={(e) => getNameValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="table">
        <thead className="">
          <tr className="table-secondary">
            <th scope="col" colSpan={3} className=" rounded-start-3 p-4">
              Name
            </th>
            <th scope="col" colSpan={2} className=" rounded-end-3 p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.length > 0 ? (
            categoriesList.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 !== 0 ? "bg-light" : "bg-transparent"
                } m-5 position-relative`}
              >
                <td className="ps-lg-4 pt-4 ps-sm-0">
                  <p className=" position-absolute d-lg-none d-sm-block">
                    Name:{" "}
                  </p>
                  {item.name}
                </td>
                <td className=" pt-4">{item.creationDate}</td>
                <td className=" pt-4">{item.modificationDate}</td>
                <td className="pt-4">
                  <p className=" position-absolute d-lg-none d-sm-block">
                    Action:{" "}
                  </p>
                  <i
                    className="fa-solid fa-pen-to-square text-warning  btn"
                    onClick={() => handleShow(item.id, item.name)}
                  ></i>
                  <i
                    className="fa-solid fa-trash text-danger btn"
                    onClick={() => handleDeleteShow(item.id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <NoData />
          )}
        </tbody>
      </table>
      {categoriesList.length > 0 ? (
        <nav aria-label="Page navigation example ">
          <ul className="pagination justify-content-center btn border-0">
            <li className="page-item">
              <a className="page-link text-success" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {arrayOfPage.map((pageNu) => (
              <li
                className="text-success"
                key={pageNu}
                onClick={() => getCategories(nameValue, 7, pageNu)}
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
        <div></div>
      )}
    </div>
  );
}
