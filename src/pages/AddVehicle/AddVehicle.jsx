import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../lib/axios";

const AddVehicle = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleAddVehicle = (e) => {
    e.preventDefault();

    const form = e.target;

    const vehicleData = {
      vehicleName: form.vehicleName.value,
      category: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      coverImage: form.coverImage.value,
      description: form.description.value,

      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerPhoto: user?.photoURL,

      totalBookings: 0,
      createdAt: new Date(),
    };

    axiosSecure
      .post("/vehicles", vehicleData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Vehicle Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          form.reset();

          navigate("/my-vehicles");
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="bg-base-100 shadow-xl rounded-xl p-8">

        <h2 className="text-4xl font-bold text-center mb-8">
          Add Vehicle
        </h2>

        <form onSubmit={handleAddVehicle}>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Vehicle Name */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Vehicle Name
                </span>
              </label>

              <input
                type="text"
                name="vehicleName"
                placeholder="Vehicle Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Category
                </span>
              </label>

              <select
                name="category"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Truck</option>
                <option>Van</option>
                <option>Bike</option>
              </select>
            </div>

            {/* Price */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Price Per Day
                </span>
              </label>

              <input
                type="number"
                name="pricePerDay"
                placeholder="Price Per Day"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Location */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Location
                </span>
              </label>

              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Availability */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Availability
                </span>
              </label>

              <select
                name="availability"
                className="select select-bordered w-full"
              >
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>

            {/* Cover Image */}

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Cover Image URL
                </span>
              </label>

              <input
                type="text"
                name="coverImage"
                placeholder="Image URL"
                className="input input-bordered w-full"
                required
              />
            </div>

          </div>

          {/* Description */}

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                Description
              </span>
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Vehicle Description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Owner Info */}

          <div className="grid md:grid-cols-3 gap-5 mt-6">

            <div>
              <label className="label">
                <span className="label-text">
                  Owner Name
                </span>
              </label>

              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Owner Email
                </span>
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Owner Photo
                </span>
              </label>

              <input
                type="text"
                value={user?.photoURL || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-8"
          >
            Add Vehicle
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddVehicle;