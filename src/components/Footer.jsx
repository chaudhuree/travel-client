import { Link } from "react-router-dom";
import logo from "/logo.svg";
import fb from "/fb.svg";
import twitter from "/twitter.svg";
import youtube from "/youtube.svg";
import whatsapp from "/whatsapp.svg";
import insta from "/insta.svg";
import phone from "/phone.svg";
import message from "/message.svg";
import map from "/map.svg";
import copyright from "/copyright.svg";

export default function Footer() {
  const getFullYear = () => new Date().getFullYear();

  return (
    <div className="footer-section  bg-primary dark:text-gray-300 ">
      <div className="container mx-auto  py-[50px] lg:px-4 text-base-100  grid grid-cols-12 items-start   mt-20 lg:gap-5 gap-8 justify-center">
        <div className="max-lg:col-span-12 w-full max-lg:items-center  lg:col-span-4 flex flex-col gap-7">
          <Link to="/" className=" text-xl ml-0 flex items-center gap-2">
            <img src={logo} alt="brand-logo" />
            <span className=" mt-[9px] font-extrabold">Travel</span>
          </Link>
          <div className="flex flex-wrap max-lg:justify-center  gap-5 w-full mb-9 lg:mb-11">
            <img src={fb} alt="facebook logo" />
            <img src={twitter} alt="twitter logo" />
            <img src={youtube} alt="youtube logo" />
            <img src={insta} alt="instagram logo" />
            <img src={whatsapp} alt="what'sapp logo" />
          </div>
        </div>
        <div className="max-lg:col-span-6 w-full max-lg:text-center lg:col-span-4 grid lg:justify-center">
          <h4 className="font-poppins mb-3 font-semibold text-base">
            Services
          </h4>

          <div className="flex flex-col gap-[10px] text-base">
            <p className="cursor-pointer">About us</p>
            <p className="cursor-pointer">Blogs</p>
            <p className="cursor-pointer">Explore</p>
            <p className="cursor-pointer">Contact us</p>
          </div>
        </div>
        <div className="max-lg:col-span-6 w-full max-lg:text-center lg:col-span-4 grid lg:justify-end">
          <h4 className="font-poppins mb-3 font-semibold text-base">Help</h4>

          <div className="flex flex-col gap-[10px] text-base">
            <p className="cursor-pointer">Faq</p>
            <p className="cursor-pointer">Policy & Privacy</p>
            <p className="cursor-pointer">Terms and conditions</p>
          </div>
        </div>
      </div>

      <div className="  font-medium py-8 w-full text-base-100">
      <p className="w-full flex gap-1 items-center justify-center"><img src={copyright} alt="" />{getFullYear()} Travel All right reserved</p>
      </div>
    </div>
  );
}

/*

*/
