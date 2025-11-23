"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getConcerts } from "@/store/slice/concert.slice";
import dynamic from "next/dynamic";
import { ConcertGql, ConcertSummary } from "@/types/gql";
import ConcertList from "./ConcertList";

const SummaryConcert = dynamic(
  () => import("../../components/concert/SummaryConcert"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ConcertTabs = dynamic(() => import("./ConcertTabs"), {
  loading: () => <p>Loading...</p>,
});

const ConcertLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { summary, data } = useAppSelector((state) => state.concert);

  useEffect(() => {
    if (!user) return;

    dispatch(
      getConcerts({
        take: 10,
        skip: 0,
        isAdmin: user.isAdmin,
      })
    );
  }, [user]);

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {user?.isAdmin && summary && (
        <div>
          <SummaryConcert summary={summary as ConcertSummary} />
          <ConcertTabs concerts={data as unknown as ConcertGql[]} />
        </div>
      )}
      {!user?.isAdmin && (
        <div>
          <ConcertList concerts={data as unknown as ConcertGql[]} />
        </div>
      )}
    </div>
  );
};

export default ConcertLayout;
