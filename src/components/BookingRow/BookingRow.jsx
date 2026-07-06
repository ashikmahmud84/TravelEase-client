import Swal from "sweetalert2";

const BookingRow = ({ booking, index, handleDelete }) => {
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel It!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(booking._id);
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>

      <td>
        <img
          src={booking.coverImage}
          alt={booking.vehicleName}
          className="w-20 h-14 rounded object-cover"
        />
      </td>

      <td>{booking.vehicleName}</td>

      <td>{booking.bookingDate}</td>

      <td>{booking.totalDays}</td>

      <td>৳ {booking.pricePerDay}</td>

      <td>
        <span className="badge badge-warning">
          {booking.status}
        </span>
      </td>

      <td>
        <button className="btn btn-sm btn-info">
          Update
        </button>
      </td>

      <td>
        <button
          onClick={handleCancel}
          className="btn btn-sm btn-error"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;