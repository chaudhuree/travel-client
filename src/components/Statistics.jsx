import React from "react";
import clientimg from "/statsection.png";
import overlay from "/statsectionoverlay.png";

function Statistics() {
  return (
    <div className="container mx-auto my-24 px-5 lg:px-24 font-poppins mb-20 lg:mb-[130px]">
      <h1 className=" font-semibold text-[40px] lg:text-[50px] text-center mb-9 lg:mb-11">
        We are a global, boutique real estate brokerage
      </h1>
      <div className="grid items-center justify-between grid-cols-12 max-lg:gap-10">
        <div className="flex flex-col lg:col-span-6 col-span-12 max-lg:items-center lg:order-1 order-2">
          <h2 className="lg:text-[38px] text-[20px] font-semibold leading-[120%] mb-6">
            The transfer of real estate
          </h2>
          <p className="leading-6 text-sm lg:text-base font-normal w-full lg:w-[90%] mb-9 lg:mb-11">
          Real estate serves as the canvas upon which dreams are painted, offering spaces that transcend mere bricks and mortar to become homes, sanctuaries, and investments. It intertwines with our aspirations, shaping communities and fostering memories that endure lifetimes.
          </p>
          <div className="flex gap-6 items-center mb-20">
            <button className="py-[15px] px-[35px] bg-black rounded-[40px] text-white border-white border">
              Book Now!
            </button>
            <button className="py-[15px] px-[35px] border rounded-[40px] ">
              Read More
            </button>
          </div>
          <div className="flex items-center gap-20 flex-wrap">
            <p className="lg:text-[67px] text-5xl font-semibold leading-[120%]">
              120+ <span className="font-normal text-sm lg:text-base block">customers</span>
            </p>
            <p className="lg:text-[67px] text-5xl font-semibold leading-[120%]">
              10+ <span className="font-normal  text-sm lg:text-base block">offices</span>
            </p>
            <p className="lg:text-[67px] text-5xl font-semibold leading-[120%]">
              8+ <span className="font-normal  text-sm lg:text-base block">partners</span>
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 relative lg:order-2 order-1">
          <img src={clientimg} alt="client image" className="w-full"/>
          <img src={overlay} alt="overlay" className="absolute w-full h-full top-0 left-0" />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
