import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Business Executive',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'CRUISE exceeded all my expectations. The Chevrolet Suburban was immaculate, and my chauffeur was professional and punctual. Perfect for my corporate meetings. I\'ve used their service 5 times now and will continue to do so.',
    service: 'Corporate Travel',
  },
  {
    id: 2,
    name: 'James & Emily Rodriguez',
    role: 'Wedding Clients',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Our wedding day transportation was flawless. The team went above and beyond to make sure everything was perfect. From the red carpet treatment to the champagne service, it was truly a luxury experience.',
    service: 'Wedding Service',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Frequent Traveler',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'As someone who travels weekly for business, I\'ve tried many car services. CRUISE is by far the best. Their flight monitoring feature saved me when my flight was delayed - they adjusted without me even calling.',
    service: 'Airport Transfer',
  },
  {
    id: 4,
    name: 'Amanda Foster',
    role: 'Event Planner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'I recommend CRUISE to all my clients for special events. Their attention to detail and reliability is unmatched. The vehicles are always spotless and the drivers are courteous and professional.',
    service: 'Special Events',
  },
  {
    id: 5,
    name: 'David Thompson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'We use CRUISE for all our executive transportation needs. Their service is consistently excellent, and they understand the importance of discretion and professionalism in the corporate world.',
    service: 'Corporate Travel',
  },
];

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '10,000+', label: 'Rides Completed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '100%', label: 'Safety Record' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-gold uppercase tracking-[0.3em] text-sm mb-4"
            variants={itemVariants}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            What Our <span className="text-gold">Clients Say</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Don't just take our word for it. Here's what our valued clients have to say about their experience with CRUISE.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm"
              variants={itemVariants}
            >
              <p className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</p>
              <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
            variants={itemVariants}
          >
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-gold/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold/50"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                    <p className="text-white/60 text-sm">{testimonials[currentIndex].role}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
                      {testimonials[currentIndex].service}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-gold' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-gold hover:text-gold transition-all rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
