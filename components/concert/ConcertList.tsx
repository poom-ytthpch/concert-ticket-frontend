import { ConcertGql } from "@/types/gql";
import ConcertCard from "./ConcertCard";

type Props = {
  concerts: ConcertGql[];
};

const ConcertList = ({ concerts = [] }: Props) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
};

export default ConcertList;
