import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { scrollToSection } from "@/lib/scroll-to-section";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {
  FaFileInvoiceDollar,
  FaBookOpen,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const navItems = [
  { label: "Hem", href: "#home" },
  { label: "Tjänster", href: "#services" },
  { label: "Om oss", href: "#about" },
  { label: "Kontakt", href: "#contact" },
];

const services = [
  {
    title: "Skattehantering och Deklaration",
    description:
      "Vi hjälper företag att hantera skatter och deklarationer smidigt och korrekt.",
    icon: <FaFileInvoiceDollar className="text-4xl mb-4" />,
  },
  {
    title: "Bokföring och Årsredovisning",
    description:
      "Vi säkerställer korrekt bokföring och årsredovisning enligt gällande regler.",
    icon: <FaBookOpen className="text-4xl mb-4" />,
  },
  {
    title: "Lönehantering",
    description:
      "Vi hanterar löneutbetalningar och rapportering med precision och effektivitet.",
    icon: <FaMoneyCheckAlt className="text-4xl mb-4" />,
  },
];

const contactInfo = {
  emails: [
    "info@mizanekonomi.se",
    "redovisning@mizanekonomi.se",
    "skatt@mizanekonomi.se",
  ],
  phones: ["+46 700 97 3993", "+46 725 62 5123", "+46 737 89 4456"],
};

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com/mizanekonomi",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/mizanekonomi",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com/company/mizanekonomi",
    label: "LinkedIn",
  },
];

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky h-28 top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between w-full h-full pr-4 md:pr-8">
          {/* Logo-container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 h-full flex items-center"
          >
            <img
              src="/assets/Mizan ekonomi  (5) (1).png"
              alt="Mizan Ekonomi"
              className="h-full w-auto min-w-[8rem] md:min-w-[12rem]  object-left flex-shrink-0"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 pr-6">
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
              <Button variant="ghost" size="icon" className="md:hidden mr-6">
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
        className="relative min-h-[80vh] flex items-center bg-[#0A4744] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[rgb(215,175,107)] mb-6">
              Professionell Redovisning & Rådgivning
            </h1>
            <p className="text-xl text-[rgb(215,175,107)] mb-8">
              Vi hjälper ditt företag att växa med skräddarsydda ekonomitjänster
              och personlig service
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/90 text-[#0A4744]"
                onClick={() => scrollToSection("services")}
              >
                Våra tjänster
              </Button>
              <Button
                size="lg"
                className="bg-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/90 text-[#0A4744]"
                onClick={() => scrollToSection("contact")}
              >
                Kontakta oss
              </Button>
            </div>
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
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Om oss
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <p className="text-lg text-gray-700 leading-relaxed">
                Vi är en digital redovisningsbyrå som kombinerar personlig
                service med modern teknik. Med skräddarsydda lösningar hanterar
                vi bokföring, löner, bokslut och deklarationer både noggrant och
                effektivt. Vårt mål är att förenkla ekonomin och skapa trygghet,
                så du kan fokusera på tillväxt.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-primary">✓</span>
                  <span>Skräddarsydda lösningar</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">✓</span>
                  <span>Digital & effektiv hantering</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">✓</span>
                  <span>Personlig service</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">✓</span>
                  <span>Trygghet & noggrannhet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">✓</span>
                  <span>Tidsbesparande & fokus</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[#0A4744] text-[rgb(215,175,107)] py-20"
      >
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-[rgb(215,175,107)]">
            Kontakta oss
          </h2>
          <p className="mt-4 text-lg text-[rgb(215,175,107)]">
            Nå oss via mejl eller telefon:
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Email Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[rgb(215,175,107)]">
                E-post
              </h3>
              <ul className="space-y-2">
                {contactInfo.emails.map((email, index) => (
                  <li key={index}>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-[rgb(215,175,107)] hover:text-[rgb(215,175,107)]/80 transition-colors"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phone Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[rgb(215,175,107)]">
                Telefon
              </h3>
              <ul className="space-y-2">
                {contactInfo.phones.map((phone, index) => (
                  <li key={index}>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm text-[rgb(215,175,107)] hover:text-[rgb(215,175,107)]/80 transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4 text-[rgb(215,175,107)]">
              Följ oss
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[rgb(215,175,107)]/10 rounded-full text-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/20 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright and Org Number */}
          <div className="mt-16 pt-8 border-t border-[rgb(215,175,107)]/20 text-center">
            <p className="text-[rgb(215,175,107)] text-sm">
              Org.nr: 559339-7242
            </p>
            <p className="text-[rgb(215,175,107)] text-sm mt-2">
              © {new Date().getFullYear()} Mizan Ekonomi. Alla rättigheter
              förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
