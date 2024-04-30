import { useMain } from "../context/MainProvider";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Properties() {
  const { loading, estateData } = useMain();
  if (loading) return <Spinner />;
  return (
    <div className="container mx-auto grid grid-cols-12 my-[45px] gap-5 px-3">
      <Helmet>
        <title>Properties</title>
      </Helmet>
      {estateData.map((estate, index) => (
        <div
          
          key={index}
          className="col-span-12 md:col-span-6 lg:col-span-4 cursor-default"
        >
          <div className="card card-compact  bg-base-100 shadow-xl">
            <figure className="p-6 rounded-xl ">
              <div
                style={{
                  background: `linear-gradient(116deg, rgba(193, 222, 232, 0.70) 9.86%, rgba(255, 255, 255, 0.00) 52.13%, rgba(251, 217, 185, 0.70) 97.99%), url(${estate.image}) center, no-repeat`,
                }}
                alt="Shoes"
                className="rounded-xl shadow-xl w-full h-48 object-cover relative"
              >
                <p className="absolute right-2 top-2 py-1 px-6 bg-[#7F57F1] text-[#C5DEE5] rounded-[8px] opacity-80">
                  {estate.status.toUpperCase()}
                </p>
              </div>
            </figure>
            <div className="p-6 mt-6">
              <h2 className="font-poppins font-semibold text-[21px] leading-[120%] truncate">
                {estate.estate_title}
              </h2>
              <p className="text-base font-poppins font-normal leading-[24px] mt-4 w-[90%]">
                {estate.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-[#1F2937] font-poppins font-bold  leading-[120%] mt-4">
                  {estate.price}
                </p>
                <p className="text-[#1F2937] font-poppins font-bold  leading-[120%] mt-4  underline underline-offset-4">
                  {estate.segment_name}
                </p>
              </div>
              <Link to={`/property/${estate.id}`} className=" text-base flex  items-center justify-center hover:bg-[#1F2937] bg-[#2F234F] px-5 py-3 rounded-lg text-gray-200 font-semibold text-center my-4 cursor-pointer">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
