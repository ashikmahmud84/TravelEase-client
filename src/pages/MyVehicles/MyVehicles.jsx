import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axiosSecure from "../../lib/axios";
import useAuth from "../../hooks/useAuth";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MyVehicleRow from "../../components/MyVehicleRow/MyVehicleRow";

const MyVehicles = () => {
  const { user, loading } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user?.email) return;

    axiosSecure
      .get(`/my-vehicles?email=${user.email}`)
      .then((res) => {
        setVehicles(res.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false);
      });
  }, [user, loading]);

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/vehicles/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Vehicle Deleted Successfully",
            timer: 1500,
            showConfirmButton: false,
          });

          const remaining = vehicles.filter(
            (vehicle) => vehicle._id !== id
          );

          setVehicles(remaining);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading || pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h2 className="text-4xl font-bold text-center mb-8">
        My Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            No Vehicle Found
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't added any vehicle yet.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="table">

            <thead>

              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Vehicle</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>

            </thead>

            <tbody>

              {vehicles.map((vehicle, index) => (
                <MyVehicleRow
                  key={vehicle._id}
                  vehicle={vehicle}
                  index={index}
                  handleDelete={handleDelete}
                />
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
};

export default MyVehicles;