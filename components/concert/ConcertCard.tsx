import {
  CancelResponse,
  ConcertGql,
  ReservationStatus,
  ReserveResponse,
} from "@/types/gql";
import { Button, Card, Modal } from "antd";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cancel, deleteConcert, reserve } from "@/store/slice/concert.slice";
import * as _ from "lodash";
type Props = {
  concert: ConcertGql;
};

const ConcertCard = ({ concert }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userReservationStatus = _.get(
    concert,
    "userReservationStatus",
    ReservationStatus.Pending
  );

  const [modal] = Modal.useModal();

  const showConfirm = () => {
    Modal.confirm({
      icon: null,
      content: (
        <div className="flex flex-col justify-center w-full items-center gap-2">
          <div className="text-red-500">
            <CloseCircleOutlined className="text-3xl " />
          </div>
          <span className="font-semibold">Are you sure to delete?</span>
          <span className="font-semibold">"{concert.name}"</span>
        </div>
      ),
      okButtonProps: {
        style: { background: "red", width: "45%" },
      },
      cancelButtonProps: {
        style: { width: "45%" },
      },
      centered: true,
      width: 350,
      okText: (
        <div className="flex items-center gap-2 ">
          <CloseCircleOutlined className="text-white" />
          <span>Yes Delete</span>
        </div>
      ),
      cancelText: "Cancel",
      onOk: async () => {
        const id = _.get(concert, "id");
        if (!id) return;
        const res = await dispatch(deleteConcert(id));

        const payload: any = (res as any)?.payload;
        const data: boolean = payload?.data?.deleteConcert;

        if (data) {
          window.location.reload();
        }
      },
    });
  };

  const handleDelete = async () => {
    showConfirm();
  };

  const handleReserve = async () => {
    if (!concert?.id || !user?.id) return;

    const res = await dispatch(
      reserve({ concertId: concert.id, userId: user.id })
    );
    const payload: any = (res as any)?.payload;
    const data: ReserveResponse = payload?.data?.reserve;

    if (data) {
      window.location.reload();
    }
  };

  const handleCancel = async () => {
    if (!concert?.id || !user?.id) return;

    const res = await dispatch(
      cancel({ concertId: concert.id, userId: user.id })
    );
    const payload: any = (res as any)?.payload;
    const data: CancelResponse = payload?.data?.cancel;

    if (data) {
      window.location.reload();
    }
  };

  const RenderButton = () => {
    switch (userReservationStatus) {
      case ReservationStatus.Pending:
        return (
          <Button type="primary" disabled={true}>
            Pending
          </Button>
        );
        break;

      case ReservationStatus.Reserved:
        return (
          <Button type="primary" onClick={() => handleCancel()} danger>
            Cancel
          </Button>
        );
        break;

      default:
        return (
          <Button type="primary" onClick={() => handleReserve()}>
            Reserve
          </Button>
        );
        break;
    }
  };

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
            {concert?.seatsAvailable?.toLocaleString() || 0}
          </span>
        </div>
        <div>
          {user?.isAdmin && (
            <Button type="primary" onClick={() => handleDelete()} danger>
              Delete
            </Button>
          )}
          {!user?.isAdmin && RenderButton()}
        </div>
      </div>
    </Card>
  );
};

export default ConcertCard;
