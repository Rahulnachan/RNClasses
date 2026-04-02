import React from "react";
import { motion } from "framer-motion";

function AnimationWrapper({ children, direction = "up", delay = 0 }) {

  // Decide starting position based on direction
  let initialPosition = { opacity: 0, y: 50 };

  if (direction === "down") {
    initialPosition = { opacity: 0, y: -50 };
  }

  if (direction === "left") {
    initialPosition = { opacity: 0, x: 50 };
  }

  if (direction === "right") {
    initialPosition = { opacity: 0, x: -50 };
  }

  return (
    <motion.div
      initial={initialPosition}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimationWrapper;
