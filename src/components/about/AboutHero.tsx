import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArabicText from '@/components/ArabicText';
import ImageWithPlaceholder from '@/components/ui/ImageWithPlaceholder';

const AboutHero: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className={cn("space-y-8", isRTL ? "lg:order-2" : "lg:order-1")}>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                {isRTL ? (
                  <ArabicText size="sm" weight="medium">
                    {t('hero.chip')}
                  </ArabicText>
                ) : (
                  <span>{t('hero.chip')}</span>
                )}
              </div>
            </div>

            <div>
              {isRTL ? (
                <ArabicText
                  as="h1"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  size="4xl"
                  weight="bold"
                >
                  {t('hero.title')}
                </ArabicText>
              ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('hero.title')}
                </h1>
              )}
            </div>

            <div>
              {isRTL ? (
                <ArabicText
                  as="p"
                  className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                  size="xl"
                  weight="normal"
                >
                  {t('hero.subtitle')}
                </ArabicText>
              ) : (
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {t('hero.subtitle')}
                </p>
              )}
            </div>

            <div>
              <button
                className={cn(
                  "inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors",
                  isRTL ? "flex-row-reverse" : ""
                )}
              >
                {isRTL ? (
                  <>
                    <ArrowRight className={cn("w-5 h-5", isRTL ? "mr-2 rotate-180" : "ml-2")} />
                    <ArabicText size="lg" weight="semibold">
                      {t('hero.cta')}
                    </ArabicText>
                  </>
                ) : (
                  <>
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className={cn("relative", isRTL ? "lg:order-1" : "lg:order-2")}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <ImageWithPlaceholder
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
                  alt="Dr White Group Office"
                  className="w-full h-96 lg:h-[500px]"
                  aspectRatio="landscape"
                  objectFit="cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
