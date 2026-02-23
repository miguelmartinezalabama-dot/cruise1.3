import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Clock, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    const name = formData.get('contact-name') as string;
    const email = formData.get('contact-email') as string;
    const message = formData.get('contact-message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Validate
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      const data = {
        Name: formData.get('contact-name'),
        Email: formData.get('contact-email'),
        Subject: formData.get('contact-subject') || 'No subject',
        Message: formData.get('contact-message'),
        _subject: 'New Contact Message - CRUISE Luxury Transportation',
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/royalpurplecorp@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data as Record<string, string>),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'We will get back to you within 24 hours.',
          icon: <CheckCircle className="w-5 h-5" />,
        });
        form.reset();
        setErrors({});
        setTouched({});
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast.error('Error sending message', {
        description: 'Please try again or contact us directly by phone.',
        icon: <AlertCircle className="w-5 h-5" />,
      });
    }
    
    setIsSubmitting(false);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
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

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (659) 305-2974',
      href: 'tel:+16593052974',
      description: 'Available 24/7',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'royalpurplecorp@gmail.com',
      href: 'mailto:royalpurplecorp@gmail.com',
      description: 'We reply within 24h',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: '24/7 Service',
      href: null,
      description: 'Always available',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      content: 'Alabama & Surrounding',
      href: null,
      description: 'State-wide coverage',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Video Background */}
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
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
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
            Contact
          </motion.p>
          <motion.h2
            id="contact-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            variants={headerVariants}
          >
            We are here to <span className="text-gold">serve you</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            variants={headerVariants}
          >
            Have questions or ready to book? Reach out to us and experience the CRUISE difference.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                className="bg-white/5 border border-white/10 p-6 hover:border-gold/50 transition-all group rounded-xl"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold/20 text-gold mb-4 group-hover:bg-gold group-hover:text-black transition-all rounded-lg">
                  <info.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href} 
                    className="text-white/70 hover:text-gold transition-colors block mb-1"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-white/70 mb-1">{info.content}</p>
                )}
                <p className="text-white/40 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit} 
              className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm"
              noValidate
            >
              <motion.h3
                className="text-xl font-semibold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Send us a message
              </motion.h3>
              <p className="text-white/50 text-sm mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>
              
              <motion.div
                className="space-y-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div className="space-y-2" variants={formItemVariants}>
                    <Label htmlFor="contact-name" className="text-white/70">
                      Name <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      name="contact-name"
                      placeholder="Your name"
                      required
                      onBlur={() => handleBlur('name')}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 ${
                        errors.name && touched.name ? 'border-red-500' : ''
                      }`}
                      aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                    />
                    {errors.name && touched.name && (
                      <p id="name-error" className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </motion.div>
                  <motion.div className="space-y-2" variants={formItemVariants}>
                    <Label htmlFor="contact-email" className="text-white/70">
                      Email <span className="text-gold">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      name="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      onBlur={() => handleBlur('email')}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 ${
                        errors.email && touched.email ? 'border-red-500' : ''
                      }`}
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                    />
                    {errors.email && touched.email && (
                      <p id="email-error" className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </motion.div>
                </div>

                <motion.div className="space-y-2" variants={formItemVariants}>
                  <Label htmlFor="contact-subject" className="text-white/70">
                    Subject
                  </Label>
                  <Input
                    id="contact-subject"
                    name="contact-subject"
                    placeholder="Message subject"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={formItemVariants}>
                  <Label htmlFor="contact-message" className="text-white/70">
                    Message <span className="text-gold">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="contact-message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    onBlur={() => handleBlur('message')}
                    className={`bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 resize-none ${
                      errors.message && touched.message ? 'border-red-500' : ''
                    }`}
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold/90 uppercase tracking-wider font-medium py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-white/40 text-xs text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy-policy.html" className="text-gold hover:underline">Privacy Policy</a>.
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
