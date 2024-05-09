export default function Header({ title, sectitle, description, imgurl }) {
  return (
    <div className="container-fluid p-5 header-container col-lg-12 col-md-12 col-sm-12 mt-4">
      <div className="row align-items-center">
        <div className="col-md-8">
          <div className="content d-flex align-items-center ms-4">
            <h2 className=" me-2 text-white">{title}</h2>
            <h3 className=" text-white opacity-75">{sectitle} </h3>
          </div>
          <p className="text-white w-50 ms-4">{description}</p>
        </div>
        <div className="col-md-4">
          <div className="img text-center">
            <img src={imgurl} alt="" className="img-fluid bg-transparent"/>
          </div>
        </div>
      </div>
    </div>
  );
}
