import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeIn } from "../../utils/animations";

const Reveal = ({ children, width = "fit-content", direction = "up", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Only animate once
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("show");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className={className} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={fadeIn(direction, delay)}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;