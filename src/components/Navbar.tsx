import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// مكون NavItem (تم دمجه داخليًا)
const NavItem = React.memo(({
  href,
  children,
  isActive = false,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const baseClasses = "nav-link transition-colors duration-200 hover:text-blue-600";
  const activeClasses = "text-blue-600";

  return href.startsWith('#') ? (
    <a
      href={href}
      onClick={onClick}
      className={cn(baseClasses, isActive && activeClasses)}
    >
      {children}
    </a>
  ) : (
    <Link
      to={href}
      className={cn(baseClasses, isActive && activeClasses)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});

// مكون MobileNavItem (تم دمجه داخليًا)
const MobileNavItem = React.memo(({
  href,
  children,
  isActive = false,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const baseClasses = "text-xl font-medium py-4 px-6 w-full text-center rounded-lg hover:bg-gray-100 transition-colors duration-200";
  const activeClasses = isActive ? "text-blue-600 bg-blue-50" : "text-gray-700";

  return href.startsWith('#') ? (
    <a
      href={href}
      className={cn(baseClasses, activeClasses)}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <Link
      to={href}
      className={cn(baseClasses, activeClasses)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});

// المكون الرئيسي
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpenRef = useRef(isMenuOpen);
  const { t, i18n } = useTranslation('common');
  const location = useLocation();
  const isRTL = i18n.dir() === 'rtl';

  // تحديث ref عند تغيير حالة القائمة
  useEffect(() => {
    menuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // تحسين معالج التمرير
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newValue = !prev;
      document.body.style.overflow = newValue ? 'hidden' : '';
      return newValue;
    });
  }, []);

  // تنظيف overflow عند إلغاء تركيب المكون
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // تنفيذ التنقل المحسن
  const handleNavigation = useCallback((href: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';

    // Handle hash links on home page
    if (href.startsWith('#') && location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        const offset = window.innerWidth < 768 ? 100 : 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
    // Handle hash links from other pages - navigate to home first
    else if (href.startsWith('#') && location.pathname !== '/') {
      // Navigate to home page with hash
      window.location.href = '/' + href;
    }
  }, [location.pathname]);

  // تحديد النشاط بناءً على الرابط
  const isActiveLink = (href: string) => {
    return location.pathname === href || (href === '/' && location.pathname === '/');
  };

  return (
    <>
      {/* الشريط الثابت */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* الشعار */}
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label={t('app.title')}
          >
            <img
              src="/DWLOGO.png"
              alt={t('app.title')}
              className="h-16 sm:h-20 md:h-22"
              loading="eager"
            />
          </Link>

          {/* التنقل للسطح المكتب */}
          <nav
            className={cn(
              "hidden md:flex items-center",
              isRTL ? "space-x-reverse space-x-8" : "space-x-8"
            )}
            role="navigation"
            aria-label={t('navigation.desktopMenu')}
          >
            <NavItem
              href="/"
              isActive={isActiveLink("/")}
              onClick={() => handleNavigation("/")}
            >
              {t('navigation.home')}
            </NavItem>
            <NavItem
              href="/about"
              isActive={isActiveLink("/about")}
              onClick={() => handleNavigation("/about")}
            >
              {t('navigation.about')}
            </NavItem>
            <NavItem
              href="#services"
              isActive={location.hash === '#services'}
              onClick={() => handleNavigation("#services")}
            >
              {t('navigation.services')}
            </NavItem>
            <NavItem
              href="/contact"
              isActive={isActiveLink("/contact")}
              onClick={() => handleNavigation("/contact")}
            >
              {t('navigation.contact')}
            </NavItem>
          </nav>

          {/* مبدل اللغة + زر القائمة */}
          <div
            className={cn(
              "flex items-center",
              isRTL ? "space-x-reverse space-x-2" : "space-x-2"
            )}
          >
            <LanguageSwitcher />
            <button
              className="md:hidden text-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* القائمة الجوال */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none",
          isRTL && "text-right"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">
          {t('navigation.mobileMenu')}
        </h2>

        <nav
          className="flex flex-col space-y-6 items-center mt-8"
          role="navigation"
          aria-label={t('navigation.mobileMenu')}
        >
          <MobileNavItem
            href="/"
            isActive={isActiveLink("/")}
            onClick={() => handleNavigation("/")}
          >
            {t('navigation.home')}
          </MobileNavItem>
          <MobileNavItem
            href="/about"
            isActive={isActiveLink("/about")}
            onClick={() => handleNavigation("/about")}
          >
            {t('navigation.about')}
          </MobileNavItem>
          <MobileNavItem
            href="#services"
            isActive={location.hash === '#services'}
            onClick={() => handleNavigation("#services")}
          >
            {t('navigation.services')}
          </MobileNavItem>
          <MobileNavItem
            href="/contact"
            isActive={isActiveLink("/contact")}
            onClick={() => handleNavigation("/contact")}
          >
            {t('navigation.contact')}
          </MobileNavItem>

          <div className={cn(
            "py-4 px-6 w-full flex border-t border-gray-200 mt-4",
            isRTL ? "justify-end" : "justify-center"
          )}>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      {/* طبقة الخلفية */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;