import { useEffect, useCallback, useMemo, memo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CentralAsiaSection from "@/components/CentralAsiaSection";
import GulfCountriesSection from "@/components/GulfCountriesSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// نوع للمكونات
interface ComponentItem {
  Component: React.ComponentType;
  key: string;
}

// تحسين المكونات باستخدام memo لتجنب إعادة الرندر غير الضرورية
const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);

const Index: React.FC = () => {
  // تحسين معالج التمرير السلس
  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (!href || !href.startsWith('#')) return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      console.warn(`Element with ID "${targetId}" not found`);
      return;
    }

    // حساب الإزاحة بناء على حجم الشاشة
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 100 : 80;
    const elementRect = targetElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const targetPosition = absoluteElementTop - offset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  }, []);

  // تحسين خيارات Intersection Observer
  const observerOptions = useMemo(() => ({
    threshold: [0, 0.1, 0.5],
    rootMargin: "-10% 0px -10% 0px",
  }), []);

  // إعداد Intersection Observer المحسّن
  const setupIntersectionObserver = useCallback(() => {
    // التحقق من دعم المتصفح
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // إضافة الرسوم المتحركة
            target.classList.add("animate-fade-in");
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';

            // إزالة المراقبة لتحسين الأداء
            observer.unobserve(target);
          }
        });
      },
      observerOptions
    );

    // البحث عن العناصر القابلة للرسوم المتحركة
    const selectors = [
      '.animate-on-scroll',
      '[data-animate="true"]',
      'img:not([data-no-lazy="true"])',
      'section',
      '.card',
      '.service-item'
    ].join(', ');

    const animatableElements = document.querySelectorAll(selectors);

    animatableElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // إعداد الحالة الأولية للرسوم المتحركة
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(20px)';
      htmlElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

      // تحسين lazy loading للصور
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }

        // إضافة معالج خطأ الصورة
        img.onerror = () => {
          console.warn('Failed to load image:', img.src);
          img.style.display = 'none';
        };
      }

      observer.observe(element);
    });

    // دالة التنظيف
    return () => {
      animatableElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [observerOptions]);

  // إعداد التمرير السلس المحسّن
  const setupSmoothScrolling = useCallback(() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    const addEventListeners = () => {
      anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll as EventListener, {
          passive: false
        });
      });
    };

    const removeEventListeners = () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll as EventListener);
      });
    };

    addEventListeners();
    return removeEventListeners;
  }, [handleSmoothScroll]);

  // دمج جميع التأثيرات في useEffect واحد
  useEffect(() => {
    let cleanupObserver: (() => void) | undefined;
    let cleanupScrolling: (() => void) | undefined;

    // تأخير قصير للسماح للـ DOM بالتحميل الكامل
    const timeoutId = setTimeout(() => {
      cleanupObserver = setupIntersectionObserver();
      cleanupScrolling = setupSmoothScrolling();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanupObserver?.();
      cleanupScrolling?.();
    };
  }, [setupIntersectionObserver, setupSmoothScrolling]);

  // تحسين هيكل المكونات
  const pageComponents = useMemo<ComponentItem[]>(() => [
    { Component: Hero, key: 'hero' },
    { Component: ServicesSection, key: 'services' },
    { Component: WhyChooseUsSection, key: 'why-choose-us' },
    { Component: CentralAsiaSection, key: 'central-asia' },
    { Component: GulfCountriesSection, key: 'gulf-countries' },
    { Component: Testimonials, key: 'testimonials' },
    { Component: Newsletter, key: 'newsletter' },
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <MemoizedNavbar />

      <main
        className="space-y-4 sm:space-y-8"
        role="main"
        aria-label="المحتوى الرئيسي"
      >
        {pageComponents.map(({ Component, key }) => {
          try {
            return <Component key={key} />;
          } catch (error) {
            console.error(`Error rendering component ${key}:`, error);
            return (
              <div
                key={key}
                className="p-4 bg-red-50 border border-red-200 rounded-md"
                role="alert"
              >
                <p className="text-red-600">
                  حدث خطأ في تحميل هذا القسم. يرجى المحاولة مرة أخرى.
                </p>
              </div>
            );
          }
        })}
      </main>

      <MemoizedFooter />
    </div>
  );
};

export default Index;