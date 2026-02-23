import { motion } from 'framer-motion';
import { Plane, Briefcase, Heart, Shield, Star, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Punctual service with real-time flight monitoring. Stress-free pickup and delivery to all major airports.',
    features: ['Flight tracking', 'Meet & greet', 'Luggage assistance'],
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    description: 'Executive transportation for business professionals. Discretion, punctuality, and premium comfort guaranteed.',
    features: ['Wi-Fi equipped', 'Privacy assured', 'Account billing'],
  },
  {
    icon: Heart,
    title: 'Special Events',
    description: 'Weddings, anniversaries, celebrations. Make your special day unforgettable with our white-glove service.',
    features: ['Red carpet', 'Champagne service', 'Decorations'],
  },
  {
    icon: Shield,
    title: 'Safe Service',
    description: 'Certified professional chauffeurs with background checks. Your safety is our absolute priority.',
    features: ['Licensed drivers', 'Insured vehicles', 'GPS tracked'],
  },
];

export default function Services() {
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

  const headerVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Video Background with lazy loading */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/poster-servicios.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/video-servicios.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
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
            variants={headerVariants}
          >
            Our Services
          </motion.p>
          <motion.h2
            id="services-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            variants={headerVariants}
          >
            Luxury <span className="text-gold">Experience</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto mb-6"
            variants={headerVariants}
          >
            From airport transfers to special celebrations, we provide exceptional service tailored to your needs.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            variants={headerVariants}
          >
            <motion.div
              className="w-12 h-[1px] bg-white/30 origin-right"
              variants={lineVariants}
              aria-hidden="true"
            />
            <Star className="w-5 h-5 text-gold" aria-hidden="true" />
            <motion.div
              className="w-12 h-[1px] bg-white/30 origin-left"
              variants={lineVariants}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="group relative p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold/50 hover:bg-white/10 transition-all duration-500 rounded-xl overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 flex items-center justify-center border border-gold/50 text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 rounded-lg">
                  <service.icon className="w-7 h-7" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="relative text-white/60 leading-relaxed text-sm mb-4">
                {service.description}
              </p>

              {/* Features list */}
              <ul className="relative space-y-2 mb-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-white/50 text-xs">
                    <span className="w-1 h-1 bg-gold rounded-full" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn more link */}
              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all"
              >
                Book Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Hover Line */}
              <div 
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500"
                aria-hidden="true"
              />
              
              {/* Number badge */}
              <span 
                className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-gold/10 transition-colors"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
