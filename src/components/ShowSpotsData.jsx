import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import {Link} from "react-router-dom";

function ShowSpotsData() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const starGenerator = (value) => {
    let rating = parseFloat(value);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<FaStar key={i} className="text-primary" />);
        rating = rating - 1;
      } else if (rating >= 0.5) {
        stars.push(<FaStarHalf key={i} className="text-primary" />);
        rating = rating - 0.5;
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return <span className="flex items-center">{stars} </span>;
  };
  useEffect(() => {
    const getSpotsFromLocalStorage = () => {
      const data = localStorage.getItem("spots");
      if (data) {
        setSpots(JSON.parse(data));
        setLoading(false);
      }
    };
    getSpotsFromLocalStorage();
  }, []);
  useEffect(() => {
    fetch("https://travel-server-rg6e.onrender.com/spots?sort=latest")
      .then((response) => response.json())
      .then((data) => {
        
        setSpots(data?.result);
        localStorage.setItem("spots", JSON.stringify(data?.result));
        setLoading(false);
      });
  }, []);
  
  if (loading)
    return (
      <div className="w-full text-center">
        <span className=" loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <div>
      <div className="ml-3">
      <h1 className="text-left text-3xl font-poppins font-semibold mt-12 mb-2 ">
        Top Destinations
      </h1>
      <h2 className="text-left text-xl font-poppins mb-4">
        Choose your best destination
      </h2>
      </div>
      <div className="container mx-auto grid grid-cols-12">
        {spots?.map((spot) => (
          <div
            key={spot?._id}
            className="card card-compact  bg-base-100 shadow-xl cursor-default col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4  mt-6 mx-2"
          >
            <figure className="p-3 rounded-xl">
              <div
                style={{
                  backgroundImage: `url(${spot?.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-xl shadow-xl w-full h-48 relative"
              >
                <p className="absolute right-2 top-2 py-1 px-6 bg-[#7F57F1] text-[#C5DEE5] rounded-[8px] opacity-80 hover:opacity-100 text-sm">
                  {spot?.country_Name}
                </p>
              </div>
            </figure>
            <div className="p-6 mt-6">
              <h2 className="font-poppins font-semibold text-[21px] leading-[120%] truncate">
                {spot?.tourists_spot_name}
              </h2>
              <div className="text-base font-poppins font-normal mt-4 flex flex-wrap justify-between truncate">
                <p>{spot?.location}</p>
                <p className="flex items-center gap-1"><span>{starGenerator(spot?.rating)}</span><span>{Number(spot?.rating).toFixed(1)}</span></p>
              </div>
              <p className="text-base font-poppins font-normal mt-4 flex justify-between items-center">
                <span>{spot?.totalVisitorsPerYear} visitors/year</span>
                <span>{spot?.travel_time}</span>
              </p>
              <p className="flex justify-between items-centertext-xl font-poppins font-semibold text-primary mt-4">
               <span> {spot?.average_cost}$/person</span>
               <span className="text-black font-normal">{spot?.seasonality}</span>
              </p>
              <Link className=" text-base flex  items-center justify-center hover:bg-[#1F2937] bg-primary px-5 py-3 rounded-lg text-gray-200 font-semibold text-center my-4 cursor-pointer" to={`/spot/${spot?._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowSpotsData;
