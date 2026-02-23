import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Facebook, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    icon: Instagram,
    href: 'https://www.instagram.com/premiumblackcarservice?igsh=MXBmeXhoZ2Y0aGpnag==',
    label: 'Instagram',
    color: 'hover:text-pink-500 hover:border-pink-500',
  },
  {
    icon: MessageCircle,
    href: 'https://wa.me/16593052974',
    label: 'WhatsApp',
    color: 'hover:text-green-500 hover:border-green-500',
  },
  {
    icon: Facebook,
    href: '#',
    label: 'Facebook',
    color: 'hover:text-blue-500 hover:border-blue-500',
  },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer className="relative bg-black border-t border-white/10" role="contentinfo">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h2 
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              CRUISE
            </h2>
            <p className="text-white/60 mb-6 max-w-md">
              Premium luxury transportation with Chevrolet Suburban. 
              Unparalleled experience on every ride. Serving Alabama and surrounding areas with excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 transition-all rounded-lg ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs rounded-full">
                Licensed & Insured
              </span>
              <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs rounded-full">
                24/7 Service
              </span>
              <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs rounded-full">
                5-Star Rated
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-gold transition-all group-hover:w-3" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Contact
            </h3>
            <ul className="space-y-4">
              <motion.li variants={linkVariants}>
                <a
                  href="tel:+16593052974"
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +1 (659) 305-2974
                </a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a
                  href="mailto:royalpurplecorp@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  royalpurplecorp@gmail.com
                </a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <a
                  href="https://wa.me/16593052974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-green-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <span className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Alabama, USA
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} CRUISE. Luxury Transportation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="/privacy-policy.html" 
              className="text-white/40 hover:text-gold text-sm transition-colors inline-flex items-center gap-1"
            >
              Privacy Policy
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a 
              href="/terms-of-service.html" 
              className="text-white/40 hover:text-gold text-sm transition-colors inline-flex items-center gap-1"
            >
              Terms of Service
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
