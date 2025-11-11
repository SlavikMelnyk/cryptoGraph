import { SiBitcoin } from "react-icons/si";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5">
      <motion.div
        className="w-20 h-20 flex justify-center items-center"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SiBitcoin className="w-full h-full text-[#f7931a]" />
      </motion.div>
      <motion.p
        className="text-white text-lg font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Preloader;
