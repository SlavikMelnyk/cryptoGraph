import { SiBitcoin, SiSolana } from "react-icons/si";
import type { IconType } from "react-icons";

export enum CryptoType {
  BITCOIN = "bitcoin",
  SOLANA = "solana",
}

export type CryptoData = {
  date: string;
  price: number;
};

export type CryptoConfigData = {
  bitcoinData: CryptoData[];
  solanaData: CryptoData[];
};

export type CryptoConfig = {
  [key in CryptoType]: {
    data: CryptoData[];
    color: string;
    name: string;
    icon: IconType;
  };
};

export const getCryptoConfig = ({
  bitcoinData,
  solanaData,
}: CryptoConfigData): CryptoConfig => {
  return {
    [CryptoType.BITCOIN]: {
      data: bitcoinData,
      color: "#f7931a",
      name: "Bitcoin",
      icon: SiBitcoin,
    },
    [CryptoType.SOLANA]: {
      data: solanaData,
      color: "#14f195",
      name: "Solana",
      icon: SiSolana,
    },
  };
};
