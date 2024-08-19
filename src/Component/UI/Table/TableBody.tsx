// Table Body data Type
type BodyData = {
  title: string | number | JSX.Element;
  subTitle?: string | JSX.Element;
  w: string;
  dataClass?: string;
};

// Table Body component props
type TableBodyPropType = {
  index: number;
  className?: string;
  data: BodyData[];
  length?: number;
  isBorderBottom?: boolean;
};

// Table Body component
function TableBody({ data, index, length, isBorderBottom }: TableBodyPropType) {
  return (
    <div
      key={index}
      className={`flex justify-between items-center px-6 h-full  ${
        isBorderBottom && "border-b"
      } ${length === index + 1 && "border-none"}`}
    >
      {/* BODY ITEM */}
      {data?.map((data, i) => (
        <div
          className={`p-2 py-5 text-[11px] 2xl:text-[13px] ${
            data?.dataClass ? data?.dataClass : ""
          }`}
          style={{ width: data.w }}
          key={i}
        >
          {/* TITLE */}
          <div className="flex flex-col">
            <div
              className={`text-[11px] flex items-center justify-center ${
                i === 0 && "text-start"
              }`}
            >
              {data?.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableBody;
