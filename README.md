# Dr White Group Website

## About Dr White Group

Dr White Group is a leading multi-service company specializing in:

### 🛫 Travel Services
- Flight bookings to Gulf countries
- Comprehensive Hajj & Umrah packages
- Visa assistance and travel insurance
- Group travel arrangements

### 🎓 Education Consulting
- Study abroad guidance for Central Asian countries
- University application assistance
- Scholarship guidance and visa support
- Pre-departure orientation and ongoing student support

### 🚢 Import/Export Consulting
- Export planning and documentation for Egyptian fruits
- Quality monitoring and market analysis
- Business partnerships facilitation
- Shipping and customs clearance

## Project Features

### 🌐 Multi-language Support
- **Arabic (RTL)** - Full right-to-left support
- **English (LTR)** - Left-to-right layout
- Dynamic language switching with persistent preferences

### 🎨 Modern Design
- Professional business-focused design
- Responsive layout for all devices
- Smooth animations and transitions
- Accessibility-compliant components

### 📞 Contact Page Features
- **Comprehensive Contact Form** - Multi-field form with validation
- **Service Selection** - Dropdown for different service types
- **Contact Information Display** - Address, phone, email, and hours
- **Interactive Elements** - Hover effects and animations
- **Mobile Optimized** - Fully responsive design
- **RTL Support** - Complete Arabic language support

### 🛠️ Technical Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with RTL support
- **shadcn/ui** for consistent UI components
- **react-i18next** for internationalization
- **Lucide React** for icons
- **Radix UI** for form components

### 📄 Available Pages
- **Home (/)** - Main landing page with all services
- **Contact (/contact)** - Comprehensive contact form and information
- **404 Page** - Custom not found page

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd drwhite-group

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production (optimized)
npm run build

# Build for development (with sourcemaps)
npm run build:dev

# Build and analyze bundle size
npm run build:analyze

# Preview production build
npm run preview

# Build and preview
npm run preview:build

# Lint code
npm run lint

# Lint and fix issues
npm run lint:fix

# Type checking
npm run type-check

# Clean build artifacts
npm run clean

# Alternative start command
npm run start
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ServicesSection.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── ...

public/
├── DWLOGO.png          # Company logo (PNG)
├── DWLOGO2.svg         # Company logo (SVG)
├── locales/            # Translation files (organized by namespaces)
│   ├── en/            # English translations
│   │   ├── common.json      # Navigation, app info, shared elements
│   │   ├── hero.json        # Hero section content
│   │   ├── services.json    # Services, testimonials, newsletter
│   │   ├── about.json       # About page and company info
│   │   ├── contact.json     # Contact forms and information
│   │   ├── footer.json      # Footer content and 404 page
│   │   └── faq.json         # Frequently asked questions
│   └── ar/            # Arabic translations (same structure)
│       ├── common.json
│       ├── hero.json
│       ├── services.json
│       ├── about.json
│       ├── contact.json
│       ├── footer.json
│       └── faq.json
└── ...

# Configuration files
├── vite.config.ts      # Main Vite configuration
├── vite.config.prod.ts # Production-specific configuration
├── .env.example        # Environment variables template
├── .env.local          # Local development variables
└── ...
```

## Vite Configuration

The project uses optimized Vite configurations:

### Development (`vite.config.ts`)
- Hot Module Replacement (HMR)
- Source maps enabled
- Development server on port 8080
- Automatic browser opening

### Production (`vite.config.prod.ts`)
- Optimized bundle splitting
- Console/debugger removal
- Compressed assets
- No source maps

### Key Optimizations
- **Code Splitting**: Separate chunks for vendor, UI, i18n, and utilities
- **Asset Optimization**: Optimized file naming and compression
- **Bundle Analysis**: Use `npm run build:analyze` to analyze bundle size
- **Caching**: Improved caching strategies

## Internationalization

The website supports both Arabic and English with:
- RTL (Right-to-Left) layout for Arabic
- LTR (Left-to-Right) layout for English
- Automatic language detection
- Persistent language preferences

### Adding Translations

The translation system is organized into separate namespaces for better maintainability:

**Available Namespaces:**
- `common.json` - Navigation, app info, and shared elements
- `hero.json` - Hero section content
- `services.json` - Services, testimonials, newsletter, and related content
- `about.json` - About page and company information
- `contact.json` - Contact forms and information
- `footer.json` - Footer content and 404 page
- `faq.json` - Frequently asked questions

**Adding New Translations:**
1. Choose the appropriate namespace file in `locales/en/` and `locales/ar/`
2. Add new keys to both language files
3. Use in components with `const { t } = useTranslation('namespace')`
4. For multiple namespaces: `const { t } = useTranslation(['namespace1', 'namespace2'])`
5. Access cross-namespace keys with: `t('namespace:key')`

**Examples:**
```typescript
// Single namespace
const { t } = useTranslation('services');
const title = t('services.title');

// Multiple namespaces
const { t } = useTranslation(['contact', 'common']);
const appTitle = t('common:app.title');
const contactTitle = t('contact.title');
```

## Deployment

The project can be deployed to any static hosting service:

- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- **AWS S3 + CloudFront**

Build the project with `npm run build` and deploy the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2025 Dr White Group. All rights reserved.
