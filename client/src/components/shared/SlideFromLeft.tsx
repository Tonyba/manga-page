import { motion } from "framer-motion";
import React, { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const SlideFromLeft: FC<PropsWithChildren & Props> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{
        marginLeft: -500,
      }}
      animate={{
        marginLeft: 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideFromLeft;
