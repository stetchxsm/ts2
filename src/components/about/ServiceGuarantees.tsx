import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import ArabicText from '@/components/ArabicText';

const ServiceGuarantees: React.FC = () => {
  const { t, i18n } = useTranslation('about');
  const isRTL = i18n.dir() === 'rtl';

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Disclaimer Section */}
        <div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 lg:p-12">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium mb-4">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {isRTL ? (
                    <ArabicText size="sm" weight="medium">
                      {t('disclaimer.chip')}
                    </ArabicText>
                  ) : (
                    <span>{t('disclaimer.chip')}</span>
                  )}
                </div>

                {isRTL ? (
                  <>
                    <ArabicText
                      as="h3"
                      className="text-xl lg:text-2xl font-bold text-gray-900 mb-3"
                      size="2xl"
                      weight="bold"
                    >
                      {t('disclaimer.title')}
                    </ArabicText>
                    <ArabicText
                      as="p"
                      className="text-gray-700 max-w-3xl mx-auto"
                      size="md"
                      weight="normal"
                    >
                      {t('disclaimer.subtitle')}
                    </ArabicText>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                      {t('disclaimer.title')}
                    </h3>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                      {t('disclaimer.subtitle')}
                    </p>
                  </>
                )}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Warning */}
                <div className="space-y-4">
                  {isRTL ? (
                    <>
                      <ArabicText
                        as="h4"
                        className="text-xl font-bold text-red-700 flex items-center"
                        size="xl"
                        weight="bold"
                      >
                        <AlertTriangle className="w-5 h-5 ml-2" />
                        {t('disclaimer.content.warning.title')}
                      </ArabicText>
                      <ArabicText
                        as="p"
                        className="text-gray-700 leading-relaxed"
                        size="md"
                        weight="normal"
                      >
                        {t('disclaimer.content.warning.text')}
                      </ArabicText>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold text-red-700 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        {t('disclaimer.content.warning.title')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {t('disclaimer.content.warning.text')}
                      </p>
                    </>
                  )}
                </div>

                {/* Official Channels */}
                <div className="space-y-4">
                  {isRTL ? (
                    <>
                      <ArabicText
                        as="h4"
                        className="text-xl font-bold text-green-700 flex items-center"
                        size="xl"
                        weight="bold"
                      >
                        <CheckCircle className="w-5 h-5 ml-2" />
                        {t('disclaimer.content.official_channels.title')}
                      </ArabicText>
                      <ul className="space-y-2">
                        {(t('disclaimer.content.official_channels.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-1 ml-2 flex-shrink-0" />
                            <ArabicText
                              as="span"
                              className="text-gray-700"
                              size="sm"
                              weight="normal"
                            >
                              {item}
                            </ArabicText>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold text-green-700 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t('disclaimer.content.official_channels.title')}
                      </h4>
                      <ul className="space-y-2">
                        {(t('disclaimer.content.official_channels.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                {/* Non-Responsibility */}
                <div className="space-y-4">
                  {isRTL ? (
                    <>
                      <ArabicText
                        as="h4"
                        className="text-lg font-bold text-gray-900"
                        size="lg"
                        weight="bold"
                      >
                        {t('disclaimer.content.non_responsibility.title')}
                      </ArabicText>
                      <ul className="space-y-2">
                        {(t('disclaimer.content.non_responsibility.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 ml-2 flex-shrink-0"></div>
                            <ArabicText
                              as="span"
                              className="text-gray-700"
                              size="sm"
                              weight="normal"
                            >
                              {item}
                            </ArabicText>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-gray-900">
                        {t('disclaimer.content.non_responsibility.title')}
                      </h4>
                      <ul className="space-y-2">
                        {(t('disclaimer.content.non_responsibility.items', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Verification & Legal */}
                <div className="space-y-6">
                  {/* Verification */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <>
                        <ArabicText
                          as="h4"
                          className="text-lg font-bold text-blue-700"
                          size="lg"
                          weight="bold"
                        >
                          {t('disclaimer.content.verification.title')}
                        </ArabicText>
                        <ArabicText
                          as="p"
                          className="text-gray-700 text-sm leading-relaxed"
                          size="sm"
                          weight="normal"
                        >
                          {t('disclaimer.content.verification.text')}
                        </ArabicText>
                      </>
                    ) : (
                      <>
                        <h4 className="text-lg font-bold text-blue-700">
                          {t('disclaimer.content.verification.title')}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {t('disclaimer.content.verification.text')}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Legal Action */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <>
                        <ArabicText
                          as="h4"
                          className="text-lg font-bold text-purple-700"
                          size="lg"
                          weight="bold"
                        >
                          {t('disclaimer.content.legal_action.title')}
                        </ArabicText>
                        <ArabicText
                          as="p"
                          className="text-gray-700 text-sm leading-relaxed"
                          size="sm"
                          weight="normal"
                        >
                          {t('disclaimer.content.legal_action.text')}
                        </ArabicText>
                      </>
                    ) : (
                      <>
                        <h4 className="text-lg font-bold text-purple-700">
                          {t('disclaimer.content.legal_action.title')}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {t('disclaimer.content.legal_action.text')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGuarantees;
