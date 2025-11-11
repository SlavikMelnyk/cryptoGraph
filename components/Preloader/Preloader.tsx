import { SiBitcoin } from "react-icons/si";
import styles from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <SiBitcoin className={styles.icon} />
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Preloader;
