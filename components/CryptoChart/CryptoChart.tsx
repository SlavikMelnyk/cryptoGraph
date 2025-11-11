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
import styles from "./CryptoChart.module.css";

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
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Icon className={styles.titleIcon} style={{ color }} />
          <h1 className={styles.title}>{name}</h1>
        </div>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>${currentPrice}</div>
          <span className={styles.priceLabel}>Current Price</span>
        </div>
      </div>

      <div className={styles.buttons}>
        {Object.values(CryptoType).map((cryptoType) => {
          const config = cryptoConfig[cryptoType];
          const Icon = config.icon;

          return (
            <button
              key={cryptoType}
              className={`${styles.button} ${
                selectedCrypto === cryptoType ? styles.active : ""
              }`}
              onClick={() => setSelectedCrypto(cryptoType)}
            >
              <Icon /> {config.name}
            </button>
          );
        })}
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
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
                borderRadius: "8px",
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
