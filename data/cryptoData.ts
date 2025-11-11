type CoinGeckoPrice = [number, number];

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};

const fetchCoinData = async (coinId: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10&interval=daily`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${coinId} data`);
  }

  const data = await response.json();
  const prices: CoinGeckoPrice[] = data.prices;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return prices.map(([timestamp, price]) => ({
    date: formatDate(timestamp),
    price: Math.round(price),
  }));
};

export const fetchCryptoData = async () => {
  try {
    const [bitcoinData, solanaData] = await Promise.all([
      fetchCoinData("bitcoin"),
      fetchCoinData("solana"),
    ]);

    return {
      bitcoinData,
      solanaData,
    };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
