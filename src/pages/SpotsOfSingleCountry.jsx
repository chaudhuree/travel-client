import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SpotsOfSingleCountry() {
  const { country_Name,countryId } = useParams()
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState([]);
  const [country, setCountry] = useState({});

  useEffect(() => {
    fetch(`https://travel-server-rg6e.onrender.com/spots/country/${country_Name}`)
      .then((response) => response.json())
      .then((data) => {
        setSpots(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(`https://travel-server-rg6e.onrender.com/country/${countryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
      });
  }, []);

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
    return <div className="flex items-center">{stars} </div>;
  };
  
  if (loading)
    return (
      <div className="w-full text-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
    if(spots.length === 0){
      return (
        <div className="w-full h-screen grid items-center text-center">
          <h1 className="text-3xl font-semibold text-primary">No Spots Found</h1>
        </div>
      )
    }
  return (
    <div className="container mx-auto">
    <Helmet>
      <title>{country?.country_Name}</title>
    </Helmet>
    <div className="text-center">
      <h1 className="text-left text-3xl font-poppins font-semibold mt-12 mb-4 inline-block border-b-2 border-secondary ">
        Top Destinations in {country?.country_Name}
      </h1>
      <p className="text-left text-base font-poppins mb-6 w-3/4 mx-auto">
        {country?.description}
      </p>
    </div>

    <div className="grid grid-cols-12">
        {spots.map((spot) => (
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
                
              </div>
            </figure>
            <div className="p-6 mt-6">
              <h2 className="font-poppins font-semibold text-[21px] leading-[120%] truncate">
                {spot?.tourists_spot_name}
              </h2>
              <div className="text-base font-poppins font-normal mt-4 flex flex-wrap justify-between truncate">
                <p>{spot?.location}</p>
                <p className="flex items-center gap-1">
                  <span>{starGenerator(spot?.rating)}</span>
                  <span>{Number(spot?.rating).toFixed(1)}</span>
                </p>
              </div>
              <p className="text-base font-poppins font-normal mt-4 flex justify-between items-center">
                <span>{spot?.totalVisitorsPerYear} visitors/year</span>
                <span>{spot?.travel_time}</span>
              </p>
              <p className="flex justify-between items-centertext-xl font-poppins font-semibold text-primary mt-4">
                <span> {spot?.average_cost}$/person</span>
                <span className="text-black font-normal">
                  {spot?.seasonality}
                </span>
              </p>
              <Link
                className=" text-base flex  items-center justify-center hover:bg-[#1F2937] bg-primary px-5 py-3 rounded-lg text-gray-200 font-semibold text-center my-4 cursor-pointer"
                to={`/spot/${spot?._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
