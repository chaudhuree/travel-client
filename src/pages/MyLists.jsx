import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function MyLists() {
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState([]);
  const auth = getAuth(); // Constant variable that shouldn't be reassigned

  useEffect(() => {
    const myListsFromLocalStorage = () => {
      const data = localStorage.getItem("mylists");
      if (data) {
        setSpots(JSON.parse(data));
        setLoading(false);
      }
    };

    myListsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (auth.currentUser?.email) {
      fetch(
        `https://travel-server-rg6e.onrender.com/spots/user?user_email=${auth.currentUser?.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSpots(data);
          localStorage.setItem("mylists", JSON.stringify(data));
          setLoading(false);
        });
    }
  }, [auth.currentUser?.email]);
  const starGenerator = (value) => {
    let rating = parseFloat(value);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
        rating = rating - 1;
      } else if (rating >= 0.5) {
        stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
        rating = rating - 0.5;
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return <span className="flex items-center">{stars} </span>;
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://travel-server-rg6e.onrender.com/spot/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const updatedSpots = spots.filter((spot) => spot._id !== id);
              setSpots(updatedSpots);
              localStorage.setItem("mylists", JSON.stringify(updatedSpots));
            }
          });
      }
    });
  };

  if (!auth.currentUser?.email) {
    return (
      <div className="w-full h-screen text-center flex justify-center items-center">
        <h1>No data found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-dvh text-center flex justify-center items-center">
        <span className=" loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>My Lists</title>
      </Helmet>
      <div className="text-center">
        <h1 className="mx-auto text-3xl font-poppins font-semibold mt-12 mb-6 border-b-2 border-secondary  inline-block ">
          My Lists
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="font-semibold text-base">
                <th>SL.No</th>
                <th>Name</th>
                <th className="max-sm:hidden">Location</th>
                <th>Cost</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot, index) => (
                <tr key={spot._id}>
                  <td className="font-medium">{index + 1}</td>
                  <td className="font-semibold text-primary cursor-pointer">
                    <Link to={`/spot/${spot?._id}`}>
                      {spot?.tourists_spot_name}
                    </Link>
                  </td>
                  <td className="max-sm:hidden">{spot?.location}</td>
                  <td>{spot?.average_cost}</td>
                  <td>{starGenerator(spot.rating)}</td>
                  <td className="flex gap-2 flex-wrap">
                    <Link to={`/spot/update/${spot?._id}`} className="px-2 py-1 bg-sky-500 hover:border-y-sky-700 font-semibold font-poppins text-sm rounded-md text-base-100">
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(spot?._id)}
                      className="px-[11px] py-1 bg-red-500 hover:border-y-red-700 font-semibold font-poppins text-sm rounded-md text-base-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyLists;
