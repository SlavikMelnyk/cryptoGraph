import { fetchCryptoData } from "@/data/cryptoData";
import CryptoChart from "@/components/CryptoChart/CryptoChart";
import { Suspense } from "react";
import Preloader from "@/components/Preloader/Preloader";

const CryptoChartWithData = async () => {
  const data = await fetchCryptoData();

  return <CryptoChart cryptoData={data} />;
};

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Preloader />}>
        <CryptoChartWithData />
      </Suspense>
    </main>
  );
}
