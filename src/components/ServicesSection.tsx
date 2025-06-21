import React from "react";
import { useTranslation } from "react-i18next";
import { Plane, GraduationCap, Ship } from "lucide-react";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Plane,
      title: t('services.travel.title'),
      description: t('services.travel.description'),
      features: t('services.travel.features', { returnObjects: true }) as string[],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: GraduationCap,
      title: t('services.education.title'),
      description: t('services.education.description'),
      features: t('services.education.features', { returnObjects: true }) as string[],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Ship,
      title: t('services.trade.title'),
      description: t('services.trade.description'),
      features: t('services.trade.features', { returnObjects: true }) as string[],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            {t('services.chip')}
          </div>
          <h2 className="section-title mb-6">
            {t('services.title')}
          </h2>
          <p className="section-subtitle mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-elegant hover:shadow-elegant-hover transition-all duration-500 hover:translate-y-[-5px]">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color}`}></div>
                
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${service.iconColor.replace('text-', 'bg-')} mt-2 mr-3 flex-shrink-0`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
