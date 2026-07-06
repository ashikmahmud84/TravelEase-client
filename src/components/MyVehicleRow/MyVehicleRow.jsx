import { Link } from "react-router";
import Swal from "sweetalert2";

const MyVehicleRow = ({ vehicle, index, handleDelete }) => {
  const {
    _id,
    coverImage,
    vehicleName,
    category,
    pricePerDay,
    availability,
  } = vehicle;

  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this vehicle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(_id);
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>

      <td>
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-20 h-14 rounded-lg object-cover"
        />
      </td>

      <td className="font-semibold">{vehicleName}</td>

      <td>{category}</td>

      <td>৳ {pricePerDay}</td>

      <td>
        <span
          className={`badge ${
            availability === "Available"
              ? "badge-success"
              : "badge-error"
          }`}
        >
          {availability}
        </span>
      </td>

      <td>
        <Link
          to={`/update/${_id}`}
          className="btn btn-sm btn-info"
        >
          Update
        </Link>
      </td>

      <td>
        <button
          onClick={handleRemove}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyVehicleRow;