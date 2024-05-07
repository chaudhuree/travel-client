import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ShowAllSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const getSpotsFromLocalStorage = () => {
      const data = localStorage.getItem("allspots");
      if (data) {
        setSpots(JSON.parse(data));
        setLoading(false);
      }
    };
    getSpotsFromLocalStorage();
  }, []);
  useEffect(() => {
    fetch(
      `https://travel-server-rg6e.onrender.com/spots?sort=${sort}&page=${page}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSpots(data?.result);
        setTotalItems(data?.total);
        localStorage.setItem("allspots", JSON.stringify(data?.result));
        setLoading(false);
      });
  }, [sort]);

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

  const loadmore = () => {
    const nextPage = page + 1;
    fetch(
      `https://travel-server-rg6e.onrender.com/spots?sort=${sort}&page=${nextPage}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSpots((prevSpots) => [...prevSpots, ...data.result]);
        setPage(nextPage);
      });
  };

  if (loading) {
    return (
      <div className="w-full h-dvh text-center flex justify-center items-center">
        <span className=" loading loading-ring loading-lg dark:text-gray-300"></span>
      </div>
    );
  }

  if (spots.length === 0) {
    return (
      <div className="w-full h-dvh text-center flex justify-center items-center dark:text-gray-300">
        <h1>No spots found</h1>
      </div>
    );
  }
  const handleSort = (e) => {
    setPage(1);
    setSort(e.target.value);
  };
  return (
    <div className="container mx-auto dark:text-gray-300">
      <Helmet>
        <title>Top Destinations</title>
      </Helmet>

      <div className="text-center">
        <h1 className="mx-auto text-3xl font-poppins font-semibold mt-12 mb-2 border-b-2 border-secondary dark:border-sky-600  inline-block ">
          Top Destinations Around The World
        </h1>
      </div>
      <div className="text-center mt-10">
        <select onChange={handleSort} className="select select-bordered w-full max-w-xs outline-none focus:outline-primary dark:bg-gray-600 dark:text-gray-300">
          <option  selected disabled className="text-primary dark:text-black font-semibold  dark:bg-white ">
            Sort
          </option>
          <option value="latest" className="text-primary dark:text-black font-semibold dark:bg-white">Latest</option>
          <option value="oldest" className="text-primary dark:text-black font-semibold dark:bg-white">Oldest</option>
          <option value="highestPrice" className="text-primary dark:text-black font-semibold dark:bg-white">MaxPrice</option>
          <option value="lowestPrice" className="text-primary dark:text-black font-semibold dark:bg-white">MinPrice</option>
        </select>
      </div>
      <div className="grid grid-cols-12">
        {spots.map((spot) => (
          <div
            key={spot?._id}
            className="card dark:bg-gray-800 dark:text-gray-300 card-compact  bg-base-100 shadow-xl cursor-default col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4  mt-6 mx-2"
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
      <div className="flex justify-center items-center my-8">
      <Fade>
        <button
          disabled={spots.length === totalItems}
          onClick={loadmore}
          className={`bg-primary text-gray-200  px-6 py-4 rounded-lg text-2xl ${
            spots.length === totalItems && "hidden"
          }`}
        >
          Load More
        </button>
        </Fade>
      </div>
    </div>
  );
}
