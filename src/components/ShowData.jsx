import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import TruncatedText from "./TruncatedText";

export default function ShowData() {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const data = localStorage.getItem("countryData");
      if (data) {
        setCountryData(JSON.parse(data));
        setLoading(false);
      }
    };
    getDataFromLocalStorage();
  }, []);
  useEffect(() => {
    fetch("https://travel-server-rg6e.onrender.com/country")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
        localStorage.setItem("countryData", JSON.stringify(data));
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="w-full text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <div>
      <h1 className="dark:text-gray-300 text-left text-3xl font-poppins font-semibold mt-12 mb-4 ml-3">
        Ways to Take a Tour to
      </h1>
      <div className="estatedata relative overflow-hidden py-12 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation
          modules={[Autoplay, Navigation]}
          // autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {countryData?.map((country, index) => (
            <SwiperSlide key={index} className="h-full">
              <Link
                to={`/country/${country?.country_Name}/${country?._id}`}
                className="card dark:bg-gray-800 dark:text-gray-300 dark:mt-6  card-compact  bg-base-100 shadow-xl cursor-pointer"
              >
                <figure className="p-3 rounded-xl">
                  <div
                    style={{
                      backgroundImage: `url(${country?.banner})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="rounded-xl shadow-xl w-full h-48 relative"
                  >
                    <p className="absolute right-2 top-2 text-[#C5DEE5]  opacity-90 hover:opacity-100">
                      <img
                        className="w-8 h-6"
                        src={country?.image}
                        alt="flag image"
                      />
                    </p>
                  </div>
                </figure>
                <div className="p-6 mt-6">
                  <h2 className="font-poppins font-semibold text-[21px] leading-[120%] truncate">
                    {country?.country_Name}
                  </h2>
                  <div className="text-base font-poppins font-normal leading-[24px] mt-4 w-[90%]">
                    {
                      <TruncatedText
                        text={country?.description}
                        maxLength={100}
                      />
                    }
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
