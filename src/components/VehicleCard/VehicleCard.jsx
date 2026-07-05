import { Link } from "react-router";
import { motion } from "framer-motion";

const VehicleCard = ({ vehicle }) => {
  const {
    _id,
    coverImage,
    vehicleName,
    category,
    pricePerDay,
    availability,
    location,
  } = vehicle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <figure>
        <img
          src={coverImage}
          alt={vehicleName}
          className="h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{vehicleName}</h2>

        <p>
          <span className="font-semibold">Category:</span> {category}
        </p>

        <p>
          <span className="font-semibold">Location:</span> {location}
        </p>

        <p>
          <span className="font-semibold">Price:</span> ৳{pricePerDay} / Day
        </p>

        <p>
          <span className="font-semibold">Status:</span> {availability}
        </p>

        <Link to={`/vehicle/${_id}`} className="btn btn-primary mt-4">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
