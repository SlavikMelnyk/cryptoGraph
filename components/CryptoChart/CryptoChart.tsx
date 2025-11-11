"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getCryptoConfig,
  CryptoType,
  type CryptoConfigData,
} from "@/config/cryptoConfig";

type CryptoChartProps = {
  cryptoData: CryptoConfigData;
};

const CryptoChart = ({ cryptoData }: CryptoChartProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>(
    CryptoType.BITCOIN
  );

  const cryptoConfig = getCryptoConfig(cryptoData);
  const { data, color, name, icon: Icon } = cryptoConfig[selectedCrypto];
  const currentPrice = data[data.length - 1].price;

  return (
    <motion.div
      className="w-full max-w-[56rem] bg-white/10 backdrop-blur-[0.625rem] rounded-[1.25rem] p-8 shadow-[0_0.5rem_2rem_0_rgba(31,38,135,0.37)] border border-white/[0.18]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Icon className="text-4xl" style={{ color }} />
          <h1 className="text-white text-2xl font-semibold">{name}</h1>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-white text-4xl font-bold">${currentPrice}</div>
          <span className="text-white text-xs opacity-70">Current Price</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        {Object.values(CryptoType).map((cryptoType) => {
          const config = cryptoConfig[cryptoType];
          const Icon = config.icon;

          return (
            <button
              key={cryptoType}
              className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl text-white text-base font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/20 hover:-translate-y-0.5 ${
                selectedCrypto === cryptoType
                  ? "bg-white/30 border-white/50"
                  : "bg-white/10 border-white/20"
              }`}
              onClick={() => setSelectedCrypto(cryptoType)}
            >
              <Icon /> {config.name}
            </button>
          );
        })}
      </div>

      <div className="w-full h-[25rem]">
        <ResponsiveContainer className="w-full h-full">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "0.5rem",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CryptoChart;
