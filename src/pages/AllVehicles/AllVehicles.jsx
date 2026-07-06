import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axiosSecure
      .get("/vehicles")
      .then((res) => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Search Filter
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleName.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedVehicles = [...filteredVehicles];

  if (sort === "low") {
    sortedVehicles.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }

  if (sort === "high") {
    sortedVehicles.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">All Vehicles</h2>

        <p className="text-gray-500 mt-3">
          Browse all available vehicles and choose the perfect one for your
          trip.
        </p>
      </div>

      {/* Search */}
      <div className="bg-base-200 rounded-xl p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="🔍 Search vehicle..."
            className="input input-bordered w-full md:max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:w-64"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Total Vehicles */}
      <div className="mb-6">
        <p className="font-semibold">Total Vehicles: {sortedVehicles.length}</p>
      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-5xl mb-4">🚗</h2>

          <h2 className="text-3xl font-bold">No Vehicles Found</h2>

          <p className="text-gray-500 mt-3">Try another search keyword.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVehicles;
