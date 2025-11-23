"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getConcerts } from "@/store/slice/concert.slice";
import dynamic from "next/dynamic";
import { ConcertGql, ConcertSummary, GetConcertsResponse } from "@/types/gql";
import ConcertList from "./ConcertList";

const SummaryConcert = dynamic(
  () => import("../../components/concert/SummaryConcert"),
  { loading: () => <p>Loading...</p>, ssr: false }
);

const ConcertTabs = dynamic(() => import("./ConcertTabs"), {
  loading: () => <p>Loading...</p>,
});

const TAKE = 10;

const ConcertLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [concerts, setConcerts] = useState<ConcertGql[]>([]);
  const [summary, setSummary] = useState<ConcertSummary>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const hasMore = useMemo(() => {
    return concerts.length < total;
  }, [concerts.length, total]);

  const loadConcerts = useCallback(
    async (pageNumber: number) => {
      if (!user) return;
      setLoading(true);
      const skip = pageNumber * TAKE;

      const res = await dispatch(
        getConcerts({
          take: TAKE,
          skip,
          isAdmin: user?.isAdmin || false,
        })
      );

      const payload: any = (res as any)?.payload;
      const data: GetConcertsResponse = payload?.data?.getConcerts;

      if (data) {
        setConcerts((prev) => [...prev, ...(data.data as ConcertGql[])]);
        setSummary(data.summary as ConcertSummary);
        setTotal(data.total as number);
      }

      setLoading(false);
    },
    [dispatch, user]
  );

  useEffect(() => {
    loadConcerts(page);
  }, [page, loadConcerts]);

  useEffect(() => {
    setConcerts([]);
    setSummary(undefined);
    setTotal(0);
    setPage(0);
  }, [user?.isAdmin]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {user?.isAdmin && summary && (
        <>
          <SummaryConcert summary={summary} />
          <div
            style={{ overflowY: "auto", maxHeight: "70vh" }}
            id="admin-scroll-container"
          >
            <ConcertTabs concerts={concerts} lastElementRef={lastElementRef} />
          </div>
        </>
      )}

      {!user?.isAdmin && (
        <div id="user-scroll-container">
          {concerts?.map((concert, index) => {
            const isLast = concerts.length - 1 === index;
            return (
              <div key={concert.id} ref={isLast ? lastElementRef : null}>
                <ConcertList concerts={[concert]} />
              </div>
            );
          })}
        </div>
      )}

      {loading && <p className="text-center p-4">Loading...</p>}
      {!hasMore && concerts.length > 0 && (
        <p className="text-center text-gray-500">No more data</p>
      )}
    </div>
  );
};

export default ConcertLayout;
