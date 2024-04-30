import imageTwo from "/newsletter-t.png";
import sliderBg from "/slider-bg.png";

export default function NewsLetter() {
  return (
    <div
      style={{
        background: `url(${sliderBg}) center, no-repeat`,
        backgroundSize: "cover",
      }}
      className="w-full  overflow-hidden rounded-2xl py-14 px-9 lg:py-[91px] lg:px-[46px] grid grid-cols-12 gap-10 items-center justify-between"
    >
      <div className="col-span-12 lg:col-span-7 max-lg:order-2">
        <div className="max-lg:mx-auto max-lg:text-center lg:w-full ">
          <h2 className="lg:text-[67px] text-[40px] font-poppins font-semibold leading-[120%]  max-lg:mx-auto w-full">
          Subscribe Our Newsletter
          </h2>
          <p className="leading-6 font-poppins text-sm md:text-base font-normal text-black my-6 w-full max-lg:mx-auto">
          A home is the stage where life's stories unfold, where walls become witnesses to laughter, love, and dreams fulfilled—a tapestry of memories woven into every corner and crevice.
          </p>
        </div>
        <div className="relative md:w-[70%] max-lg:pb-10 max-lg:mx-auto">
          <input
            type="text"
            className="bg-[#FEFEFF] py-[18px] px-[24px] rounded-[40px] w-full absolute top-0 left-0"
            placeholder="enter your email"
          />
          <button className="py-[18px] lg:px-[50px] px-7 rounded-[40px] text-white bg-[#1F1F1F] absolute top-0 right-0">
            Subscribe
          </button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 max-lg:order-1">
      <img
              src={imageTwo}
              alt="slider image"
              className="  w-full"
            /></div>
    </div>
  );
}
