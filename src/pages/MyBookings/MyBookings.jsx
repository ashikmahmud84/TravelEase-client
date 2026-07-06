import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import BookingRow from "../../components/BookingRow/BookingRow";

const MyBookings = () => {
  const { user, loading } = useAuth();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (loading) return;

    if (!user?.email) return;

    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, loading]);

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/bookings/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Booking Cancelled Successfully",
            icon: "success",
          });

          const remaining = bookings.filter((booking) => booking._id !== id);

          setBookings(remaining);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-4xl font-bold text-center mb-8">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No Booking Found</h2>

          <p className="text-gray-500 mt-2">
            You haven't booked any vehicle yet.
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
                <th>Date</th>
                <th>Days</th>
                <th>Price</th>
                <th>Status</th>
                <th>Update</th>
                <th>Cancel</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <BookingRow
                  key={booking._id}
                  booking={booking}
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

export default MyBookings;
