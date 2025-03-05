import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { scrollToSection } from '@/lib/scroll-to-section';

const navItems = [
  { label: "Hem", href: "#home" },
  { label: "Tjänster", href: "#services" },
  { label: "Om oss", href: "#about" },
  { label: "Kontakt", href: "#contact" }
];

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between h-20">
          {/* Logo Container - 30% width, left-aligned */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[30%] h-full flex items-center pl-6"
          >
            <img 
              src="/assets/Mizan ekonomi  (5) (1).png" 
              alt="Mizan Ekonomi" 
              className="h-20 w-full object-contain object-left"
            />
          </motion.div>

          {/* Desktop Navigation - right-aligned with padding */}
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

          {/* Mobile Menu - right-aligned with padding */}
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

      {/* Rest of the page content... */}
    </div>
  );
}