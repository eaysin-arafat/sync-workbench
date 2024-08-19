const RectangleDesign = () => {
  return (
    <div className="bg-black grid grid-cols-4 gap-5 absolute right-14 top-14 ">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="bg-white rounded-full w-1 h-1"></div>
      ))}
    </div>
  );
};

export default RectangleDesign;
