import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, TrendingUp, Target, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArabicText from '@/components/ArabicText';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProfessionalCard from '@/components/ui/ProfessionalCard';

const CompanyStory: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';

  const storyItems = [
    {
      icon: Calendar,
      title: t('story.founding.year'),
      content: t('story.founding.description'),
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      title: t('story.growth.title'),
      content: t('story.growth.description'),
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Target,
      title: t('story.mission.title'),
      content: t('story.mission.description'),
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Compass className="w-4 h-4 mr-2" />
            {isRTL ? (
              <ArabicText size="sm" weight="medium">
                {t('story.chip')}
              </ArabicText>
            ) : (
              <span>{t('story.chip')}</span>
            )}
          </div>

          {isRTL ? (
            <ArabicText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              size="4xl"
              weight="bold"
            >
              {t('story.title')}
            </ArabicText>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('story.title')}
            </h2>
          )}
        </AnimatedSection>

        {/* Story Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-green-200 to-purple-200 rounded-full hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {storyItems.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                  index % 2 === 1 && !isRTL ? "lg:grid-flow-col-dense" : "",
                  index % 2 === 0 && isRTL ? "lg:grid-flow-col-dense" : ""
                )}>
                  {/* Content */}
                  <div className={cn(
                    "space-y-6",
                    index % 2 === 1 && !isRTL ? "lg:col-start-2" : "",
                    index % 2 === 0 && isRTL ? "lg:col-start-2" : ""
                  )}>
                    <ProfessionalCard variant="elevated" className="p-8">
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center",
                          item.bgColor
                        )}>
                          <item.icon className={cn("w-8 h-8", item.iconColor)} />
                        </div>

                        <div className="flex-1 min-w-0">
                          {isRTL ? (
                            <>
                              <ArabicText
                                as="h3"
                                className="text-2xl font-bold text-gray-900 mb-4"
                                size="2xl"
                                weight="bold"
                              >
                                {item.title}
                              </ArabicText>
                              <ArabicText
                                as="p"
                                className="text-lg text-gray-700 leading-relaxed"
                                size="lg"
                                weight="normal"
                              >
                                {item.content}
                              </ArabicText>
                            </>
                          ) : (
                            <>
                              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {item.title}
                              </h3>
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {item.content}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </ProfessionalCard>
                  </div>

                  {/* Visual Element */}
                  <div className={cn(
                    "relative",
                    index % 2 === 1 && !isRTL ? "lg:col-start-1" : "",
                    index % 2 === 0 && isRTL ? "lg:col-start-1" : ""
                  )}>
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                    >
                      <div className={cn(
                        "w-full h-64 lg:h-80 rounded-3xl bg-gradient-to-br",
                        item.color,
                        "flex items-center justify-center relative overflow-hidden"
                      )}>
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                          }}></div>
                        </div>

                        {/* Large Icon */}
                        <item.icon className="w-24 h-24 text-white/80" />

                        {/* Timeline Dot */}
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-200 hidden lg:block"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
