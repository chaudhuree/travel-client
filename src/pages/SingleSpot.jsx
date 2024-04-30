import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaStar } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
export default function SingleSpot() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    fetch(`https://travel-server-rg6e.onrender.com/spot/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpot(data);
        setLoading(false);
      });
  }, []);
  const starGenerator = (value) => {
    let rating = parseFloat(value);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
        rating = rating - 1;
      } else if (rating >= 0.5) {
        stars.push(<FaStarHalf key={i} className="text-yellow-500" />);
        rating = rating - 0.5;
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return <div className="flex items-center">{stars} </div>;
  };

  if (loading)
    return (
      <div className="w-full h-dvh text-center flex justify-center items-center">
        <span className=" loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <div className=" container mx-auto">
      <div className=" lg:mt-[30px] mt-5 mb-12 lg:mb-[70px] px-5 w-full mx-auto">
        <label className="input px-5 py-4 text-primary font-semibold input-bordered flex items-center gap-2 rounded-[10px]  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M22.5387 20.7713L27.8925 26.1238L26.1238 27.8925L20.7713 22.5387C18.7797 24.1353 16.3025 25.0036 13.75 25C7.54 25 2.5 19.96 2.5 13.75C2.5 7.54 7.54 2.5 13.75 2.5C19.96 2.5 25 7.54 25 13.75C25.0036 16.3025 24.1353 18.7797 22.5387 20.7713ZM20.0312 19.8438C21.6176 18.2124 22.5036 16.0255 22.5 13.75C22.5 8.91625 18.5837 5 13.75 5C8.91625 5 5 8.91625 5 13.75C5 18.5837 8.91625 22.5 13.75 22.5C16.0255 22.5036 18.2124 21.6176 19.8438 20.0312L20.0312 19.8438Z"
              fill="#6D6523"
            />
          </svg>
          <input
            type="text"
            className="grow "
            placeholder="Go to mountain, ocean, attractions"
          />
        </label>
      </div>
      <div className="mb-5 md:mb-7">
        <img
          src={spot?.image}
          alt={spot?.name}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-[8px]"
        />
      </div>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList >
            <Tab>Description</Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanel>
            <h1 className="text-4xl font-semibold font-poppins">
              {spot?.tourists_spot_name}
            </h1>
            <p className="flex items-center gap-4 my-2">
              <span>{starGenerator(spot?.rating)}</span>
              <span className="font-medium">
                {Number(spot?.rating).toFixed(1)}
              </span>
            </p>
            <p className="text-xl font-poppins font-normal mt-4">
              {spot?.short_description}
            </p>
            <p className="flex items-center gap-3 mt-4">
              <FaMapMarkedAlt className="text-red-500 size-6" />
              <span className="text-xl font-poppins font-normal text-sky-600">
                {spot?.location}
              </span>
            </p>
            <p className="text-xl font-poppins font-normal mt-4">
              <span className="font-semibold">
                {spot?.totalVisitorsPerYear}
              </span>{" "}
              visitors per year on average
            </p>
          </TabPanel>
          <TabPanel>
            <p className="font-poppins  text-lg mb-3">
              <span className="font-semibold mr-2">Country:</span> {spot?.country_Name}
            </p>
            <p className="font-poppins  text-lg mb-3">
              <span className="font-semibold mr-2">Average Cost:</span> <span className="text-sky-700 font-medium">{spot?.average_cost}$/person</span>
            </p>
            <p className="font-poppins  text-lg mb-3">
              <span className="font-semibold mr-2">Best Time to Visit:</span> {spot?.seasonality}
            </p>
            <p className="font-poppins  text-lg mb-3">
              <span className="font-semibold mr-2">Duration:</span> {spot?.travel_time}
            </p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
