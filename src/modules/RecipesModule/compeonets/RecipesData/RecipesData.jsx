import { useForm } from "react-hook-form";
import RecipesFill from "../RecipesFill/RecipesFill";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from "./RecipesData.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

export default function RecipesData() {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  let { id } = useParams();

  const [editById, setEditById] = useState([]);

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  const onSubmit = async (data) => {
    let recipeFormData = appendToFormData(data);
    try {
      const respons = await axios.post(`${baseUrl}/Recipe/`, recipeFormData, {
        headers: requestHeaders,
      });
      toast.success(respons.data.message);
      navigate("/dashboard/recipes");
    } catch (errors) {}
  };
  const getId = async () => {
    try {
      let response = await axios.get(
        `${baseUrl}/Recipe/${id}`,

        {
          headers: requestHeaders,
        }
      );
      setEditById(response.data);

      Object.keys(response.data).forEach((key) => {
        setValue(key, response.data[key], { shouldDirty: false });
      });
    } catch (error) {}
  };
  const handleEdit = async (data) => {
    try {
      let recipeFormData = appendToFormData(data);
      const respons = await axios.put(
        `${baseUrl}/Recipe/${id}`,
        recipeFormData,
        {
          headers: requestHeaders,
        }
      );
      toast.success("Recipe has been updata it");
      navigate("/dashboard/recipes");
    } catch (error) {}
  };
  useEffect(() => {
    getCategories();
    getTags();
    getId();
  }, []);
  return (
    <>
      <RecipesFill />
      <div className="recpesdata mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit(id ? handleEdit : onSubmit)}>
                <div className="input-group mb-4">
                  <input
                    defaultValue={editById ? editById.name : ""}
                    type="text"
                    className="form-control bg-light"
                    placeholder="Recipe Name"
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="alert alert-danger error-massage">
                    {errors.name.message}
                  </p>
                )}
                <select
                  className="form-control mb-4"
                  aria-label="Default select example"
                  {...register("tagId", {
                    required: "tagId is required",
                    validate: (value) => {
                      const option = "Open this select menu";
                      return value !== option || "tagId is required";
                    },
                  })}
                >
                  <option selected value={editById?.tag?.id}>
                    {editById ? editById?.tag?.name : "Open this select menu"}
                  </option>
                  {tagList.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                {errors.tagId && (
                  <p className="alert alert-danger error-massage">
                    {errors.tagId.message}
                  </p>
                )}
                <div className="input-group mb-4 ">
                  <input
                    defaultValue={id ? editById.price : ""}
                    type="number"
                    min={1}
                    max={1000}
                    className="form-control bg-light z-0"
                    placeholder="Recipe Name"
                    {...register("price", {
                      required: "price is required",
                    })}
                  />
                  <span className="text-end position-absolute end-0 text-center me-2 mt-2 z-3">
                    EGP
                  </span>
                </div>
                {errors.price && (
                  <p className="alert alert-danger error-massage">
                    {errors.price.message}
                  </p>
                )}
                <select
                  className="form-control mb-4"
                  aria-label="Default select example"
                  {...register("categoriesIds", {
                    required: "categoriesId is required",
                    validate: (value) => {
                      const option = "Open this select menu";
                      return value !== option || "categoriesId is required";
                    },
                  })}
                >
                  <option selected>Open this select menu</option>
                  {categoriesList.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
                {errors.categoriesIds && (
                  <p className="alert alert-danger error-massage">
                    {errors.categoriesIds.message}
                  </p>
                )}
                <div className="input-group mb-4">
                  <textarea
                    defaultValue={id ? editById.description : ""}
                    aria-hidden
                    rows="4"
                    cols="50"
                    aria-setsize={100}
                    className="form-control bg-light"
                    id="exampleFormControlTextarea1"
                    {...register("description", {
                      required: "description is required",
                    })}
                  ></textarea>
                </div>
                {errors.description && (
                  <p className="alert alert-danger error-massage">
                    {errors.description.message}
                  </p>
                )}
                <div className="input-group mb-4 position-relative">
                  <label htmlFor="inputTag" className={`${styles.label}`}>
                    <i
                      className={`fa-solid fa-upload ${styles.iconupload}`}
                    ></i>
                    <p className=" fw-bold mt-5">
                      Drag & Drop or{" "}
                      <span className=" text-success">Choose a Item Image</span>{" "}
                      to Upload
                    </p>
                    <input
                      id="inputTag"
                      type="file"
                      {...register("recipeImage")}
                    />
                  </label>
                </div>
                {errors.recipeImage && (
                  <p className="alert alert-danger error-massage">
                    {errors.recipeImage.message}
                  </p>
                )}
                <div className="button text-end">
                  <Link to={"/dashboard/recipes"}>
                    <button className="btn text-success border-success bg-white me-4 px-5">
                      Cancel
                    </button>
                  </Link>
                  <button className="btn bg-success text-white px-4">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
