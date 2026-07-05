import { useEffect, useState } from "react";
import { useParams } from "react-router";

import BookingModal from "../../components/BookingModal/BookingModal";
import {
  FaCar,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaEnvelope,
  FaClipboardList,
} from "react-icons/fa";

import axiosSecure from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const VehicleDetails = () => {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-base-200 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="card bg-base-100 shadow-2xl">
          <figure>
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-[450px] object-cover"
            />
          </figure>

          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h2 className="text-4xl font-bold">{vehicle.vehicleName}</h2>

                <p className="text-lg mt-2 text-gray-500">{vehicle.category}</p>
              </div>

              <div>
                <span
                  className={`badge badge-lg ${
                    vehicle.availability === "Available"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {vehicle.availability}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{vehicle.location}</span>
                </p>

                <p className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-primary" />
                  <span>৳ {vehicle.pricePerDay} / Day</span>
                </p>

                <p className="flex items-center gap-3">
                  <FaCar className="text-primary" />
                  <span>{vehicle.category}</span>
                </p>

                <p className="flex items-start gap-3">
                  <FaClipboardList className="text-primary mt-1" />
                  <span>{vehicle.description}</span>
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-5">Owner Information</h3>

                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={vehicle.ownerPhoto}
                    alt={vehicle.ownerName}
                    className="w-16 h-16 rounded-full border"
                  />

                  <div>
                    <h4 className="font-bold text-lg">{vehicle.ownerName}</h4>

                    <p className="flex items-center gap-2">
                      <FaEnvelope />
                      {vehicle.ownerEmail}
                    </p>
                  </div>
                </div>

                <p className="flex items-center gap-2">
                  <FaClipboardList />
                  Total Bookings :<strong>{vehicle.totalBookings}</strong>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary btn-lg w-full hover:scale-[1.02] transition-transform duration-300"
              >
                🚗 Book Now
              </button>
              {showModal && (
                <BookingModal
                  vehicle={vehicle}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
