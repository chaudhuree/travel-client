import { useParams } from "react-router-dom";
import { useMain } from "../context/MainProvider";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import NotFound from "./NotFound";
import { VscDebugBreakpointData } from "react-icons/vsc";
import "leaflet/dist/leaflet.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
const markerIcon = new L.Icon({
  iconUrl: "/marker.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 41],
});
export default function SingleProperty() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { estateData } = useMain();
  const navigate = useNavigate();

  useEffect(() => {
    const data = estateData.find((estate) => estate.id === +id);
    setProperty(data);
    setLoading(false);
  }, [estateData, id, navigate]);
  console.log("property", property);



  if (loading) {
    return <Spinner />;
  }

 

  return (
    <>
    <Helmet>
      <title>{property?.estate_title}</title>
      <meta name="description" content={property?.description} />
    </Helmet>
    {property ?(<div className="container grid grid-cols-12 mx-auto gap-5 items-start pt-10 px-4 font-poppins">
  
    <div className="col-span-12 md:col-span-6">
      <h2 className="font-semibold text-[40px] lg:text-[50px] leading-[120%] mb-4 mt-3 lg:mt-4">
        {property?.estate_title}
      </h2>
      <div className="overflow-hidden rounded-3xl mb-3">
        <img
          className="rounded-3xl h-80 w-full object-cover hover:scale-110 duration-300"
          src={property?.image}
          alt={property?.estate_title}
        />
      </div>
      <h3 className="text-xl font-semibold mt-2 px-4 py-2 rounded-3xl  bg-blue-300 border inline-block my-3">
        {property?.segment_name}
      </h3>
      <p className="text-base font-normal leading-6">
        {property?.description}
      </p>
      <p className="mt-2">
        <span className="font-bold">area:</span> {property?.area}
      </p>
      <p className="mt-2">
        <span className="font-bold">location:</span> {property?.location}
      </p>
      <div className=" mt-2">
        <h4 className="text-2xl font-semibold">Features:</h4>
        <ul className="my-3 pl-2">
          {property?.facilities.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <VscDebugBreakpointData />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2">
        <span className="font-bold">price: </span>
        {property?.price}
      </p>
    </div>

    <div className="col-span-12 md:col-span-6">
      <div className="w-full h-[300px] md:h-[600px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
        <MapContainer
          center={[property?.lat, property?.lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[property?.lat, property?.lng]} icon={markerIcon}>
            <Popup>{property?.area}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  </div>):(<NotFound/>)}
    </>
  );
}
