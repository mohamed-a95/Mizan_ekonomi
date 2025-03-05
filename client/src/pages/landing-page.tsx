import { motion } from 'framer-motion';
import { useState } from 'react';
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
    description: 'Vi tar hand om din löpande bokföring, bokslut och årsredovisning.',
    icon: '📊'
  },
  {
    title: 'Lönehantering',
    description: 'Vi hanterar löner, arbetsgivardeklarationer och kontrolluppgifter.',
    icon: '💼'
  },
  {
    title: 'Skatt & Deklaration',
    description: 'Vi hjälper dig med skatteplanering och deklaration för bästa resultat.',
    icon: '📋'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between h-[5rem] px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[40%] h-full flex items-center"
          >
            <img 
              src="/logo.png" 
              alt="Mizan Ekonomi" 
              className="h-[5rem] w-full object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
                whileHover={{ scale: 1.05 }}
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
      <section className="relative min-h-[80vh] flex items-center bg-[#1a472a] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            opacity: 0.2
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professionell Redovisning & Rådgivning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Vi hjälper ditt företag att växa med skräddarsydda ekonomitjänster och personlig service
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => scrollToSection('contact')}
            >
              Kontakta oss
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Våra Tjänster
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Om Mizan Ekonomi</h2>
            <p className="text-lg text-gray-600">
              Vi är en modern redovisningsbyrå som erbjuder skräddarsydda lösningar för ditt företag.
              Med vår expertis och personliga service hjälper vi dig att fokusera på din verksamhet
              medan vi tar hand om ekonomin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1a472a] text-white py-20">
        <div className="container mx-auto px-6">
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

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Följ oss</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full hover:bg-primary transition-colors"
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