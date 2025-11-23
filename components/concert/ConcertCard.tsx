import { ConcertGql } from "@/types/gql";
import { Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store/hooks";

type Props = {
  concert: ConcertGql;
};

const ConcertCard = ({ concert }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Card
      key={concert.id}
      title={<span className="text-blue-500">{concert?.name || ""}</span>}
      style={{ width: "100%" }}
    >
      <p>{concert?.description || ""}</p>

      <div className="mt-4 flex justify-between items-center w-full">
        <div>
          <UserOutlined />
          <span className="ml-2">
            {concert?.totalSeats?.toLocaleString() || 0}
          </span>
        </div>
        <div>
          {user?.isAdmin && (
            <Button type="primary" danger>
              Delete
            </Button>
          )}
          {!user?.isAdmin &&
            (concert.userReservationStatus === "RESERVED" ? (
              <Button type="primary" danger>
                Cancel
              </Button>
            ) : (
              <Button type="primary">Reserve</Button>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default ConcertCard;
