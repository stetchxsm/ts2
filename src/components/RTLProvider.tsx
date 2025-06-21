import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface RTLProviderProps {
  children: React.ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // Cleanup function to remove dynamic elements
  const cleanup = useCallback(() => {
    // Remove old style element
    const oldStyle = document.getElementById('rtl-dynamic-styles');
    if (oldStyle) {
      oldStyle.remove();
    }

    // Remove old font links
    const oldLinks = document.querySelectorAll('link[data-rtl-font]');
    oldLinks.forEach(link => link.remove());
  }, []);

  // Setup RTL fonts
  const setupFonts = useCallback(() => {
    if (!isRTL) return;

    // Load Arabic fonts via link elements (not preload)
    const fonts = [
      {
        family: 'Cairo',
        weights: '300;400;500;600;700',
        display: 'swap'
      },
      {
        family: 'Tajawal', 
        weights: '300;400;500;700',
        display: 'swap'
      }
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font.family}:wght@${font.weights}&display=${font.display}`;
      link.setAttribute('data-rtl-font', 'true');
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, [isRTL]);

  // Setup RTL styles
  const setupStyles = useCallback(() => {
    if (!isRTL) return;

    const styleElement = document.createElement('style');
    styleElement.id = 'rtl-dynamic-styles';
    styleElement.textContent = `
      /* RTL Font Setup */
      [dir="rtl"] {
        font-family: 'Cairo', 'Tajawal', 'Segoe UI', Tahoma, Arial, sans-serif;
        text-align: right;
      }

      /* Typography Improvements */
      [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, 
      [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6 {
        font-family: 'Cairo', 'Tajawal', sans-serif;
        font-weight: 600;
        line-height: 1.3;
      }

      [dir="rtl"] p, [dir="rtl"] span {
        font-family: 'Cairo', 'Tajawal', sans-serif;
        line-height: 1.7;
      }

      [dir="rtl"] button, [dir="rtl"] input, [dir="rtl"] textarea {
        font-family: 'Cairo', 'Tajawal', sans-serif;
      }

      /* Tailwind RTL Fixes */
      [dir="rtl"] .space-x-1 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 1;
        margin-right: calc(0.25rem * var(--tw-space-x-reverse));
        margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
      }

      [dir="rtl"] .space-x-2 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 1;
        margin-right: calc(0.5rem * var(--tw-space-x-reverse));
        margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
      }

      [dir="rtl"] .space-x-3 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 1;
        margin-right: calc(0.75rem * var(--tw-space-x-reverse));
        margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
      }

      [dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 1;
        margin-right: calc(1rem * var(--tw-space-x-reverse));
        margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
      }

      /* Flex Direction Fixes */
      [dir="rtl"] .flex-row {
        flex-direction: row-reverse;
      }

      /* Common UI Element Fixes */
      [dir="rtl"] .text-left {
        text-align: right !important;
      }

      [dir="rtl"] .text-right {
        text-align: left !important;
      }

      [dir="rtl"] .float-left {
        float: right !important;
      }

      [dir="rtl"] .float-right {
        float: left !important;
      }

      /* Border radius fixes for RTL */
      [dir="rtl"] .rounded-l-lg {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-top-right-radius: 0.5rem !important;
        border-bottom-right-radius: 0.5rem !important;
      }

      [dir="rtl"] .rounded-r-lg {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-top-left-radius: 0.5rem !important;
        border-bottom-left-radius: 0.5rem !important;
      }
    `;

    document.head.appendChild(styleElement);
  }, [isRTL]);

  useEffect(() => {
    // Clean up previous resources
    cleanup();

    // Update document attributes
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    // Update body classes
    document.body.classList.toggle('rtl', isRTL);
    document.body.classList.toggle('ltr', !isRTL);

    // Setup fonts and styles for RTL
    if (isRTL) {
      setupFonts();
      setupStyles();
    }

    // Cleanup on unmount
    return cleanup;
  }, [isRTL, i18n.language, cleanup, setupFonts, setupStyles]);

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      data-theme={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  );
};

export default RTLProvider;