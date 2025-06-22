import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Palmtree } from "lucide-react";
import ArabicText from "./ArabicText";

const GulfCountriesSection = () => {
  const { t, i18n } = useTranslation('services');
  const isRTL = i18n.dir() === 'rtl';

  const countries = t('gulfCountries.countries', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    flag: string;
  }>;

  // صور دول الخليج
  const countryImages = [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&crop=center&auto=format&q=80", // الإمارات - برج خليفة ودبي
    "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=500&h=300&fit=crop&crop=center&auto=format&q=80", // السعودية - الرياض الحديثة
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop&crop=center&auto=format&q=80"  // عُمان - مسجد السلطان قابوس الكبير
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            {t('gulfCountries.chip')}
          </div>

          {isRTL ? (
            <ArabicText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              weight="bold"
              size="4xl"
            >
              {t('gulfCountries.title')}
            </ArabicText>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('gulfCountries.title')}
            </h2>
          )}

          {isRTL ? (
            <ArabicText
              as="p"
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              weight="medium"
              size="lg"
            >
              {t('gulfCountries.subtitle')}
            </ArabicText>
          ) : (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('gulfCountries.subtitle')}
            </p>
          )}
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {countries.map((country, index) => {
            return (
              <div key={index}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-elegant hover:shadow-lg transition-shadow duration-300 h-full">
                  {/* Country Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={countryImages[index]}
                      alt={`${country.name} - ${isRTL ? 'وجهة سياحية مميزة' : 'Premium Travel Destination'}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // صورة بديلة في حالة فشل التحميل
                        e.currentTarget.src = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&crop=center&auto=format&q=80";
                      }}
                    />
                    <div className="absolute top-4 right-4 text-4xl bg-white/90 rounded-full p-2 shadow-lg">
                      {country.flag}
                    </div>
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Country Content */}
                  <div className="p-8">
                    {/* Country Name */}
                    {isRTL ? (
                      <ArabicText
                        as="h3"
                        className="text-2xl font-bold text-gray-900 mb-4"
                        weight="bold"
                        size="2xl"
                      >
                        {country.name}
                      </ArabicText>
                    ) : (
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {country.name}
                      </h3>
                    )}

                    {/* Country Description */}
                    {isRTL ? (
                      <ArabicText
                        as="p"
                        className="text-gray-600 leading-relaxed mb-6"
                        weight="normal"
                        size="md"
                      >
                        {country.description}
                      </ArabicText>
                    ) : (
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {country.description}
                      </p>
                    )}

                    {/* Decorative Element */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className={cn(
                        "flex items-center text-blue-600",
                        isRTL ? "flex-row-reverse" : "flex-row"
                      )}>
                        <Palmtree className="w-5 h-5 mr-2" />
                        {isRTL ? (
                          <ArabicText
                            as="span"
                            className="text-sm font-medium"
                            weight="medium"
                            size="sm"
                          >
                            وجهة مثالية للسياحة والأعمال
                          </ArabicText>
                        ) : (
                          <span className="text-sm font-medium">
                            Perfect for Tourism & Business
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default GulfCountriesSection;
