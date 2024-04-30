import {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import { getAuth } from "firebase/auth";
import Spinner from '../components/Spinner';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UpdateSpot() {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
    tourists_spot_name: "",
    country_Name: "",
    location: "",
    short_description: "",
    average_cost: "",
    seasonality: "",
    travel_time: "",
    totalVisitorsPerYear: "",
    user_email: auth.currentUser?.email,
    user_name: auth.currentUser?.displayName,
    rating: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { image, tourists_spot_name, country_Name, location, short_description, average_cost, seasonality, travel_time, totalVisitorsPerYear, user_email, user_name, rating } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  useEffect(() => {
    fetch("https://travel-server-rg6e.onrender.com/country")
    .then(response => response.json())
    .then(data => {
      const conuntryNames = data?.map(country => country?.country_Name);
      setCountryList(conuntryNames);
      setLoading(false);
    })
  }, []);
  useEffect(() => {
    fetch(`https://travel-server-rg6e.onrender.com/spot/${id}`)
    .then(response => response.json())
    .then(data => {
      setFormData(data);
    })
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!image || !tourists_spot_name || !country_Name || !location || !short_description || !average_cost || !seasonality || !travel_time || !totalVisitorsPerYear || !user_email || !user_name || !rating) {
      toast.error("Please fill in all fields");
      return;
    }
    fetch(`https://travel-server-rg6e.onrender.com/spot/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if(data) {
        toast.success("Spot added successfully");
        navigate(`/spot/${id}`);
      }
    })
  }
  if(loading) return <Spinner />
  return (
    <>
    <section className="max-w-6xl font-poppins flex justify-center items-center flex-col container mx-auto">
    <Helmet>
      <title>Update Spot</title>
    </Helmet>
    <h1 className="text-3xl text-center mt-6 font-bold text-primary">Update Spot</h1>
    <div className="w-full md:w-[50%] mt-6 px-3">
      <form onSubmit={onSubmit}>
      {/* Image Input */}

      <input
      type="text"
      id="image"
      value={image}
      onChange={onChange}
      placeholder="Image URL"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Tourists Spot Name Input */}
    <input
      type="text"
      id="tourists_spot_name"
      value={tourists_spot_name}
      onChange={onChange}
      placeholder="Tourists Spot Name"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Country Name Input */}
    <select
      id="country_Name"
      value={country_Name}
      onChange={onChange}
      placeholder="Country Name"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    >
      <option value="" disabled>Select Country</option>
      {countryList.map((country, index) => (
        <option key={index} value={country}>{country}</option>
      ))}
    </select>

    {/* Location Input */}
    <input
      type="text"
      id="location"
      value={location}
      onChange={onChange}
      placeholder="Location"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Short Description Input */}
    <textarea
      id="short_description"
      value={short_description}
      onChange={onChange}
      placeholder="Short Description"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Average Cost Input */}
    <input
      type="number"
      id="average_cost"
      value={average_cost}
      onChange={onChange}
      placeholder="Average Cost"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Seasonality Input */}
    <input
      type="text"
      id="seasonality"
      value={seasonality}
      onChange={onChange}
      placeholder="Seasonality"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Travel Time Input */}
    <input
      type="text"
      id="travel_time"
      value={travel_time}
      onChange={onChange}
      placeholder="Travel Time"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Total Visitors Per Year Input */}
    <input
      type="number"
      id="totalVisitorsPerYear"
      value={totalVisitorsPerYear}
      onChange={onChange}
      placeholder="Total Visitors Per Year"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* Rating Input */}
    <input
      type="number"
      id="rating"
      value={rating}
      onChange={onChange}
      placeholder="Rating"
      className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* User Email Input */}
    <input
      type="text"
      id="user_email"
      disabled
      value={user_email}
      onChange={onChange}
      placeholder="User Email"
      className="mb-6 w-full px-4 py-2 text-xl text-gray-400 bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    {/* User Name Input */}
    <input
      type="text"
      id="user_name"
      disabled
      value={user_name}
      onChange={onChange}
      placeholder="User Name"
      className="mb-6 w-full px-4 py-2 text-xl text-gray-400 bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
    />
    <button
      type="submit"
      className={`bg-primary text-white w-full py-2 rounded font-medium text-xl transition ease-in-out hover:bg-[#6D6523] ${(loading || !user_email) && "cursor-not-allowed bg-gray-400 hover:bg-gray-500"} `}
      disabled={!user_email || !user_name}
    >
      Update
    </button>
    </form>
    </div>
    </section>
    </>
  )
}
