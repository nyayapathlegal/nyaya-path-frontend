export const Heading = ({heading}) => {
  return (
    <div className=" w-full max-w-full md:max-w-120">
      <span className="text-[40px] md:text-[48px] flex-3 leading-[1.3] font-extralight mb-4 font-[Emilio-Light]">
        {heading}
      </span>
    </div>
  );
};
