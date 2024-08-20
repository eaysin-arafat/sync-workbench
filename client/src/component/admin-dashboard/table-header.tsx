const TableHeader = () => {
  return (
    <div className="flex items-center bg-[#F1F4F9] py-4 rounded-xl">
      <div className="w-[20%] text-center text-sm font-bold">Employee Name</div>

      <div className="w-[20%] text-center text-sm font-bold">Email</div>

      <div className="w-[20%] text-center text-sm font-bold">Date</div>
      <div className="w-[20%] text-center text-sm font-bold">Status</div>
      <div className="w-[20%] text-center text-sm font-bold">Data</div>
    </div>
  );
};

export default TableHeader;
