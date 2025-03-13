import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

// Se till att alla paths stämmer i ditt projekt:
import imgHero from "/assets/photo-1520607162513-77705c0f0d4a.jpeg";
import imgServices from "/assets/photo-1454165804606-c3d57bc86b40.avif";
import imgBigLogo from "/assets/Mizan ekonomi  (5) (2).png";

const navItems = [
  { label: "Hem", href: "#home" },
  { label: "Tjänster", href: "#services" },
  { label: "Om oss", href: "#about" },
  { label: "Kontakt", href: "#contact" },
];

const servicesData = [
  {
    title: "Skattehantering och Deklaration",
    description:
      "Vi hjälper företag att hantera skatter och deklarationer smidigt och korrekt.",
    icon: (
      <FaFileInvoiceDollar className="text-4xl mb-4 text-[rgb(215,175,107)]" />
    ),
  },
  {
    title: "Bokföring och Årsredovisning",
    description:
      "Vi säkerställer korrekt bokföring och årsredovisning enligt gällande regler.",
    icon: <FaBookOpen className="text-4xl mb-4 text-[rgb(215,175,107)]" />,
  },
  {
    title: "Lönehantering",
    description:
      "Vi hanterar löneutbetalningar och rapportering med precision och effektivitet.",
    icon: <FaMoneyCheckAlt className="text-4xl mb-4 text-[rgb(215,175,107)]" />,
  },
];

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Döljer splash-skärmen efter 3 sekunder
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ================= SPLASH SCREEN ================= */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgb(12,57,57)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Stor logotyp med enkel animering */}
            <motion.img
              src={imgBigLogo}
              alt="Mizan Ekonomi Splash Logo"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1 }}
              className="h-48 w-auto"
            />

            {/* Loading-text i guld */}
            <p className="text-[rgb(215,175,107)] mt-8 font-semibold">
              LOADING
            </p>

            {/* Guld “loading”-linje som ökar från 0% till 100% */}
            <motion.div
              className="h-1 bg-[rgb(215,175,107)] mt-4"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              // Ingen exit behöver, eftersom hela container försvinner i exit
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= VANLIGT INNEHÅLL ================= */}
      {!showSplash && (
        <>
          {/* ================= HEADER (NAVBAR) ================= */}
          <header className="sticky h-24 top-0 z-40 bg-[rgba(247,247,247,1)] shadow-md">
            <div className="flex items-center justify-between w-full h-full px-4 md:px-8">
              {/* Logo */}
              <img
                src="/assets/WhatsApp Image 2025-03-07 at 03.19.48.jpeg"
                alt="Mizan Ekonomi"
                className="h-16 w-auto"
              />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium md:text-gray-700 text-[rgb(215,175,107)] hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  {/* Hamburgarikonen är alltid svart */}
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6 text-black" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-[rgb(215,175,107)] hover:text-primary"
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

          {/* ================= HERO SECTION ================= */}
          <section
            id="home"
            className="relative flex items-center justify-center min-h-screen text-center overflow-hidden"
          >
            {/* Bakgrundsbild + overlay */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/70"
              style={{ backgroundImage: `url(${imgHero})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            {/* Textinnehåll i Hero */}
            <div className="relative flex flex-col justify-center items-center min-h-screen px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl flex flex-col items-center"
              >
                <h1 className="text-4xl font-bold uppercase leading-tight text-[rgb(215,175,107)] max-[560px]:text-3xl">
                  Välkommen till <br />
                  Mizan Ekonomi
                </h1>
                <div className="bg-[rgb(215,175,107)] h-[3px] w-full max-w-[500px] my-4"></div>
                <p className="mt-6 px-5 max-w-[700px] text-xl font-normal text-[rgb(215,175,107)] max-[560px]:text-base">
                  Vi erbjuder skräddarsydda ekonomitjänster för företag och
                  privatpersoner. Med vår expertis inom redovisning, deklaration
                  och ekonomisk rådgivning ser vi till att du kan fokusera på
                  det som är viktigt – din verksamhet.
                </p>
                <div className="flex justify-center mt-14 gap-6">
                  <Button
                    size="lg"
                    className="bg-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/90 text-[#0A4744] py-3 px-6 font-semibold uppercase rounded-md"
                    onClick={() => scrollToSection("services")}
                  >
                    Våra tjänster
                  </Button>
                  <Button
                    size="lg"
                    className="bg-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/90 text-[#0A4744] py-3 px-6 font-semibold uppercase rounded-md"
                    onClick={() => scrollToSection("contact")}
                  >
                    Kontakta oss
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ================= SERVICES SECTION ================= */}
          <section
            id="services"
            className="relative py-24 bg-white text-center overflow-hidden"
          >
            {/* Bakgrundsbild + overlay */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/65"
              style={{ backgroundImage: `url(${imgServices})` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            {/* Tjänsteinnehåll */}
            <div className="relative container mx-auto px-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-[rgb(215,175,107)] mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Våra Tjänster
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {servicesData.map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-[rgb(12,57,57)] rounded-lg p-8 shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <span>{service.icon}</span>
                    <h3 className="text-xl font-semibold mb-4 text-[rgb(215,175,107)]">
                      {service.title}
                    </h3>
                    <p className="text-[rgb(215,175,107)]">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= ABOUT SECTION ================= */}
          <section id="about" className="py-24 bg-white text-center">
            <div className="container mx-auto px-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-[#0A4744] mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Om oss
              </motion.h2>

              {/* Grön ruta med guld text */}
              <motion.div
                className="mx-auto bg-[rgb(12,57,57)] text-[rgb(215,175,107)] rounded-lg p-8 shadow-md max-w-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-lg leading-relaxed">
                  Vi är en redovisningsbyrå som kombinerar personlig service med
                  modern teknik. Med skräddarsydda lösningar hanterar vi
                  bokföring, löner, bokslut och deklarationer både noggrant och
                  effektivt. Vårt mål är att förenkla ekonomin och skapa
                  trygghet, så du kan fokusera på tillväxt.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[rgb(215,175,107)]">✓</span>
                    <span className="text-[rgb(215,175,107)]">
                      Skräddarsydda lösningar
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[rgb(215,175,107)]">✓</span>
                    <span className="text-[rgb(215,175,107)]">
                      Digital & effektiv hantering
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[rgb(215,175,107)]">✓</span>
                    <span className="text-[rgb(215,175,107)]">
                      Personlig service
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[rgb(215,175,107)]">✓</span>
                    <span className="text-[rgb(215,175,107)]">
                      Trygghet & noggrannhet
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[rgb(215,175,107)]">✓</span>
                    <span className="text-[rgb(215,175,107)]">
                      Tidsbesparande & fokus
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ================= FOOTER SECTION ================= */}
          <footer
            id="contact"
            style={{ backgroundColor: "rgb(12,57,57)" }}
            className="text-[rgb(215,175,107)] pt-20"
          >
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl font-bold text-[rgb(215,175,107)]">
                Kontakta oss
              </h2>
              <p className="mt-4 text-lg text-[rgb(215,175,107)]">
                Nå oss via mejl eller telefon:
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* E-post Column */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[rgb(215,175,107)]">
                    E-post
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="mailto:info@mizanekonomi.se"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        samrand.faik@mizanekonomi.se
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:redovisning@mizanekonomi.se"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        shuayb.abokor@mizanekonomi.se
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:skatt@mizanekonomi.se"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        rahim.yusuf@mizanekonomi.se
                      </a>
                    </li>
                  </ul>

                  {/* Följ oss */}
                  <h3 className="text-lg font-semibold mb-4 mt-8 text-[rgb(215,175,107)]">
                    Följ oss
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/mizanekonomi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[rgb(215,175,107)]/10 rounded-full text-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/20 transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com/mizanekonomi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[rgb(215,175,107)]/10 rounded-full text-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/20 transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/company/mizanekonomi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[rgb(215,175,107)]/10 rounded-full text-[rgb(215,175,107)] hover:bg-[rgb(215,175,107)]/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Telefon Column */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[rgb(215,175,107)]">
                    Telefon
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="tel:+46700973993"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        +46 700 97 3993
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+46725625123"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        +46 725 62 5123
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+46737894456"
                        className="text-sm hover:text-[rgb(215,175,107)]/80 transition-colors"
                      >
                        +46 707 96 3457
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div
              className="mt-16 pt-8 border-t border-[rgb(215,175,107)]/20 w-full"
              style={{ backgroundColor: "rgba(247,247,247,1)" }} // samma som navbar
            >
              <div className="text-center py-4">
                <p className="text-[#0A4744] text-sm font-semibold">
                  Org.nr: 559339-7242
                </p>
                <p className="text-[#0A4744] text-sm mt-2 font-semibold">
                  © {new Date().getFullYear()} Mizan Ekonomi. Alla rättigheter
                  förbehållna.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
