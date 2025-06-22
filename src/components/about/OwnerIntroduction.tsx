import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArabicText from '@/components/ArabicText';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import ImageWithPlaceholder from '@/components/ui/ImageWithPlaceholder';

const OwnerIntroduction: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';



  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4 mr-2" />
            {isRTL ? (
              <ArabicText size="sm" weight="medium">
                {t('owner.chip')}
              </ArabicText>
            ) : (
              <span>{t('owner.chip')}</span>
            )}
          </div>

          {isRTL ? (
            <ArabicText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              size="4xl"
              weight="bold"
            >
              {t('owner.title')}
            </ArabicText>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('owner.title')}
            </h2>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Owner Image */}
          <AnimatedSection delay={0.2} direction="left" className={cn(isRTL ? "lg:order-2" : "lg:order-1")}>
            <ProfessionalCard variant="elevated" className="max-w-md mx-auto">
              <div className="relative">
                <ImageWithPlaceholder
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&auto=format&q=80"
                  alt={t('owner.name')}
                  className="w-full h-96 lg:h-[500px]"
                  aspectRatio="portrait"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Owner Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {isRTL ? (
                    <>
                      <ArabicText
                        as="h3"
                        className="text-2xl font-bold mb-2"
                        size="2xl"
                        weight="bold"
                      >
                        {t('owner.name')}
                      </ArabicText>
                      <ArabicText
                        as="p"
                        className="text-lg opacity-90"
                        size="lg"
                        weight="medium"
                      >
                        {t('owner.position')}
                      </ArabicText>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-2">{t('owner.name')}</h3>
                      <p className="text-lg opacity-90">{t('owner.position')}</p>
                    </>
                  )}
                </div>
              </div>
            </ProfessionalCard>
          </AnimatedSection>

          {/* Owner Content */}
          <div className={cn("space-y-8", isRTL ? "lg:order-1" : "lg:order-2")}>
            <AnimatedSection delay={0.3} direction="right">
              {isRTL ? (
                <ArabicText
                  as="p"
                  className="text-lg text-gray-700 leading-relaxed"
                  size="lg"
                  weight="normal"
                >
                  {t('owner.biography')}
                </ArabicText>
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('owner.biography')}
                </p>
              )}
            </AnimatedSection>

            <AnimatedSection delay={0.4} direction="right">
              <ProfessionalCard variant="glass" className="p-6">
                {isRTL ? (
                  <ArabicText
                    as="blockquote"
                    className="text-xl font-medium text-gray-800 italic"
                    size="xl"
                    weight="medium"
                  >
                    "{t('owner.vision')}"
                  </ArabicText>
                ) : (
                  <blockquote className="text-xl font-medium text-gray-800 italic">
                    "{t('owner.vision')}"
                  </blockquote>
                )}
              </ProfessionalCard>
            </AnimatedSection>


          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerIntroduction;
