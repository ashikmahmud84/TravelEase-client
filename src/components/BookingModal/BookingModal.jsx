import { toast } from "react-hot-toast";
import axiosSecure from "../../lib/axios";
import useAuth from "../../hooks/useAuth";

const BookingModal = ({ vehicle, onClose }) => {
  const { user } = useAuth();
  console.log(user);

  const handleBooking = (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingDate = form.bookingDate.value;
    const totalDays = parseInt(form.totalDays.value);
    const note = form.note.value;

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      coverImage: vehicle.coverImage,
      category: vehicle.category,
      location: vehicle.location,
      ownerName: vehicle.ownerName,
      ownerEmail: vehicle.ownerEmail,
      pricePerDay: vehicle.pricePerDay,

      userName: user.displayName,
      userEmail: user.email,

      bookingDate,
      totalDays,
      note,

      status: "Pending",
      createdAt: new Date(),
    };
    axiosSecure
      .post("/bookings", bookingData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Booking Successful");

          form.reset();

          onClose();
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Booking Failed");
      });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="text-3xl font-bold mb-6 text-center">Book Vehicle</h3>

        <form onSubmit={handleBooking}>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Vehicle Name */}

            <div>
              <label className="label">
                <span className="label-text">Vehicle Name</span>
              </label>

              <input
                type="text"
                value={vehicle.vehicleName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}

            <div>
              <label className="label">
                <span className="label-text">Price Per Day</span>
              </label>

              <input
                type="text"
                value={`৳ ${vehicle.pricePerDay}`}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* User Name */}

            <div>
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>

              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* User Email */}

            <div>
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Booking Date */}

            <div>
              <label className="label">
                <span className="label-text">Booking Date</span>
              </label>

              <input
                type="date"
                name="bookingDate"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Total Days */}

            <div>
              <label className="label">
                <span className="label-text">Total Days</span>
              </label>

              <input
                type="number"
                name="totalDays"
                required
                placeholder="Enter total days"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Note */}

          <div className="mt-4">
            <label className="label">
              <span className="label-text">Special Note</span>
            </label>

            <textarea
              name="note"
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;
