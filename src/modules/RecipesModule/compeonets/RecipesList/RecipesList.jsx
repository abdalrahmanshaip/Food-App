import { useContext, useEffect, useState } from "react";
import recipesavatar from "../../../../assets/media/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios, { AxiosHeaders } from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import imgNodata from "../../../../assets/media/no-data.png";
import DeleteItem from "../../../SharedModule/components/DeleteItem/DeleteItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";

export default function RecipesList() {
  const { baseUrl, requestHeaders, loginData } = useContext(AuthContext);
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [catId, setCatId] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [nameValue, setNamevalue] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [arrayOfPage, setArrayOfPage] = useState([]);
  const [userData, setUserdata] = useState(null);

  const [favRicipeId, setFavRicipeId] = useState();
 

  const [viewId, setViewId] = useState("");
  const [viewById, setViewById] = useState([]);


  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setShowDelete(true);
  };
  const handleEditClose = () => {
    setShowEdit(false);
  };
  const handleEditShow = (id) => {
    setViewId(id);
    setShowEdit(true);
    getRecipesById(id);
    favoriteRecipe(id);
  };

  const favoriteRecipe = async (id) => {

    try {
      let response = await axios.post(
        `${baseUrl}/userRecipe/`,
        id,

        {
          headers: requestHeaders,
        }
      );
      handleEditClose();
      toast.success("This Recipe has been add to favorite");
    } catch (error) {}
  };
  const getRecipesById = async (id) => {
    try {
      let response = await axios.get(
        `${baseUrl}/Recipe/${id}`,

        {
          headers: requestHeaders,
        }
      );
      setViewById(response.data);

    } catch (error) {}
  };

  const getRecipesList = async (
    name,
    tagId,
    categoryId,
    pageSize,
    pageNumber
  ) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            name: name,
            tagId: tagId,
            categoryId: categoryId,
          },
        }
      );
      setArrayOfPage(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => ++i)
      );
  
      setRecipesList(response.data.data);
    } catch (error) {}
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=10&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setCategoriesList(response.data.data);
    } catch (error) {}
  };

  const getTags = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tag/`, {
        headers: requestHeaders,
      });
      setTagList(response.data);
    } catch (error) {}
  };
  const hadnleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/Recipe/${catId}`, {
        headers: requestHeaders,
      });
      handleDeleteClose();
      toast.error("The Recipe has been deleted");
      getRecipesList();

    } catch (error) {}
  };

  const getNameValue = (input) => {
    setNamevalue(input);
    getRecipesList(input, tagId, categoryId);
  };
  const getTagId = (input) => {
    setTagId(input);
    getRecipesList(nameValue, input, categoryId);
  };
  const getCategoryId = (input) => {
    setCategoryId(input);
    getRecipesList(nameValue, tagId, input);
  };

  useEffect(() => {
    getRecipesList("", "", "", 10, 1);
    getCategories();
    getTags();
  }, []);

  return (
    <>
      <div>
        <Header
          title={"Recipes"}
          sectitle={"Items"}
          description={
            "You can now add your items that any user can order it from the Application and you can edit"
          }
          imgurl={recipesavatar}
        />
      </div>
      <Modal show={showDelete} onHide={handleDeleteClose}>
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
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton className=" border-0"></Modal.Header>
        <Modal.Body>
          <>
            <div className="" key={viewById.id}>
              <h3>Recipe Details</h3>
              <img
                src={`https://upskilling-egypt.com:3006/${viewById?.imagePath}`}
                width={200}
                className=" rounded-4 text-center d-block ms-auto me-auto"
                alt="not found"
              />
              <p>Name: {viewById?.name}</p>
              <p>Description: {viewById?.description}</p>
              <p>price: {viewById.price}</p>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <button
            className=" bg-white text-black border-black px-5 py-2"
            onClick={() => favoriteRecipe({ recipeId: viewId })}
          >
            Favorite
          </button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid p-5 col-lg-11 col-md-10 col-sm-10">
        <div className="row ">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <p>You can check all details</p>
          </div>
          {loginData.userGroup == "SuperAdmin" ? (
            <div className="col-md-6 d-lg-flex justify-content-end">
              <Link to={"/dashboard/recipesdata"}>
                <button className="btn bg-success text-white ">
                  Add New Recipes
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="filtertion px-5 mb-4">
        <div className="row">
          <div className="col-md-6 position-relative">
            <i className="fa-solid fa-magnifying-glass position-absolute  mt-3 ms-3 text-muted"></i>
            <input
              type="text"
              placeholder="serach here..."
              className=" form-control ps-5 py-2 mb-sm-3"
              onChange={(e) => getNameValue(e.target.value)}
            />
          </div>
          <div className="col-md-3 position-relative">
            <select
              className="form-control ps-4 py-2 mb-sm-3"
              aria-label="Default select example"
              onChange={(e) => getTagId(e.target.value)}
            >
              <option selected className="">
                Tag
              </option>
              {tagList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-angle-down position-absolute top-0 end-0 me-4 mt-3"></i>
          </div>
          <div className="col-md-3 position-relative">
            <select
              className="form-control ps-4 py-2"
              aria-label="Default select example"
              onChange={(e) => getCategoryId(e.target.value)}
            >
              <option selected>Category</option>
              <i className="fa-solid fa-angle-down"></i>
              {categoriesList.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-angle-down position-absolute top-0 end-0 me-4 mt-3"></i>
          </div>
        </div>
      </div>
      <table className="table text-center">
        <thead>
          <tr className=" table-secondary">
            <th scope="col" className="p-4 rounded-start-3">
              Name
            </th>
            <th scope="col" className="p-4">
              Image
            </th>
            <th scope="col" className="p-4">
              Price
            </th>
            <th scope="col" className="p-4">
              Description
            </th>
            <th scope="col" className="p-4">
              Tage
            </th>
            <th scope="col" className="p-4">
              Category
            </th>
            <th scope="col" className=" rounded-end-3 p-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {recipesList.length > 0 ? (
            recipesList.map((item, index) => (
              <>
                <tr
                  key={item.id}
                  className={`${
                    index % 2 !== 0 ? "bg-light" : "bg-transparent"
                  } m-5  position-relative`}
                >
                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Name:{" "}
                    </p>
                    {item.name}
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
                        width={56}
                        height={56}
                        className=" rounded-3"
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
                        className=" rounded-3"
                        width={56}
                        height={56}
                      />
                    </td>
                  )}

                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Price:{" "}
                    </p>
                    {item.price}
                  </td>
                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Description:{" "}
                    </p>
                    {item.description.slice(0, 80)}...
                  </td>
                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Tage:{" "}
                    </p>
                    {item.tag.name}
                  </td>
                  <td className="pt-4">
                    <p className=" position-absolute d-lg-none d-sm-block">
                      Category:{" "}
                    </p>
                    {item.category.length > 0 ? item.category[0].name : ""}
                  </td>
                  {loginData.userGroup == "SuperAdmin" ? (
                    <td className="pt-4">
                      <p className=" position-absolute d-lg-none d-sm-block">
                        Action:{" "}
                      </p>
                      <Link to={`/dashboard/recipesdata/${item.id}`}>
                        <i
                          className="fa-solid fa-pen-to-square text-warning  btn"
                          // onClick={() => setId(item.id, item.name)}
                        ></i>
                      </Link>
                      <i
                        className="fa-solid fa-trash text-danger btn"
                        onClick={() => handleDeleteShow(item.id)}
                      ></i>
                    </td>
                  ) : (
                    <td className="pt-4">
                      {/* <Link to={`/dashboard/Favorites/${item.id}`}> */}
                      <i
                        className="fa-regular fa-eye btn"
                        onClick={() => handleEditShow(item.id)}
                      ></i>
                      {/* </Link> */}
                    </td>
                  )}
                </tr>
              </>
            ))
          ) : (
            <NoData />
          )}
        </tbody>
      </table>
      {recipesList.length > 0 ? (
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
                onClick={() =>
                  getRecipesList(nameValue, tagId, categoryId, 10, pageNu)
                }
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
    </>
  );
}
