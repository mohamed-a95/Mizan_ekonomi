import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll-to-section';

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
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[40%]"
          >
            <img src="/logo.png" alt="Mizan Ekonomi" className="h-20 w-auto object-contain" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.substring(1) ? 'text-primary' : 'text-gray-600'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
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
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      activeSection === item.href.substring(1) ? 'text-primary' : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Sections */}
      {/* Hero Section */}
      <section id="home" className="relative bg-[#1a472a] text-white py-20">
        <div className="container mx-auto px-4">
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

      {/* Footer/Contact Section */}
      <footer id="contact" className="bg-[#1a472a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo Column */}
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" alt="Mizan Ekonomi" className="h-16 w-auto mb-4" />
              <p className="text-sm text-gray-300">
                Din partner för professionell ekonomihantering
              </p>
            </div>

            {/* Contact Info Column */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">Kontakta oss</h3>
              <div className="space-y-2">
                <p>Tel: +46 700 97 3993</p>
                <p>Tel: +46 725 62 5123</p>
                <p>
                  <a href="mailto:info@mizanekonomi.se" className="hover:underline">
                    info@mizanekonomi.se
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">Snabblänkar</h3>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="hover:text-gray-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}