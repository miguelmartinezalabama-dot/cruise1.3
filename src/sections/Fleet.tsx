import { motion } from 'framer-motion';
import { Users, Wifi, Battery, Wind, Music, GlassWater, Armchair, MapPin, Check, Sparkles } from 'lucide-react';

const features = [
  { icon: Users, label: 'Capacity', value: '7-8 passengers', description: 'Spacious interior' },
  { icon: Wifi, label: 'WiFi', value: 'Free', description: 'High-speed connection' },
  { icon: Battery, label: 'Chargers', value: 'USB & USB-C', description: 'All devices supported' },
  { icon: Wind, label: 'Climate', value: 'Tri-zone', description: 'Individual controls' },
  { icon: Music, label: 'Audio', value: 'Bose System', description: 'Premium sound' },
  { icon: GlassWater, label: 'Windows', value: 'Tinted', description: 'Privacy glass' },
  { icon: Armchair, label: 'Seats', value: 'Premium Leather', description: 'Heated & ventilated' },
  { icon: MapPin, label: 'GPS', value: 'Integrated', description: 'Real-time tracking' },
];

const highlights = [
  '2024 Chevrolet Suburban Premier',
  'Professional chauffeur included',
  'Complimentary bottled water',
  'Daily sanitized vehicles',
];

export default function Fleet() {
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

  const leftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="fleet"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      aria-labelledby="fleet-heading"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/poster-flota.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/video-flota.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
              variants={leftVariants}
            >
              <Sparkles className="w-4 h-4 text-gold" aria-hidden="true" />
              <span className="text-gold text-sm uppercase tracking-wider">Premium Fleet</span>
            </motion.div>

            <motion.p
              className="text-gold uppercase tracking-[0.3em] text-sm mb-4"
              variants={leftVariants}
            >
              Our Fleet
            </motion.p>
            
            <motion.h2
              id="fleet-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={leftVariants}
            >
              Chevrolet <span className="text-gold">Suburban</span>
            </motion.h2>
            
            <motion.p
              className="text-white/70 leading-relaxed mb-8 max-w-lg"
              variants={leftVariants}
            >
              Experience maximum comfort and luxury with our fleet of 2024 Chevrolet Suburban Premier. 
              Designed to offer an unparalleled travel experience, with cutting-edge technology and 
              premium finishes that exceed all expectations.
            </motion.p>

            {/* Highlights */}
            <motion.ul 
              className="space-y-3 mb-8"
              variants={leftVariants}
            >
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-white/80">
                  <span className="w-5 h-5 flex items-center justify-center bg-gold/20 text-gold rounded-full">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </span>
                  {highlight}
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div variants={leftVariants}>
              <button
                onClick={() => {
                  const element = document.querySelector('#book');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-gold/90 transition-colors rounded-lg focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
              >
                Book Now
                <Check className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl"
              variants={rightVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-2 text-center">
                Vehicle Features
              </h3>
              <p className="text-white/50 text-center text-sm mb-6">
                Every detail designed for your comfort
              </p>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl group"
                    variants={featureVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/20 text-gold flex-shrink-0 rounded-lg group-hover:bg-gold group-hover:text-black transition-colors">
                      <feature.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                        {feature.label}
                      </p>
                      <p className="text-white font-medium text-sm">
                        {feature.value}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interior Video Section */}
        <motion.div
          className="mt-20"
          variants={bottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/poster-hero.jpg"
              className="w-full h-[400px] md:h-[500px] object-cover"
              aria-label="Chevrolet Suburban interior showcase"
            >
              <source src="/videos/video-hero.mp4" type="video/mp4" />
            </video>
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-8 left-8 right-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-sm mb-2">
                Premium Interior
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Luxury in every detail
              </h3>
              <p className="text-white/70 max-w-lg">
                Experience the finest leather seating, ambient lighting, and state-of-the-art entertainment system.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
