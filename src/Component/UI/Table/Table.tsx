type Props = {
  children: React.ReactNode;
  className?: string;
};

const Table = ({ children, className = "" }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <div className={`" w-full" ${className}`}>{children}</div>
    </div>
  );
};

export default Table;
