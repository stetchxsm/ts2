import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArabicText from "@/components/ArabicText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { t, i18n } = useTranslation(['contact', 'faq']);
  const isRTL = i18n.dir() === 'rtl';

  // Ensure page starts from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: t('contact.form.error'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: t('contact.form.success'),
        description: t('contact.form.success')
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: isRTL ? "القاهرة، مصر" : "Cairo, Egypt",
      href: "https://maps.google.com/?q=Cairo,Egypt"
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: "+20 123 456 7890",
      href: "tel:+201234567890"
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: "info@drwhitegroup.com",
      href: "mailto:info@drwhitegroup.com"
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
      href: null
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Chip */}
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {isRTL ? (
                <ArabicText size="sm" weight="medium">
                  {t('contact.chip')}
                </ArabicText>
              ) : (
                <span>{t('contact.chip')}</span>
              )}
            </div>

            {/* Title */}
            {isRTL ? (
              <ArabicText
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900"
                size="4xl"
                weight="bold"
                align="center"
              >
                {t('contact.title')}
              </ArabicText>
            ) : (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
                {t('contact.title')}
              </h1>
            )}

            {/* Subtitle */}
            {isRTL ? (
              <ArabicText
                as="p"
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                size="xl"
                weight="normal"
                align="center"
              >
                {t('contact.subtitle')}
              </ArabicText>
            ) : (
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                {t('contact.subtitle')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                {isRTL ? (
                  <ArabicText
                    as="h2"
                    className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900"
                    size="2xl"
                    weight="bold"
                  >
                    {t('contact.sendMessageTitle')}
                  </ArabicText>
                ) : (
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
                    {t('contact.sendMessageTitle')}
                  </h2>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <ArabicText as={Label} htmlFor="name" size="sm" weight="medium">
                        {t('contact.form.name')}
                      </ArabicText>
                    ) : (
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                    )}
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t('contact.form.placeholders.name')}
                      className={cn(
                        "w-full form-field-focus transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400",
                        isRTL && "text-right font-arabic"
                      )}
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <ArabicText as={Label} htmlFor="email" size="sm" weight="medium">
                        {t('contact.form.email')}
                      </ArabicText>
                    ) : (
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                    )}
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t('contact.form.placeholders.email')}
                      className="w-full form-field-focus transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      dir="ltr"
                      required
                    />
                  </div>

                  {/* Service Field */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <ArabicText as={Label} htmlFor="service" size="sm" weight="medium">
                        {t('contact.form.service')}
                      </ArabicText>
                    ) : (
                      <Label htmlFor="service">{t('contact.form.service')}</Label>
                    )}
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className={cn("w-full form-field-focus transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400", isRTL && "text-right font-arabic")}>
                        <SelectValue placeholder={t('contact.form.selectService')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="travel">
                          {isRTL ? (
                            <ArabicText size="sm">{t('contact.form.services.travel')}</ArabicText>
                          ) : (
                            t('contact.form.services.travel')
                          )}
                        </SelectItem>
                        <SelectItem value="education">
                          {isRTL ? (
                            <ArabicText size="sm">{t('contact.form.services.education')}</ArabicText>
                          ) : (
                            t('contact.form.services.education')
                          )}
                        </SelectItem>
                        <SelectItem value="trade">
                          {isRTL ? (
                            <ArabicText size="sm">{t('contact.form.services.trade')}</ArabicText>
                          ) : (
                            t('contact.form.services.trade')
                          )}
                        </SelectItem>
                        <SelectItem value="general">
                          {isRTL ? (
                            <ArabicText size="sm">{t('contact.form.services.general')}</ArabicText>
                          ) : (
                            t('contact.form.services.general')
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    {isRTL ? (
                      <ArabicText as={Label} htmlFor="message" size="sm" weight="medium">
                        {t('contact.form.message')}
                      </ArabicText>
                    ) : (
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                    )}
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t('contact.form.placeholders.message')}
                      className={cn(
                        "w-full min-h-[120px] resize-none form-field-focus transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400",
                        isRTL && "text-right font-arabic"
                      )}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 md:py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg",
                      isRTL ? "flex-row-reverse" : "flex-row",
                      isSubmitting && "cursor-not-allowed"
                    )}
                  >
                    {!isSubmitting && <Send className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />}
                    {isSubmitting && (
                      <div className={cn("w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin", isRTL ? "ml-2" : "mr-2")} />
                    )}
                    {isRTL ? (
                      <ArabicText size="sm" weight="medium">
                        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                      </ArabicText>
                    ) : (
                      <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {isRTL ? (
                  <ArabicText
                    as="h2"
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    size="2xl"
                    weight="bold"
                  >
                    {t('contact.contactInfoTitle')}
                  </ArabicText>
                ) : (
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {t('contact.contactInfoTitle')}
                  </h2>
                )}

                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    const content = (
                      <div className={cn(
                        "flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-md",
                        isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
                      )}>
                        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          {isRTL ? (
                            <>
                              <ArabicText
                                as="h3"
                                className="font-semibold text-gray-900 mb-1"
                                size="md"
                                weight="semibold"
                              >
                                {item.label}
                              </ArabicText>
                              <ArabicText
                                as="p"
                                className="text-gray-600"
                                size="sm"
                                weight="normal"
                              >
                                {item.value}
                              </ArabicText>
                            </>
                          ) : (
                            <>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {item.label}
                              </h3>
                              <p className="text-gray-600">
                                {item.value}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={index}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block contact-card"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={index} className="contact-card">
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Map placeholder */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 md:h-64 flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="text-center">
                    <div className="p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300 mb-4">
                      <MapPin className="w-12 h-12 text-blue-600" />
                    </div>
                    {isRTL ? (
                      <ArabicText
                        as="p"
                        className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                        size="sm"
                        weight="medium"
                        align="center"
                      >
                        {t('contact.mapTitle')}
                      </ArabicText>
                    ) : (
                      <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300 font-medium">{t('contact.mapTitle')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              {isRTL ? (
                <ArabicText
                  as="h2"
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  size="3xl"
                  weight="bold"
                  align="center"
                >
                  {t('faq:faq.title')}
                </ArabicText>
              ) : (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('faq:faq.title')}
                </h2>
              )}

              {isRTL ? (
                <ArabicText
                  as="p"
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  size="lg"
                  weight="normal"
                  align="center"
                >
                  {t('faq:faq.subtitle')}
                </ArabicText>
              ) : (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('faq:faq.subtitle')}
                </p>
              )}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {(t('faq:faq.questions', { returnObjects: true }) as any[]).map((faq: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={cn(
                      "w-full p-6 text-left bg-white hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group faq-button",
                      isRTL && "text-right"
                    )}
                  >
                    {isRTL ? (
                      <ArabicText
                        as="span"
                        className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200"
                        size="md"
                        weight="medium"
                      >
                        {faq.question}
                      </ArabicText>
                    ) : (
                      <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{faq.question}</span>
                    )}
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6 bg-white border-t border-gray-100 faq-content">
                      {isRTL ? (
                        <ArabicText
                          as="p"
                          className="text-gray-700 leading-relaxed"
                          size="md"
                          weight="normal"
                        >
                          {faq.answer}
                        </ArabicText>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;