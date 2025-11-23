import { ConcertSummary } from "@/types/gql";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { LuAward } from "react-icons/lu";

type Props = {
  summary?: ConcertSummary;
};

const SummaryConcert = ({ summary }: Props) => {
  const items = [
    {
      label: "Total Seats",
      value: summary?.totalSeat || 0,
      icon: <UserOutlined className="text-3xl" />,
      bg: "bg-[#0070a4]",
    },
    {
      label: "Reserve",
      value: summary?.reserved || 0,
      icon: <LuAward className="text-4xl" />,
      bg: "bg-[#00a58b]",
    },
    {
      label: "Cancel",
      value: summary?.cancelled || 0,
      icon: <CloseCircleOutlined className="text-3xl" />,
      bg: "bg-[#e84e4e]",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-around">
      {items.map(({ label, value, icon, bg }) => (
        <div
          key={label}
          className={`flex flex-col gap-4 items-center justify-center w-[300px] h-[200px] rounded-2xl text-white ${bg}`}
        >
          {icon}
          <div>{label}</div>
          <div className="text-3xl font-semibold">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryConcert;
