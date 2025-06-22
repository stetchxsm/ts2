import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  hoverEffect?: boolean;
  delay?: number;
  background?: string;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = true,
  delay = 0,
  background,
}) => {
  const baseClasses = "rounded-2xl overflow-hidden";
  
  const variantClasses = {
    default: "bg-white shadow-lg border border-gray-100",
    elevated: "bg-white shadow-2xl border-0",
    glass: "bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100",
  };

  const hoverVariants = hoverEffect ? {
    initial: { 
      scale: 1,
      y: 0,
      boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      scale: 1.02,
      y: -5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  } : {};

  const cardStyle = background ? {
    background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={cardStyle}
      variants={hoverVariants}
      initial="initial"
      whileHover="hover"
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
    >
      {background && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;
