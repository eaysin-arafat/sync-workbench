import { IoMdInformationCircleOutline } from "react-icons/io";
import "./tooltip.styles.css";

const Tooltip = ({ text }: { text: string }) => {
  return (
    <div
      className="tooltip"
      data-tooltip={text}
      data-tooltip-pos="top"
      data-tooltip-length="medium"
    >
      <IoMdInformationCircleOutline className="text-[16px] text-blue-700" />
    </div>
  );
};

export default Tooltip;
