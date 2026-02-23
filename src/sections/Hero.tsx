import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Shield, Clock, Award } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - video will show poster instead
      });
    }
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const trustBadges = [
    { icon: Shield, label: 'Licensed & Insured' },
    { icon: Clock, label: '24/7 Service' },
    { icon: Award, label: '5-Star Rated' },
  ];

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero section - CRUISE Luxury Transportation"
    >
      {/* Video Background with Poster */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/poster-hero.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Luxury Chevrolet Suburban showcase video"
        >
          <source src="/videos/video-hero.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img 
            src="/videos/poster-hero.jpg" 
            alt="CRUISE Luxury Transportation - Chevrolet Suburban"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Poster fallback while video loads */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black"
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Trust Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          {trustBadges.map((badge) => (
            <div 
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
            >
              <badge.icon className="w-4 h-4 text-gold" aria-hidden="true" />
              <span className="text-white/90 text-sm">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-gold uppercase tracking-[0.3em] text-sm mb-4"
          variants={itemVariants}
        >
          Welcome to
        </motion.p>
        
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wider"
          style={{ fontFamily: 'Playfair Display, serif' }}
          variants={itemVariants}
        >
          CRUISE
        </motion.h1>
        
        <motion.div
          className="w-24 h-[2px] bg-gold mb-6 origin-left"
          variants={lineVariants}
          aria-hidden="true"
        />
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 uppercase tracking-[0.2em] mb-6"
          variants={itemVariants}
        >
          Luxury Transportation
        </motion.p>
        
        <motion.p
          className="max-w-2xl text-white/70 text-lg mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Experience unparalleled comfort with our premium Chevrolet Suburban fleet. 
          Professional chauffeurs, impeccable service, and attention to every detail.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          <Button
            onClick={() => {
              const element = document.querySelector('#book');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gold text-black hover:bg-gold/90 uppercase tracking-wider text-sm font-medium px-10 py-6 focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          >
            Book Your Ride
          </Button>
          <Button
            onClick={() => {
              const element = document.querySelector('#fleet');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 uppercase tracking-wider text-sm font-medium px-10 py-6"
          >
            <Play className="w-4 h-4 mr-2" />
            Explore Fleet
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-gold transition-colors focus:outline-none focus:text-gold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Scroll to services section"
      >
        <span className="sr-only">Scroll down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" aria-hidden="true" />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
