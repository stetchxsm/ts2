import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Quote, Star } from 'lucide-react';
import ArabicText from '@/components/ArabicText';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProfessionalCard from '@/components/ui/ProfessionalCard';

const StudentSuccess: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';

  const stories = t('success.stories', { returnObjects: true }) as Array<{
    name: string;
    country: string;
    achievement: string;
    quote: string;
    year: string;
  }>;

  return (
    <section className="py-16 lg:py-28 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            {isRTL ? (
              <ArabicText size="sm" weight="medium">
                {t('success.chip')}
              </ArabicText>
            ) : (
              <span>{t('success.chip')}</span>
            )}
          </div>

          {isRTL ? (
            <>
              <ArabicText
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                size="4xl"
                weight="bold"
              >
                {t('success.title')}
              </ArabicText>
              <ArabicText
                as="p"
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                size="xl"
                weight="normal"
              >
                {t('success.subtitle')}
              </ArabicText>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('success.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('success.subtitle')}
              </p>
            </>
          )}
        </AnimatedSection>

        {/* Success Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction="up"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <ProfessionalCard variant="elevated" className="h-full p-8 group">
                  <div className="space-y-6">
                    {/* Quote Icon */}
                    <div className="flex justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Quote */}
                    {isRTL ? (
                      <ArabicText
                        as="blockquote"
                        className="text-lg text-gray-700 italic leading-relaxed text-center"
                        size="lg"
                        weight="normal"
                      >
                        "{story.quote}"
                      </ArabicText>
                    ) : (
                      <blockquote className="text-lg text-gray-700 italic leading-relaxed text-center">
                        "{story.quote}"
                      </blockquote>
                    )}

                    {/* Student Info */}
                    <div className="text-center space-y-2">
                      {isRTL ? (
                        <>
                          <ArabicText
                            as="h4"
                            className="text-xl font-bold text-gray-900"
                            size="xl"
                            weight="bold"
                          >
                            {story.name}
                          </ArabicText>
                          <ArabicText
                            as="p"
                            className="text-blue-600 font-medium"
                            size="md"
                            weight="medium"
                          >
                            {story.achievement}
                          </ArabicText>
                          <ArabicText
                            as="p"
                            className="text-gray-500 text-sm"
                            size="sm"
                            weight="normal"
                          >
                            {story.country} • {story.year}
                          </ArabicText>
                        </>
                      ) : (
                        <>
                          <h4 className="text-xl font-bold text-gray-900">{story.name}</h4>
                          <p className="text-blue-600 font-medium">{story.achievement}</p>
                          <p className="text-gray-500 text-sm">{story.country} • {story.year}</p>
                        </>
                      )}
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </ProfessionalCard>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentSuccess;
