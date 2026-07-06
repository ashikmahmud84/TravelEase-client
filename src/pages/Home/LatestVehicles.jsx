import { Link } from "react-router";
import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axios";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LatestVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/latest-vehicles")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-5">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold">
          Latest Vehicles
        </h2>

        <div className="w-28 h-1 bg-primary mx-auto rounded-full mt-4"></div>

        <p className="text-gray-500 max-w-2xl mx-auto mt-6">
          Explore our latest vehicle collection and find the perfect ride
          for your next adventure.
        </p>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            No Vehicles Found
          </h2>

          <p className="text-gray-500 mt-3">
            Latest vehicles will appear here soon.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/all-vehicles"
              className="btn btn-primary btn-wide"
            >
              View All Vehicles
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default LatestVehicles;