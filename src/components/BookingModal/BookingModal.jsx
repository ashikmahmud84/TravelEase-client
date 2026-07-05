import useAuth from "../../hooks/useAuth";

const BookingModal = ({ vehicle, onClose }) => {
  const { user } = useAuth();

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <h3 className="text-3xl font-bold mb-6 text-center">
          Book Vehicle
        </h3>

        <form>

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
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write something..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="modal-action">

            <button
              type="button"
              onClick={onClose}
              className="btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Confirm Booking
            </button>

          </div>

        </form>

      </div>
    </dialog>
  );
};

export default BookingModal;