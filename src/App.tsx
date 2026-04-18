import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, CheckCircle2 } from 'lucide-react';
import { translations, Language } from './translations';

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('FR');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'web-design' | 'social-media' | 'ads'>('home');

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRTL = language === 'AR';
  const t = translations[language];
  const languages: Language[] = ['FR', 'EN', 'AR', 'IT', 'ES'];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // adjust for sticky header
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: t.nav_home, id: 'home' },
    { name: t.nav_about, id: 'about' },
    { name: t.nav_services, id: 'services' },
    { name: t.nav_contact, id: 'contact' },
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const businessName = formData.get('businessName');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const decodedMessage = `*Nouveau Message de Contact:*
*Nom:* ${name}
*Entreprise:* ${businessName}
*Téléphone:* ${phone}
*Message:* ${message}`;
    
    // 0721121492 with country code 212
    const whatsappUrl = `https://wa.me/212721121492?text=${encodeURIComponent(decodedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={cn("min-h-screen bg-white text-text-main font-sans")}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[100px] md:h-[120px] bg-white z-50 border-b border-[#F3F4F6] flex items-center justify-between px-6 lg:px-10 transition-all duration-300">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
          <img 
            src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776534353/Gemini_Generated_Image_l23co1l23co1l23c_stdouo.png" 
            alt="hamz1 Digital Logo" 
            className="h-20 md:h-24 w-auto object-contain rounded-full border border-gray-100"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => scrollToSection(link.id)}
                  className="font-medium text-[14px] text-text-main hover:text-brand-blue transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 ml-5">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-[12px] font-semibold text-text-muted hover:text-brand-blue transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                {language}
              </button>
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-[#F3F4F6] shadow-soft rounded-md overflow-hidden py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer",
                        language === lang ? "text-brand-blue font-semibold bg-[#E6F6FF]/50" : "text-text-main"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a 
              href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-md font-semibold text-[14px] transition-colors inline-block text-center"
            >
              {t.hero_cta}
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600"
            >
              <Globe className="w-4 h-4" />
              {language}
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden py-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangMenuOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                      language === lang ? "text-brand-blue font-semibold bg-blue-50/50" : "text-gray-700"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-brand-blue transition-colors p-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-white z-40 p-6 shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-6 items-center pt-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="font-hero text-xl font-medium text-gray-800 hover:text-brand-blue"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li className="mt-4">
                <a 
                  href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3 rounded-md font-semibold text-[16px] shadow-soft transition-colors inline-block text-center w-full"
                >
                  {t.hero_cta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
        <section id="home" className="relative h-auto min-h-[500px] md:min-h-[700px] flex flex-col items-center justify-center text-center px-6 lg:px-[100px] py-24 md:py-32 overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/ddfazkkij/video/upload/q_auto/f_auto/v1776527042/Workspace_with_laptop_202604181742_j4wwaq.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center mt-10 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-[#FFC107] font-bold px-5 py-2.5 rounded-full text-[13px] sm:text-[15px] uppercase tracking-wider mb-6 md:mb-8 text-center max-w-[90vw] whitespace-normal">
                {t.hero_subtitle}
              </div>
              <h1 className="font-sans text-[36px] sm:text-[48px] md:text-[60px] font-extrabold text-white leading-[1.1] mb-6 drop-shadow-md">
                {t.hero_title_1} <br className="hidden sm:block" /> {t.hero_title_2}
              </h1>
              <p className="text-[16px] sm:text-[20px] text-gray-200 max-w-[600px] mb-10 drop-shadow">
                {t.hero_desc}
              </p>
              
              <a 
                href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-4 rounded-md font-bold text-[16px] md:text-[18px] shadow-lg hover:shadow-xl transition-all inline-block text-center hover:-translate-y-1 transform duration-200"
              >
                {t.hero_cta}
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto md:mx-0 rounded-[12px] overflow-hidden shadow-soft">
              <img 
                src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776517491/Gemini_Generated_Image_j6jjcwj6jjcwj6jj_ulzrjo.png" 
                alt="Hamza Melmlouch" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.1em] text-brand-blue font-bold mb-3">{t.nav_about}</p>
              <h2 className="font-sans text-[28px] sm:text-[32px] font-extrabold text-[#111827] leading-[1.2] mb-6">
                {t.about_title}
              </h2>
              <p className="text-[16px] text-text-main font-semibold mb-4">
                {t.about_greeting}
              </p>
              <p className="text-[14px] text-text-muted mb-4 leading-relaxed">
                {t.about_p1}
              </p>
              <p className="text-[14px] text-text-muted mb-8 leading-relaxed">
                {t.about_p2}
              </p>
              
              <h3 className="font-sans text-[20px] font-bold text-[#111827] mb-4">
                {t.about_what_i_do}
              </h3>
              <p className="text-[14px] text-text-muted mb-4 leading-relaxed">
                {t.about_what_i_do_p1}
              </p>
              <p className="text-[14px] text-text-muted mb-6 leading-relaxed">
                {t.about_what_i_do_p2}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[14px] text-[#111827] block mb-1">{t.about_service_1_title}</strong>
                    <span className="text-[14px] text-text-muted leading-relaxed">{t.about_service_1_desc}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[14px] text-[#111827] block mb-1">{t.about_service_2_title}</strong>
                    <span className="text-[14px] text-text-muted leading-relaxed">{t.about_service_2_desc}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[14px] text-[#111827] block mb-1">{t.about_service_3_title}</strong>
                    <span className="text-[14px] text-text-muted leading-relaxed">{t.about_service_3_desc}</span>
                  </div>
                </li>
              </ul>
              
              <h3 className="font-sans text-[20px] font-bold text-[#111827] mb-4">
                {t.about_why_title}
              </h3>
              <p className="text-[14px] text-text-muted mb-0 leading-relaxed">
                {t.about_why_desc}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-[#EBE8E1] px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <p className="text-[12px] uppercase tracking-[0.1em] text-gray-500 font-bold mb-3">{t.services_title}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  id: 'web-design',
                  title: t.services_1_title,
                  emoji: "💻",
                },
                {
                  id: 'social-media',
                  title: t.services_2_title,
                  emoji: "📱",
                },
                {
                  id: 'ads',
                  title: t.services_3_title,
                  emoji: "🎯",
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (service.id === 'web-design') {
                      setActivePage('web-design');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    } else if (service.id === 'social-media') {
                      setActivePage('social-media');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    } else if (service.id === 'ads') {
                      setActivePage('ads');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  }}
                  className="relative bg-white rounded-[32px] p-8 min-h-[260px] flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  {/* The Cutout Notch */}
                  <div className="absolute top-0 right-0 w-[56px] h-[56px] bg-[#EBE8E1] rounded-bl-[28px] z-10 flex items-start justify-end p-2 transition-colors">
                    {/* Swoop Left */}
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="absolute top-0 -left-[24px] fill-[#EBE8E1]">
                      <path d="M0 0 A 24 24 0 0 1 24 24 L 24 0 Z" />
                    </svg>
                    {/* Swoop Bottom */}
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="absolute bottom-[0px] right-0 translate-y-full fill-[#EBE8E1]">
                      <path d="M0 0 A 24 24 0 0 1 24 24 L 24 0 Z" />
                    </svg>
                    
                    {/* Action Button inside Notch */}
                    <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-brand-blue text-gray-700 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-sans text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.3] max-w-[75%] z-20 mt-1">
                    {service.title.split('\n').map((line, i) => (
                      <span key={i}>{line}<br/></span>
                    ))}
                  </h3>
                  
                  {/* Graphic Bottom Right */}
                  <div className="absolute bottom-6 right-6 text-[56px] leading-none transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    {service.emoji}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-6 bg-white border-t border-[#F3F4F6]">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Contact Info & Call to action */}
              <div>
                <p className="text-[12px] uppercase tracking-[0.1em] text-brand-blue font-bold mb-3">{t.contact_title}</p>
                <div className="flex items-center gap-[12px] mt-6">
                  <a 
                    href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[10px] bg-[#25D366] hover:bg-[#20BE5A] text-white px-5 py-3 rounded-[8px] font-bold text-[14px] transition-colors"
                  >
                    <span className="font-arabic">{t.contact_whatsapp}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <p className="text-[12px] text-text-muted leading-tight">
                    {t.contact_or_form}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="bg-bg-light p-6 lg:p-8 rounded-[12px] border border-[#F3F4F6] shadow-soft">
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-[12px] font-semibold text-text-main mb-1.5">
                      {t.contact_name}
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full px-3 py-2.5 rounded-[6px] border border-[#E5E7EB] text-[14px] outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all bg-white"
                      placeholder={t.contact_name_ph}
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-[12px] font-semibold text-text-main mb-1.5">
                      {t.contact_email}
                    </label>
                    <input 
                      type="text" 
                      id="businessName" 
                      name="businessName"
                      required
                      className="w-full px-3 py-2.5 rounded-[6px] border border-[#E5E7EB] text-[14px] outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all bg-white"
                      placeholder={t.contact_email_ph}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[12px] font-semibold text-text-main mb-1.5">
                      {t.contact_phone}
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      className="w-full px-3 py-2.5 rounded-[6px] border border-[#E5E7EB] text-[14px] outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all bg-white"
                      placeholder={t.contact_phone_ph}
                      dir={isRTL ? "ltr" : undefined}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[12px] font-semibold text-text-main mb-1.5">
                      {t.contact_message}
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-[6px] border border-[#E5E7EB] text-[14px] outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-all bg-white resize-none"
                      placeholder={t.contact_message_ph}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-3 rounded-[6px] font-semibold text-[14px] transition-colors mt-2 cursor-pointer"
                  >
                    {t.contact_submit}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </motion.main>
        ) : activePage === 'web-design' ? (
          <motion.main
            key="web-design"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-[72px] min-h-screen bg-[#F9FAFB] pb-24"
          >
            <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
              <button 
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center gap-2 text-brand-blue font-semibold text-[14px] hover:text-brand-blue-dark transition-colors mb-8 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isRTL ? "rotate-180" : ""}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t.service_back}
              </button>

              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-[#F3F4F6]">
                {/* Hero Image */}
                <div className="w-full h-[250px] sm:h-[400px] bg-[#EBE8E1] relative">
                  <img 
                    src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776519800/Gemini_Generated_Image_uqt6j2uqt6j2uqt6_vwkqlj.png" 
                    alt={t.service_web_title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                  <h1 className="font-sans text-[28px] sm:text-[36px] font-extrabold text-gray-900 leading-[1.2] mb-6">
                    {t.service_web_title}
                  </h1>
                  
                  <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed mb-8">
                    {t.service_web_p1}
                  </p>

                  <div className="bg-[#E6F6FF]/50 rounded-[16px] p-6 sm:p-8 mb-8 border border-[#E6F6FF]">
                    <h3 className="font-bold text-[20px] text-gray-900 mb-4">{t.service_web_why_title}</h3>
                    <p className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed">
                      {t.service_web_why_text}
                    </p>
                  </div>

                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-10 border-l-4 border-brand-blue pl-4">
                    {t.service_web_conclusion}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F9FAFB] p-6 sm:p-8 rounded-[16px] border border-[#F3F4F6]">
                    <div className="text-[#FFC107] font-extrabold text-[24px]">
                      {t.service_web_price}
                    </div>
                    <a 
                      href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3.5 rounded-md font-semibold text-[16px] shadow-soft transition-colors inline-block text-center"
                    >
                      {t.hero_cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        ) : activePage === 'social-media' ? (
          <motion.main
            key="social-media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-[72px] min-h-screen bg-[#F9FAFB] pb-24"
          >
            <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
              <button 
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center gap-2 text-brand-blue font-semibold text-[14px] hover:text-brand-blue-dark transition-colors mb-8 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isRTL ? "rotate-180" : ""}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t.service_back}
              </button>

              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-[#F3F4F6]">
                {/* Hero Image */}
                <div className="w-full h-[250px] sm:h-[400px] bg-[#EBE8E1] relative">
                  <img 
                    src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776521275/Gemini_Generated_Image_yt5s9wyt5s9wyt5s_znvhy9.png" 
                    alt={t.service_social_title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                  <h1 className="font-sans text-[28px] sm:text-[36px] font-extrabold text-gray-900 leading-[1.2] mb-4">
                    {t.service_social_title}
                  </h1>
                  
                  <div className="flex gap-4 mb-6">
                    {/* Instagram Icon */}
                    <a href="https://www.instagram.com/hamz1_digital/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="url(#instagram-gradient)" className="text-[#E1306C]">
                        <defs>
                          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FD1D1D" />
                            <stop offset="50%" stopColor="#E1306C" />
                            <stop offset="100%" stopColor="#C13584" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                  </div>

                  <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed mb-8">
                    {t.service_social_p1}
                  </p>

                  <div className="bg-[#E6F6FF]/50 rounded-[16px] p-6 sm:p-8 mb-8 border border-[#E6F6FF]">
                    <h3 className="font-bold text-[20px] text-gray-900 mb-4">{t.service_social_why_title}</h3>
                    <div className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed space-y-4">
                      {t.service_social_why_text.split('\n\n').map((paragraph, index) => {
                        const parts = paragraph.split(' : ');
                        if (parts.length > 1) {
                          return (
                            <p key={index}>
                              <strong className="text-gray-900">{parts[0]} : </strong>
                              {parts[1]}
                            </p>
                          );
                        }
                        return <p key={index}>{paragraph}</p>;
                      })}
                    </div>
                  </div>

                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-10 border-l-4 border-brand-blue pl-4">
                    {t.service_social_conclusion}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F9FAFB] p-6 sm:p-8 rounded-[16px] border border-[#F3F4F6]">
                    <div className="text-[#FFC107] font-extrabold text-[24px]">
                      {t.service_social_price}
                    </div>
                    <a 
                      href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3.5 rounded-md font-semibold text-[16px] shadow-soft transition-colors inline-block text-center"
                    >
                      {t.hero_cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        ) : activePage === 'ads' ? (
          <motion.main
            key="ads"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-[72px] min-h-screen bg-[#F9FAFB] pb-24"
          >
            <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
              <button 
                onClick={() => {
                  setActivePage('home');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center gap-2 text-brand-blue font-semibold text-[14px] hover:text-brand-blue-dark transition-colors mb-8 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isRTL ? "rotate-180" : ""}>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t.service_back}
              </button>

              <div className="bg-white rounded-[24px] overflow-hidden shadow-soft border border-[#F3F4F6]">
                {/* Hero Image */}
                <div className="w-full h-[250px] sm:h-[400px] bg-[#EBE8E1] relative">
                  <img 
                    src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776523704/Gemini_Generated_Image_sojxgdsojxgdsojx_gx2bof.png" 
                    alt={t.service_ads_title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                  <h1 className="font-sans text-[28px] sm:text-[36px] font-extrabold text-gray-900 leading-[1.2] mb-6">
                    {t.service_ads_title}
                  </h1>
                  
                  <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed mb-8">
                    {t.service_ads_p1}
                  </p>

                  <div className="bg-[#E6F6FF]/50 rounded-[16px] p-6 sm:p-8 mb-8 border border-[#E6F6FF]">
                    <h3 className="font-bold text-[20px] text-gray-900 mb-4">{t.service_ads_why_title}</h3>
                    <div className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed space-y-4">
                      {t.service_ads_why_text.split('\n\n').map((paragraph, index) => {
                        const parts = paragraph.split(' : ');
                        if (parts.length > 1) {
                          return (
                            <p key={index}>
                              <strong className="text-gray-900">{parts[0]} : </strong>
                              {parts[1]}
                            </p>
                          );
                        }
                        return <p key={index}>{paragraph}</p>;
                      })}
                    </div>
                  </div>

                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-10 border-l-4 border-brand-blue pl-4">
                    {t.service_ads_conclusion}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F9FAFB] p-6 sm:p-8 rounded-[16px] border border-[#F3F4F6]">
                    <div className="text-[#FFC107] font-extrabold text-[24px]">
                      {t.service_ads_price}
                    </div>
                    <a 
                      href="https://wa.me/212721121492?text=howa%20can%20i%20help%20you"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3.5 rounded-md font-semibold text-[16px] shadow-soft transition-colors inline-block text-center"
                    >
                      {t.hero_cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        ) : null}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-bg-light border-t border-[#F3F4F6] text-text-muted py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="flex items-center gap-2">
             <img 
              src="https://res.cloudinary.com/ddfazkkij/image/upload/q_auto/f_auto/v1776534353/Gemini_Generated_Image_l23co1l23co1l23c_stdouo.png" 
              alt="hamz1 Digital Logo" 
              className="h-20 md:h-24 w-auto object-contain rounded-full border border-gray-100"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/hamz1_digital/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="url(#instagram-gradient-footer)" className="text-[#E1306C]">
                <defs>
                  <linearGradient id="instagram-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FD1D1D" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="100%" stopColor="#C13584" />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          <p className="text-[12px] text-center md:text-left">
            © {new Date().getFullYear()} hamz1 Digital. {t.footer_rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
