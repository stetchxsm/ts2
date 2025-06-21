import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, Globe, Users, 
  Award, Headphones, X, Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach((element) => observer.observe(element));

    return () => {
      animatableElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  // Reset animations when language changes
  useEffect(() => {
    const resetAnimations = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((element) => {
        element.classList.remove('animate-fade-in');
        // Force reflow
        void element.offsetHeight;
        element.classList.add('animate-fade-in');
      });
    };
    
    const timer = setTimeout(resetAnimations, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Form validation
      if (!formData.name || !formData.email || !formData.service) {
        throw new Error('Missing required fields');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error("Form submission error:", error);
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: "Cairo, Egypt",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: "+20 123 456 7890",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: "info@drwhitegroup.com",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: "Sun - Thu: 9AM - 6PM",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const features: Feature[] = [
    {
      icon: Globe,
      title: isRTL ? "خدمات عالمية" : "Global Services",
      description: isRTL ? "نخدم عملاءنا في أكثر من 10 دول حول العالم" : "We serve clients in over 10 countries worldwide"
    },
    {
      icon: Users,
      title: isRTL ? "فريق متخصص" : "Expert Team",
      description: isRTL ? "فريق من الخبراء المتخصصين في مختلف المجالات" : "Team of experts specialized in various fields"
    },
    {
      icon: Award,
      title: isRTL ? "جودة معتمدة" : "Certified Quality",
      description: isRTL ? "خدمات معتمدة وموثقة بأعلى معايير الجودة" : "Certified and documented services with highest quality standards"
    },
    {
      icon: Headphones,
      title: isRTL ? "دعم 24/7" : "24/7 Support",
      description: isRTL ? "دعم فني متواصل على مدار الساعة" : "Continuous technical support around the clock"
    }
  ];

  // Component for contact info card
  const ContactInfoCard: React.FC<ContactInfo> = ({ icon: Icon, label, value, color }) => (
    <div 
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
        activeSection === label ? "ring-2 ring-blue-500" : ""
      )}
      onClick={() => setActiveSection(label)}
      role="button"
      tabIndex={0}
      aria-pressed={activeSection === label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setActiveSection(label);
          e.preventDefault();
        }
      }}
    >
      <div className={cn("flex items-start", isRTL ? "space-x-reverse space-x-4" : "space-x-4")}>
        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold text-gray-900 mb-2",
              isRTL ? "font-arabic text-right" : "text-left"
            )}
            style={{
              fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
            }}
          >
            {label}
          </h3>
          <p
            className={cn(
              "text-gray-600",
              isRTL ? "font-arabic text-right" : "text-left"
            )}
            style={{
              fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  // Component for feature card
  const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => {
    const index = features.indexOf({ icon: Icon, title, description });
    return (
      <div
        key={title}
        className="text-center opacity-0 animate-on-scroll"
        style={{ animationDelay: `${0.6 + index * 0.1}s` }}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3
          className={cn(
            "text-lg font-semibold text-gray-900 mb-2",
            isRTL ? "font-arabic" : ""
          )}
          style={{
            fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
          }}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-gray-600",
            isRTL ? "font-arabic" : ""
          )}
          style={{
            fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
          }}
        >
          {description}
        </p>
      </div>
    );
  };

  // Component for form input
  const FormInput: React.FC<{
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    children?: React.ReactNode;
  }> = ({ id, name, type = "text", value, onChange, required = false, children }) => (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium text-gray-700 mb-2",
          isRTL ? "font-arabic text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      >
        {children}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
          isRTL ? "text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      />
    </div>
  );

  // Component for form select
  const FormSelect: React.FC<{
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    children: React.ReactNode;
  }> = ({ id, name, value, onChange, required = false, children }) => (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium text-gray-700 mb-2",
          isRTL ? "font-arabic text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      >
        {children}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
          isRTL ? "text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      >
        <option value="">{isRTL ? "اختر الخدمة" : "Select a service"}</option>
        <option value="travel">{isRTL ? "خدمات السفر" : "Travel Services"}</option>
        <option value="education">{isRTL ? "الاستشارات التعليمية" : "Education Consulting"}</option>
        <option value="trade">{isRTL ? "الاستيراد والتصدير" : "Import/Export"}</option>
      </select>
    </div>
  );

  // Component for form textarea
  const FormTextArea: React.FC<{
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
    children?: React.ReactNode;
  }> = ({ id, name, value, onChange, required = false, rows = 5, children }) => (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium text-gray-700 mb-2",
          isRTL ? "font-arabic text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      >
        {children}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className={cn(
          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none",
          isRTL ? "text-right" : "text-left"
        )}
        style={{
          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={cn(
                "inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
              aria-label={t('contact.chip')}
            >
              {t('contact.chip')}
            </div>
            
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.2s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
              id="hero-title"
            >
              {t('contact.title')}
            </h1>
            
            <p
              className={cn(
                "text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.4s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
              aria-labelledby="hero-title"
            >
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div 
              className="opacity-0 animate-on-scroll" 
              style={{ animationDelay: "0.8s" }}
              role="region"
              aria-labelledby="form-heading"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h2
                    id="form-heading"
                    className={cn(
                      "text-2xl md:text-3xl font-bold text-gray-900 mb-4",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "أرسل لنا رسالة" : "Send us a message"}
                  </h2>
                  
                  <p
                    className={cn(
                      "text-gray-600",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "سنتواصل معك في أقرب وقت ممكن" : "We'll get back to you as soon as possible"}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    >
                      {t('contact.form.name')}
                    </FormInput>
                    
                    <FormInput
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    >
                      {isRTL ? "رقم الهاتف" : "Phone Number"}
                    </FormInput>
                  </div>
                  
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  >
                    {t('contact.form.email')}
                  </FormInput>
                  
                  <FormSelect
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    {t('contact.form.service')}
                  </FormSelect>
                  
                  <FormTextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  >
                    {t('contact.form.message')}
                  </FormTextArea>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2",
                      isRTL ? "font-arabic space-x-reverse" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{isRTL ? "جاري الإرسال..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div
                      className={cn(
                        "flex items-center justify-center space-x-2 text-green-600 font-medium bg-green-50 p-4 rounded-xl",
                        isRTL ? "font-arabic space-x-reverse" : ""
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                      role="alert"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>{t('contact.form.success')}</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div
                      className={cn(
                        "flex items-center justify-center space-x-2 text-red-600 font-medium bg-red-50 p-4 rounded-xl",
                        isRTL ? "font-arabic space-x-reverse" : ""
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                      role="alert"
                    >
                      <X className="w-5 h-5" />
                      <span>{t('contact.form.error')}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div 
              className="opacity-0 animate-on-scroll" 
              style={{ animationDelay: "1s" }}
              role="region"
              aria-labelledby="info-heading"
            >
              <div className="space-y-8">
                <div>
                  <h2
                    id="info-heading"
                    className={cn(
                      "text-2xl md:text-3xl font-bold text-gray-900 mb-6",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "معلومات التواصل" : "Contact Information"}
                  </h2>
                </div>
                
                {contactInfo.map((info) => (
                  <ContactInfoCard key={info.label} {...info} />
                ))}
                
                {/* Map Placeholder */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3
                    className={cn(
                      "font-semibold text-gray-900 mb-4",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "موقعنا" : "Our Location"}
                  </h3>
                  <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" aria-hidden="true" />
                    <span className="sr-only">Our location map</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;