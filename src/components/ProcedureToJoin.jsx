import msg from "/messages.svg";
import edit from "/edit.svg";
import tracking from "/tracking.svg";
function ProcedureToJoin() {
  return (
    <div className="my-[108px] container mx-auto font-poppins px-5  dark:text-gray-300">
      <p className="leading-[120%] text-base font-normal text-center">
        Three steps. Three minutes.
      </p>
      <h2 className="font-semibold text-[26px] md:text-[40px] lg:text-[50px] leading-[120%] text-center mt-3 lg:mt-4">
        Everything should be this easy.
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-8 lg:mt-11">
        <div className="col-span-12 lg:col-span-4 text-left flex flex-col gap-4 lg:gap-5">
          <img
            src={msg}
            alt="msg icon"
            className="lg:size-[75px] md:size-[60px] size-[40px]"
          />
          <h3 className="lg:text-[28px] text-[20px] font-semibold leading-[120%]">
            Answer questions
          </h3>
          <p className="text-base font-normal leading-6">
          Let us be your trusted advisors, ready to listen and deliver the best deals with our expertise.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 text-left flex flex-col gap-4 lg:gap-5">
          <img
            src={tracking}
            alt="tracking icon"
            className="lg:size-[75px] md:size-[60px] size-[40px]"
          />
          <h3 className="lg:text-[28px] text-[20px] font-semibold leading-[120%]">
            Select a quote
          </h3>
          <p className="text-base font-normal leading-6">
          Share your quote, and we'll leverage our expertise to secure the best deal within your budget.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 text-left flex flex-col gap-4 lg:gap-5">
          <img
            src={edit}
            alt=" edit icon"
            className="lg:size-[75px] md:size-[60px] size-[40px]"
          />
          <h3 className="lg:text-[28px] text-[20px] font-semibold leading-[120%]">
            Get registered
          </h3>
          <p className="text-base font-normal leading-6">
          Join us now, two steps away, and let us effortlessly assist you without the search hassle.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProcedureToJoin;
