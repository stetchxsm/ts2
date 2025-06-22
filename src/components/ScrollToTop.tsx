import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, don't scroll to top
    // Let the browser handle scrolling to the hash element
    if (hash) {
      // Small delay to ensure the page is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = window.innerWidth < 768 ? 100 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    // Scroll to top when route changes (no hash)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant for immediate scroll without animation
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
