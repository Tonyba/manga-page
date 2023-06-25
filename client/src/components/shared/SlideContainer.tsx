import { motion } from "framer-motion";
import React, { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
  direction: "up" | "bottom" | "left" | "right";
};

const directionStyle = {
  up: {
    marginTop: -100,
  },
  left: {
    marginLeft: -100,
  },
  right: {
    marginRight: -100,
  },
  bottom: {
    marginBottom: -100,
  },
};

const SlideContainer: FC<PropsWithChildren & Props> = ({
  children,
  className,
  direction,
}) => {
  return (
    <motion.div
      initial={directionStyle[direction]}
      animate={{
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideContainer;
