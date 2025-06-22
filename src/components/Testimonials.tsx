import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient?: string;
  backgroundImage?: string;
  rating?: number;
  location?: string;
}

interface TestimonialData {
  content: string;
  author: string;
  role: string;
  gradient: string;
  rating?: number;
  location?: string;
}

// مكون بطاقة الشهادة المحسّن
const TestimonialCard = memo(({
  content,
  author,
  role,
  rating = 5,
  location
}: TestimonialProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        bg-white rounded-3xl p-8 h-full flex flex-col justify-between
        shadow-elegant hover:shadow-elegant-hover transform transition-all duration-500
        hover:-translate-y-2 relative overflow-hidden border border-gray-100
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Quote icon with animation */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
        <Quote className="w-6 h-6 text-blue-600 transform transition-transform duration-300 hover:scale-110" />
      </div>

      {/* Rating stars */}
      <div className="flex items-center mb-4 pr-16">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } transition-colors duration-200`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
      </div>

      <div className="relative z-10 flex-1">
        <p className="text-gray-700 text-lg mb-8 font-medium leading-relaxed pr-16 line-clamp-4">
          {`"${content}"`}
        </p>

        <div className="border-t border-gray-100 pt-6 mt-auto">
          <h4 className="font-semibold text-xl text-gray-900 mb-1 truncate">
            {author}
          </h4>
          <p className="text-blue-600 font-medium mb-1 truncate">
            {role}
          </p>
          {location && (
            <p className="text-gray-500 text-sm truncate">
              📍 {location}
            </p>
          )}
        </div>
      </div>

      {/* Animated gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 hover:from-blue-50/20 hover:to-blue-100/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('services');
  const [currentPage, setCurrentPage] = useState(0);

  // استخراج البيانات مع معالجة الأخطاء
  const testimonials = (() => {
    try {
      const data = t('testimonials.items', { returnObjects: true });
      return Array.isArray(data) ? data as TestimonialData[] : [];
    } catch (error) {
      console.warn('Failed to load testimonials data:', error);
      return [];
    }
  })();

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // التحكم في التنقل
  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // التحكم بالكيبورد
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // معالجة الحالة الفارغة
  if (testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="testimonials">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              {t('testimonials.chip', 'آراء العملاء')}
            </div>
            <h2 className="section-title mb-6">
              {t('testimonials.title', 'ماذا يقول عملاؤنا')}
            </h2>
            <p className="section-subtitle text-gray-500">
              لا توجد شهادات متاحة حالياً
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      id="testimonials"
      ref={sectionRef}
      aria-label="شهادات العملاء"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6 animate-pulse">
            {t('testimonials.chip', 'آراء العملاء')}
          </div>
          <h2 className="section-title mb-6">
            {t('testimonials.title', 'ماذا يقول عملاؤنا')}
          </h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            {t('testimonials.subtitle', 'تجارب حقيقية من عملائنا الكرام الذين وثقوا بخدماتنا المتميزة')}
          </p>
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mb-8 gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="الشهادة السابقة"
              disabled={totalPages <= 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`الصفحة ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="الشهادة التالية"
              disabled={totalPages <= 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${currentPage}-${index}`}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;