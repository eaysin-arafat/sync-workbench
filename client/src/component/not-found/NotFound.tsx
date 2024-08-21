import { styles } from "@/utils/cn";

// Not Found Component props
type Props = {
  messages?: string;
  className?: string;
};

// Not Found Component
function NotFound({ messages, className = "" }: Props) {
  return (
    <div
      className={styles(
        "flex justify-center text-lg 2xl:text-xl items-center w-full p-3 h-32 bg-whiteColor rounded-lg text-textColor",
        className
      )}
    >
      <h3>{messages ? messages : "No Recorded Data Yet to Show"}</h3>
    </div>
  );
}

export default NotFound;
