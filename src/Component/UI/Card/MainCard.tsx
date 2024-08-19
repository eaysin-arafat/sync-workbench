type Props = {
  children: React.ReactNode;
  className?: string;
};

const MainCard = ({ children, className }: Props) => {
  return (
    <div
      className={`border border-solid border-[#97979736] shadow-[6px_6px_54px_0px_#00000008] rounded-lg p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default MainCard;
