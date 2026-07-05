import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axios";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const LatestVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/vehicles")
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
      <h2 className="text-5xl font-extrabold text-center">Latest Vehicles</h2>

      <div className="w-28 h-1 bg-primary mx-auto rounded-full mt-4 mb-6"></div>

      <p className="text-center text-gray-500 max-w-xl mx-auto">
        Discover our newest vehicles and book your perfect ride for your next
        journey.
      </p>

      <p className="text-center text-gray-500 mb-10">
        Choose your favorite vehicle from our latest collection.
      </p>

      {vehicles.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-3xl font-bold">🚗 No Vehicles Found</h3>

          <p className="text-gray-500 mt-3">
            New vehicles will appear here soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestVehicles;
