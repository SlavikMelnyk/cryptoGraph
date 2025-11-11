"use client";

/**
 * Note: This page is implemented as a client component instead of a server component
 * to ensure the Preloader is visible on every page load.
 *
 * Server components with caching would be more efficient, but they pre-render the page
 *
 * By using a client component with useEffect, we guarantee that:
 * - The Preloader is always displayed during initial data fetch
 * - Users get visual feedback that data is being loaded
 * - Browser caching still works via the fetch revalidate config
 */

import { useEffect, useState } from "react";
import CryptoChart from "@/components/CryptoChart/CryptoChart";
import Preloader from "@/components/Preloader/Preloader";
import { fetchCryptoData } from "@/data/cryptoData";
import type { CryptoConfigData } from "@/config/cryptoConfig";

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CryptoConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main>
      {isLoading || !cryptoData ? (
        <Preloader />
      ) : (
        <CryptoChart cryptoData={cryptoData} />
      )}
    </main>
  );
}
