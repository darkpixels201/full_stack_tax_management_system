import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedContainer = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const zoomOutVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const fadeOutAnimation = { duration: 0.3, ease: "easeOut" };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      exit="hidden"
      variants={zoomOutVariants}
      transition={fadeOutAnimation}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
