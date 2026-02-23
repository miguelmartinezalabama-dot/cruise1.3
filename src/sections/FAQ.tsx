import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'For standard rides, we recommend booking at least 2 hours in advance. Airport transfers require 24 hours notice, and special events like weddings should be booked 72 hours ahead to ensure availability.',
    category: 'Booking',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Standard rides can be cancelled free of charge up to 1 hour before pickup. Airport transfers can be cancelled up to 4 hours before, and special events up to 24 hours before. Late cancellations may incur a fee of up to 50% of the total fare.',
    category: 'Policies',
  },
  {
    question: 'Do you monitor flights for airport pickups?',
    answer: 'Yes! We monitor all flights in real-time. If your flight is delayed, we automatically adjust your pickup time at no extra charge. We track both domestic and international flights.',
    category: 'Airport',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), cash, and digital payment methods including Apple Pay and Google Pay. Corporate accounts can be set up with monthly billing.',
    category: 'Payment',
  },
  {
    question: 'How many passengers can your vehicles accommodate?',
    answer: 'Our Chevrolet Suburban fleet comfortably accommodates up to 7-8 passengers with luggage. We also have options for larger groups - please contact us for group transportation needs.',
    category: 'Vehicles',
  },
  {
    question: 'Are your chauffeurs licensed and insured?',
    answer: 'Absolutely. All our chauffeurs are professionally licensed, background-checked, and undergo regular training. Our vehicles are fully insured, and we maintain a 100% safety record.',
    category: 'Safety',
  },
  {
    question: 'Can I request special amenities?',
    answer: 'Yes! We offer various amenities including child seats, refreshments, Wi-Fi, phone chargers, and more. Just let us know your needs when booking, and we\'ll accommodate them.',
    category: 'Services',
  },
  {
    question: 'Do you offer corporate accounts?',
    answer: 'Yes, we offer corporate accounts with benefits including priority booking, monthly billing, detailed reporting, and dedicated account management. Contact us to set up your corporate account.',
    category: 'Corporate',
  },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter((f) => f.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <HelpCircle className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm uppercase tracking-wider">Got Questions?</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Find answers to common questions about our luxury transportation services. Can't find what you're looking for? Contact us directly.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold text-black font-medium'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                layout
                className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-block px-2 py-1 bg-gold/20 text-gold text-xs rounded">
                      {faq.category}
                    </span>
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/60 mb-4">Still have questions?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-medium rounded-lg hover:bg-gold/90 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
