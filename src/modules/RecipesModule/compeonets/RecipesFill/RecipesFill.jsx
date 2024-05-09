import { Link } from "react-router-dom";

export default function RecipesFill() {
  return (
    <div className="recipes-fill m-5 container-fluid  p-4 rounded-4 col-lg-11 col-md-10 col-sm-10">
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h5>
              Fill the <span className=" text-success">Recipes</span> !
            </h5>
            <p className="w-75">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-6 text-end mt-4 d-sm-block ">
            <Link to={"/dashboard/recipes"}>
              <button className="btn bg-success text-white px-5 py-2 ">
                Fill Recipes
                <i className="fa-solid fa-arrow-right-long ms-2 "></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
}
