const UserCard = ({
  icon,
  quantity,
  title,
}: {
  icon: string;
  quantity: string | number;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="">
        <img src={icon} height={50} width={48} alt="" />
      </div>
      <h2 className="text-3xl font-bold">{quantity}</h2>
      <h4 className="text-base font-semibold">{title}</h4>
    </div>
  );
};

export default UserCard;
