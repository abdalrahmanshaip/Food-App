import { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/media/header.png";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { AuthContext } from "../../../context/AuthContext";
import Styles from "./Favorites.module.css";
export default function Favorites() {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [favRicipe, setFavRicipe] = useState();

  const getFavoriteRecipe = async () => {
    try {
      const response = await axios.get(`${baseUrl}/userRecipe/`, {
        headers: requestHeaders,
      });
      setFavRicipe(response.data.data);
    } catch (error) {}
  };
  const hadnleDeleteFavRecipe = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/userRecipe/${id}`, {
        headers: requestHeaders,
      });

      getFavoriteRecipe();

    } catch (error) {}
  };
  useEffect(() => {
    getFavoriteRecipe();
  }, []);
  return (
    <>
      <Header
        title="Favorite"
        sectitle="Itmes"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgurl={headerimg}
      />
      <div className="favs-list   col-lg-11 col-md-10 col-sm-10 container-fluid">
        <div className="container-fluid text-center">
          <div className={` ms-sm-4 my-5 ${Styles.sizefav}`}>
            {favRicipe?.length > 0 ? (
              favRicipe.map((fav) => (
                <div key={fav.id} className={`my-5 `}>
                  <div className="fav-recipe shadow rounded-3 position-relative h-100">
                    <div>
                      <img
                        className="w-100"
                        height={200}
                        src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                        alt=""
                      />
                    </div>
                    <div className="py-3 px-3 ">
                      <h4>{fav.recipe.name}</h4>
                      <h5>{fav.recipe.price}</h5>
                      <h5>{fav.recipe.tag.name}</h5>
                      <p className="fave-description">
                        {fav.recipe.description}
                      </p>
                    </div>
                    <div
                      onClick={() => hadnleDeleteFavRecipe(fav.id)}
                      role="button"
                      className=" position-absolute top-0 end-0  px-1 m-2  bg-body rounded-2"
                    >
                      <i className={"fa fa-heart text-danger"}></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
