import React from 'react';
import { cn } from '@/lib/utils';

interface ArabicTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<Record<string, unknown>>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'right' | 'left' | 'center' | 'justify';
  href?: string;
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  [key: string]: unknown; // Allow any additional props
}

export const ArabicText: React.FC<ArabicTextProps> = ({
  children,
  className,
  as: Component = 'span',
  size = 'md',
  weight = 'normal',
  align = 'right',
  ...props
}) => {
  const fontSizeMap = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  };

  const fontWeightMap = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  return (
    <Component
      {...props}
      className={cn(
        'arabic-text',
        className
      )}
      style={{
        fontFamily: "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif",
        fontSize: fontSizeMap[size],
        fontWeight: fontWeightMap[weight],
        lineHeight: 1.8,
        wordSpacing: '0.05em',
        letterSpacing: '0',
        textAlign: align,
        direction: 'rtl',
        textRendering: 'optimizeLegibility',
        WebkitFontFeatureSettings: '"liga" 1, "kern" 1',
        fontFeatureSettings: '"liga" 1, "kern" 1',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        ...props.style,
      }}
    >
      {children}
    </Component>
  );
};

export default ArabicText;