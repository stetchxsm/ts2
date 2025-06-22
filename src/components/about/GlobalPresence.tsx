import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Globe, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArabicText from '@/components/ArabicText';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import ImageWithPlaceholder from '@/components/ui/ImageWithPlaceholder';

const GlobalPresence: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';

  const globalFeatures = [
    {
      icon: Globe,
      title: t('office.global.coverage'),
      description: t('office.global.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Users,
      title: t('office.global.agents'),
      description: "Professional network spanning multiple continents",
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Clock,
      title: t('office.global.support'),
      description: "Round-the-clock assistance for all your needs",
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            {isRTL ? (
              <ArabicText size="sm" weight="medium">
                {t('office.chip')}
              </ArabicText>
            ) : (
              <span>{t('office.chip')}</span>
            )}
          </div>

          {isRTL ? (
            <ArabicText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              size="4xl"
              weight="bold"
            >
              {t('office.title')}
            </ArabicText>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('office.title')}
            </h2>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Main Office */}
          <AnimatedSection delay={0.2} direction="left">
            <ProfessionalCard variant="elevated" className="overflow-hidden">
              <div className="relative">
                <ImageWithPlaceholder
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
                  alt="Bishkek Office"
                  className="w-full h-64"
                  aspectRatio="landscape"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {isRTL ? (
                    <ArabicText
                      as="h3"
                      className="text-2xl font-bold mb-2"
                      size="2xl"
                      weight="bold"
                    >
                      {t('office.main.title')}
                    </ArabicText>
                  ) : (
                    <h3 className="text-2xl font-bold mb-2">{t('office.main.title')}</h3>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      {isRTL ? (
                        <>
                          <ArabicText
                            as="p"
                            className="font-semibold text-gray-900"
                            size="md"
                            weight="semibold"
                          >
                            {t('office.main.address')}
                          </ArabicText>
                          <ArabicText
                            as="p"
                            className="text-gray-600"
                            size="sm"
                            weight="normal"
                          >
                            {t('office.main.street')}
                          </ArabicText>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-900">{t('office.main.address')}</p>
                          <p className="text-gray-600">{t('office.main.street')}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {isRTL ? (
                    <ArabicText
                      as="p"
                      className="text-gray-700 leading-relaxed"
                      size="md"
                      weight="normal"
                    >
                      {t('office.main.description')}
                    </ArabicText>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {t('office.main.description')}
                    </p>
                  )}
                </div>
              </div>
            </ProfessionalCard>
          </AnimatedSection>

          {/* Global Network */}
          <AnimatedSection delay={0.4} direction="right">
            <div className="space-y-6">
              {isRTL ? (
                <ArabicText
                  as="h3"
                  className="text-3xl font-bold text-gray-900 mb-6"
                  size="3xl"
                  weight="bold"
                >
                  {t('office.global.title')}
                </ArabicText>
              ) : (
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('office.global.title')}
                </h3>
              )}

              <div className="space-y-4">
                {globalFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    <ProfessionalCard variant="glass" className="p-6" hoverEffect={false}>
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                          feature.bgColor
                        )}>
                          <feature.icon className={cn("w-6 h-6", feature.color)} />
                        </div>

                        <div className="flex-1 min-w-0">
                          {isRTL ? (
                            <>
                              <ArabicText
                                as="h4"
                                className="text-lg font-semibold text-gray-900 mb-2"
                                size="lg"
                                weight="semibold"
                              >
                                {feature.title}
                              </ArabicText>
                              <ArabicText
                                as="p"
                                className="text-gray-600"
                                size="md"
                                weight="normal"
                              >
                                {feature.description}
                              </ArabicText>
                            </>
                          ) : (
                            <>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                              </h4>
                              <p className="text-gray-600">{feature.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </ProfessionalCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
