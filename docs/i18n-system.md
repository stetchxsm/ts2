# نظام الترجمة المحسّن - Dr White Group

## نظرة عامة

تم تنظيم نظام الترجمة في مشروع Dr White Group باستخدام **namespaces منفصلة** لسهولة الصيانة والتطوير. بدلاً من ملف ترجمة واحد كبير، تم تقسيم الترجمات إلى ملفات منطقية منفصلة.

## هيكل الملفات

```
public/locales/
├── en/                     # الترجمات الإنجليزية
│   ├── common.json         # العناصر المشتركة والتنقل
│   ├── hero.json           # قسم البطل الرئيسي
│   ├── services.json       # الخدمات والشهادات والنشرة البريدية
│   ├── about.json          # صفحة من نحن ومعلومات الشركة
│   ├── contact.json        # نماذج الاتصال والمعلومات
│   ├── footer.json         # التذييل وصفحة 404
│   └── faq.json           # الأسئلة الشائعة
└── ar/                     # الترجمات العربية (نفس الهيكل)
    ├── common.json
    ├── hero.json
    ├── services.json
    ├── about.json
    ├── contact.json
    ├── footer.json
    └── faq.json
```

## تفاصيل كل Namespace

### 1. common.json
يحتوي على:
- معلومات التطبيق (`app.title`, `app.description`)
- عناصر التنقل (`navigation.*`)
- مبدل اللغة (`language.*`)
- العناصر المشتركة (`common.*`)

### 2. hero.json
يحتوي على:
- محتوى قسم البطل الرئيسي (`hero.*`)

### 3. services.json
يحتوي على:
- معلومات الخدمات (`services.*`)
- شهادات العملاء (`testimonials.*`)
- النشرة البريدية (`newsletter.*`)
- أسباب اختيارنا (`whyChooseUs.*`)
- رسالة الشركة (`mission.*`)
- دول آسيا الوسطى (`centralAsia.*`)
- دول الخليج (`gulfCountries.*`)

### 4. about.json
يحتوي على:
- معلومات الشركة الأساسية (`about.*`)
- صفحة من نحن الكاملة (`aboutPage.*`)

### 5. contact.json
يحتوي على:
- نماذج الاتصال (`contact.form.*`)
- معلومات الاتصال (`contact.info.*`)
- التواجد العالمي (`contact.globalPresence.*`)

### 6. footer.json
يحتوي على:
- محتوى التذييل (`footer.*`)
- صفحة 404 (`notFound.*`)

### 7. faq.json
يحتوي على:
- الأسئلة الشائعة (`faq.*`)

## كيفية الاستخدام في المكونات

### استخدام namespace واحد
```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('services');
  
  return (
    <h1>{t('services.title')}</h1>
  );
};
```

### استخدام عدة namespaces
```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation(['contact', 'common']);
  
  return (
    <div>
      <h1>{t('contact.title')}</h1>
      <p>{t('common:app.description')}</p>
    </div>
  );
};
```

### الوصول لـ namespace مختلف
```typescript
// عند استخدام عدة namespaces
const title = t('common:app.title');
const contactTitle = t('contact.title');
```

## إعدادات i18next

```typescript
// src/i18n.ts
i18n.init({
  ns: ['common', 'hero', 'services', 'about', 'contact', 'footer', 'faq'],
  defaultNS: 'common',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  // ... باقي الإعدادات
});
```

## مزايا النظام الجديد

### 1. سهولة الصيانة
- ملفات أصغر وأكثر تنظيماً
- سهولة العثور على الترجمات المطلوبة
- تقليل التعارضات عند العمل الجماعي

### 2. تحسين الأداء
- تحميل الترجمات حسب الحاجة
- تقليل حجم الملفات المحملة
- تحسين سرعة التطبيق

### 3. تنظيم أفضل
- تجميع منطقي للترجمات
- سهولة إضافة ترجمات جديدة
- هيكل واضح ومفهوم

## إرشادات للمطورين

### إضافة ترجمة جديدة
1. حدد الـ namespace المناسب
2. أضف المفتاح في ملف اللغة الإنجليزية
3. أضف الترجمة المقابلة في ملف اللغة العربية
4. استخدم الـ namespace المناسب في المكون

### إنشاء namespace جديد
1. أنشئ ملف JSON جديد في مجلدي `en` و `ar`
2. أضف الـ namespace إلى قائمة `ns` في `src/i18n.ts`
3. استخدم الـ namespace الجديد في المكونات

### أفضل الممارسات
- استخدم أسماء مفاتيح وصفية وواضحة
- حافظ على التناسق في هيكل المفاتيح
- اختبر الترجمات في كلا اللغتين
- تأكد من دعم RTL للنصوص العربية

## استكشاف الأخطاء

### مشكلة: الترجمة لا تظهر
- تأكد من استخدام الـ namespace الصحيح
- تحقق من وجود المفتاح في ملف الترجمة
- تأكد من صحة مسار الملف

### مشكلة: خطأ في تحميل الترجمة
- تحقق من صحة JSON syntax
- تأكد من وجود الملف في المسار الصحيح
- راجع console للأخطاء التفصيلية

## الخلاصة

النظام الجديد يوفر:
- **تنظيم أفضل**: ملفات منفصلة لكل قسم
- **صيانة أسهل**: تعديل ترجمات محددة دون التأثير على الباقي
- **أداء محسّن**: تحميل الترجمات حسب الحاجة
- **تطوير أسرع**: سهولة العثور على الترجمات وتعديلها
