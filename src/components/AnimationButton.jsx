import { motion } from "framer-motion";

const AnimatedButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-purple-600 text-white py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;
