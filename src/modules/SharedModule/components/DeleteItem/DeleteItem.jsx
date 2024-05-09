import imgDelete from "../../../../assets/media/no-data.png";

// eslint-disable-next-line react/prop-types
export default function DeleteItem({name}) {
  return (
    <div className="delete text-center">
      <div className=" container">
        <img src={imgDelete} alt="" />
        <div className="text">
          <h4>Delete This {name} ?</h4>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
      </div>
    </div>
  );
}
