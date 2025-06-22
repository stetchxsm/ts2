import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  threshold = 0.1,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold, 
    once,
    margin: "-100px 0px -100px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'fade' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
