import imgNodata from "../../../../assets/media/no-data.png";

export default function NoData() {
  return (
    <div className="no-data">
      <div className=" container">
        <img src={imgNodata} alt="" />
        <div className="text">
          <h4>No Data !</h4>
          <p>No Data For This Page</p>
        </div>
      </div>
    </div>
  );
}
