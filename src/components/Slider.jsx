import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import {bannerData} from "../assets/banner";
export default function Slider() {
  const [sliderData, setSliderData] = useState(bannerData);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://travel-server-rg6e.onrender.com/banner")
      .then((response) => response.json())
      .then((data) => {
        setSliderData(data);
      });
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        effect="fade"
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        loop={true}
      >
        {sliderData?.map((data,index)=>{
          return <SwiperSlide key={index}>
          <div
            className="hero min-h-[540px] "
            style={{ backgroundImage: `url(${data?.image})` }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="w-full flex flex-col gap-3 md:gap-5 lg:gap-8 text-center text-neutral-content px-[20px] md:px-[50px] lg:px-[100px] py-[30px] md:py-[60px] lg:py-[150px]">
              <h2 className="capitalize font-poppins text-[30px] md:text-[45px] lg:text-[60px] text-center text-white dark:text-gray-300">
                "{data?.heading}"
              </h2>
              <h3 className="dark:text-gray-300 font-poppins text-base md:text-xl lg:text-[24px] text-center text-base-100">
                {data?.subheading}
              </h3>

              <form onSubmit={handleSearch} className=" mt-[60px] lg:mt-[90px] w-[60%] mx-auto max-md:hidden">
                <label className="input px-5 py-4 text-primary font-semibold input-bordered flex items-center gap-2 rounded-2xl focus:ring-2 focus:ring-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M15 14.375C14.1712 14.375 13.3763 14.0458 12.7903 13.4597C12.2042 12.8737 11.875 12.0788 11.875 11.25C11.875 10.4212 12.2042 9.62634 12.7903 9.04029C13.3763 8.45424 14.1712 8.125 15 8.125C15.8288 8.125 16.6237 8.45424 17.2097 9.04029C17.7958 9.62634 18.125 10.4212 18.125 11.25C18.125 11.6604 18.0442 12.0667 17.8871 12.4459C17.7301 12.825 17.4999 13.1695 17.2097 13.4597C16.9195 13.7499 16.575 13.9801 16.1959 14.1371C15.8167 14.2942 15.4104 14.375 15 14.375ZM15 2.5C12.6794 2.5 10.4538 3.42187 8.81282 5.06282C7.17187 6.70376 6.25 8.92936 6.25 11.25C6.25 17.8125 15 27.5 15 27.5C15 27.5 23.75 17.8125 23.75 11.25C23.75 8.92936 22.8281 6.70376 21.1872 5.06282C19.5462 3.42187 17.3206 2.5 15 2.5Z"
                      fill="#6D6523"
                    />
                  </svg>
                  <input value={search}  type="text" className="grow" placeholder="Destination" onChange={(e) => setSearch(e.target.value)} />
                </label>
              </form>
            </div>
          </div>
        </SwiperSlide>
        })}
      </Swiper>
    </>
  );
}
