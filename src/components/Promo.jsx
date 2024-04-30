import travel_together from "/travel_together.svg";
export default function Promo() {
  return (
    <div className="py-10">
      <div className=" bg-[#e2e2d3] px-14 md:px-20 lg:px-24 py-10 md:py-15 lg:py-20 flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2 max-md:order-2 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
          <h1 className="text-[30px] md:text-[40px] lg:text-[60px] font-semibold md:font-bold font-poppins">
            Get the Best Promo
          </h1>
          <p className="text-sm md:text-base lg:text-[20px] font-normal font-poppins">
            For Couple Tour Get the best promo for your next trip with us
          </p>
        </div>
        <div className="w-full max-md:mb-6 max-md:order-1 md:w-1/2">
          <img className="w-full h-[250px] md:h-[300px]" src={travel_together} alt="travel together image" />
        </div>
      </div>
    </div>
  );
}
