import ConcertLayout from "@/components/concert/ConcertLayout";
import AppLayout from "@/components/layouts/AppLayouts";

export default function Home() {
  return (
    <AppLayout>
      <div>
        <ConcertLayout />
      </div>
    </AppLayout>
  );
}
