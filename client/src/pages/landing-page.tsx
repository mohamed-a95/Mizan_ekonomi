import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { scrollToSection } from '@/lib/scroll-to-section';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const navItems = [
  { label: "Hem", href: "#home" },
  { label: "Tjänster", href: "#services" },
  { label: "Om oss", href: "#about" },
  { label: "Kontakt", href: "#contact" }
];

const services = [
  {
    title: 'Redovisning',
    description: 'Vi tar hand om din löpande bokföring, bokslut och årsredovisning.'
  },
  {
    title: 'Lönehantering',
    description: 'Vi hanterar löner, arbetsgivardeklarationer och kontrolluppgifter.'
  },
  {
    title: 'Skatt & Deklaration',
    description: 'Vi hjälper dig med skatteplanering och deklaration för bästa resultat.'
  }
];

const contactInfo = {
  emails: [
    'info@mizanekonomi.se',
    'redovisning@mizanekonomi.se',
    'skatt@mizanekonomi.se'
  ],
  phones: [
    '+46 700 97 3993',
    '+46 725 62 5123',
    '+46 737 89 4456'
  ]
};

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com/mizanekonomi", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/mizanekonomi", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/mizanekonomi", label: "LinkedIn" }
];

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between h-[5rem] px-6 md:px-12">
          <img src="/logo.png" alt="Mizan Ekonomi" className="h-[5rem] w-[40%] object-contain" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="text-lg font-medium hover:text-primary transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    className="text-lg font-medium hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative bg-[#1a472a] text-white py-24 overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1a472a]/80 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Professionell Redovisning & Rådgivning
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 text-gray-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Vi hjälper ditt företag att växa med skräddarsydda ekonomitjänster
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => scrollToSection('contact')}
              >
                Kontakta oss
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Våra Tjänster
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Om Mizan Ekonomi</h2>
            <p className="text-lg text-gray-600">
              Vi är en modern redovisningsbyrå som erbjuder skräddarsydda lösningar för ditt företag.
              Med vår expertis och personliga service hjälper vi dig att fokusera på din verksamhet
              medan vi tar hand om ekonomin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1a472a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Logo and Description */}
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" alt="Mizan Ekonomi" className="h-16 w-auto mb-4" />
              <p className="text-sm text-gray-300">
                Din partner för professionell ekonomihantering
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-8">
              {/* Email Column */}
              <div>
                <h3 className="text-lg font-semibold mb-4">E-post</h3>
                <ul className="space-y-2">
                  {contactInfo.emails.map((email, index) => (
                    <li key={index}>
                      <a href={`mailto:${email}`} className="text-sm hover:text-primary transition-colors">
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone Column */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Telefon</h3>
                <ul className="space-y-2">
                  {contactInfo.phones.map((phone, index) => (
                    <li key={index}>
                      <a href={`tel:${phone}`} className="text-sm hover:text-primary transition-colors">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation and Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Snabblänkar</h3>
              <nav className="flex flex-col gap-2 mb-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Social Media Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}