import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import axiosSecure from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UpdateVehicle = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateVehicle = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedVehicle = {
      vehicleName: form.vehicleName.value,
      category: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      coverImage: form.coverImage.value,
      description: form.description.value,
    };

    axiosSecure
      .patch(`/vehicles/${id}`, updatedVehicle)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Vehicle Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/my-vehicles");
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Update Failed",
        });
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="bg-base-100 shadow-xl rounded-xl p-8">

        <h2 className="text-4xl font-bold text-center mb-8">
          Update Vehicle
        </h2>

        <form onSubmit={handleUpdateVehicle}>

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
                defaultValue={vehicle.vehicleName}
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
                defaultValue={vehicle.category}
                className="select select-bordered w-full"
              >
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
                defaultValue={vehicle.pricePerDay}
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
                defaultValue={vehicle.location}
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
                defaultValue={vehicle.availability}
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
                defaultValue={vehicle.coverImage}
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
              defaultValue={vehicle.description}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-8"
          >
            Update Vehicle
          </button>

        </form>

      </div>
    </div>
  );
};

export default UpdateVehicle;