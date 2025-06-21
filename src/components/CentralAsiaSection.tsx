import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import ArabicText from "./ArabicText";

const CentralAsiaSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const countries = t('centralAsia.countries', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    flag: string;
  }>;

  // صور دول آسيا الوسطى
  const countryImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center&auto=format&q=80", // قيرغيزستان - جبال تيان شان
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop&crop=center&auto=format&q=80", // أوزبكستان - ريجستان سمرقند
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop&crop=center&auto=format&q=80"  // طاجيكستان - جبال بامير
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
            {t('centralAsia.chip')}
          </div>

          {isRTL ? (
            <ArabicText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              weight="bold"
              size="4xl"
            >
              {t('centralAsia.title')}
            </ArabicText>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('centralAsia.title')}
            </h2>
          )}

          {isRTL ? (
            <ArabicText
              as="p"
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              weight="medium"
              size="lg"
            >
              {t('centralAsia.subtitle')}
            </ArabicText>
          ) : (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('centralAsia.subtitle')}
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
                        e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center&auto=format&q=80";
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
                        "flex items-center text-green-600",
                        isRTL ? "flex-row-reverse" : "flex-row"
                      )}>
                        <Users className="w-5 h-5 mr-2" />
                        {isRTL ? (
                          <ArabicText
                            as="span"
                            className="text-sm font-medium"
                            weight="medium"
                            size="sm"
                          >
                            وجهة مميزة للسفر والدراسة
                          </ArabicText>
                        ) : (
                          <span className="text-sm font-medium">
                            Premium Travel & Study Destination
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

export default CentralAsiaSection;
