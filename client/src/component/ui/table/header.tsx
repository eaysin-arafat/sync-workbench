// table header data type
export type HeaderData = {
  title: string | JSX.Element;
  w: string;
  sortIcon?: boolean;
};

// Table Header component props
export type TableHeaderPropType = {
  data: HeaderData[];
  className?: string;
};

// Table Header component
function TableHeader({ data, className = "" }: TableHeaderPropType) {
  return (
    <div
      className={`flex justify-between px-6 h-full py-[6px] rounded-md mb-2 ${className}`}
    >
      {/* HEADER TITLES */}
      {data?.map((item, index) => (
        <p
          className={`p-2 py-2.5 flex items-center justify-center text-center text-[12px] 2xl:text-[14px] font-semibold ${
            index === 0 && "text-start"
          }`}
          key={index}
          style={{ width: item.w }}
        >
          {item?.title}
        </p>
      ))}
    </div>
  );
}

export default TableHeader;
