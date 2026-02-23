import React, { useMemo, useState, useCallback } from "react";
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, CreditCard, CheckCircle, AlertCircle, Info, MessageCircle } from 'lucide-react';

type ServiceType = "airport" | "point-to-point" | "hourly";

interface ReservationForm {
  pickup: string;
  dropoff: string;
  whenType: "now" | "schedule";
  date: string;
  time: string;
  serviceType: ServiceType;
  hours: number;
  passengers: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const BASE_RATES = {
  "point-to-point": {
    baseFare: 18,
    perMile: 2.8,
    perMinute: 0.65,
    minimumFare: 45,
  },
  airport: {
    baseFare: 25,
    perMile: 3.1,
    perMinute: 0.7,
    minimumFare: 65,
    airportFee: 12,
  },
  hourly: {
    hourlyRate: 95,
    minimumHours: 2,
  },
} as const;

function estimateTripFromText(pickup: string, dropoff: string) {
  const combinedLength = (pickup.trim().length + dropoff.trim().length) || 20;
  const estimatedMiles = Math.max(5, Math.round(combinedLength * 0.35));
  const estimatedMinutes = Math.max(15, Math.round(estimatedMiles * 2.6));

  return {
    miles: estimatedMiles,
    minutes: estimatedMinutes,
  };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildWhatsAppMessage(form: ReservationForm, estimateText: string) {
  const lines = [
    "🚗 *New CRUISE Reservation Request*",
    "",
    `*Service:* ${form.serviceType.replace('-', ' ').toUpperCase()}`,
    `*Pickup:* ${form.pickup || "TBD"}`,
    `*Dropoff:* ${form.dropoff || (form.serviceType === "hourly" ? "Hourly service" : "TBD")}`,
    `*When:* ${form.whenType === "now" ? "ASAP" : "Scheduled"}`,
    form.whenType === "schedule" ? `*Date:* ${form.date || "TBD"}` : "",
    form.whenType === "schedule" ? `*Time:* ${form.time || "TBD"}` : "",
    form.serviceType === "hourly" ? `*Hours:* ${form.hours}` : "",
    `*Passengers:* ${form.passengers}`,
    "",
    `*Name:* ${form.name || "TBD"}`,
    `*Phone:* ${form.phone || "TBD"}`,
    `*Email:* ${form.email || "TBD"}`,
    "",
    `*Estimated Price:* ${estimateText}`,
    form.notes ? `\n*Notes:* ${form.notes}` : "",
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

const Reservations: React.FC = () => {
  const [form, setForm] = useState<ReservationForm>({
    pickup: "",
    dropoff: "",
    whenType: "schedule",
    date: "",
    time: "",
    serviceType: "point-to-point",
    hours: 2,
    passengers: 1,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationForm, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ReservationForm, boolean>>>({});

  const validateField = useCallback((name: keyof ReservationForm, value: string | number) => {
    switch (name) {
      case 'name':
        return !value || String(value).trim().length < 2 ? 'Name is required' : '';
      case 'phone':
        return !value ? 'Phone is required' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value && !emailRegex.test(String(value)) ? 'Invalid email' : '';
      case 'pickup':
        return form.serviceType !== 'hourly' && !value ? 'Pickup location is required' : '';
      case 'dropoff':
        return form.serviceType !== 'hourly' && !value ? 'Dropoff location is required' : '';
      case 'date':
        return form.whenType === 'schedule' && !value ? 'Date is required' : '';
      case 'time':
        return form.whenType === 'schedule' && !value ? 'Time is required' : '';
      default:
        return '';
    }
  }, [form.serviceType, form.whenType]);

  const handleChange = (
    key: keyof ReservationForm,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleBlur = (key: keyof ReservationForm) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const error = validateField(key, form[key]);
    if (error) {
      setErrors((prev) => ({ ...prev, [key]: error }));
    }
  };

  const tripEstimate = useMemo(() => {
    if (form.serviceType === "hourly") {
      const hourlyRate = BASE_RATES.hourly.hourlyRate;
      const minHours = BASE_RATES.hourly.minimumHours;
      const billableHours = Math.max(form.hours || 0, minHours);
      const total = billableHours * hourlyRate;

      return {
        miles: null as number | null,
        minutes: null as number | null,
        total,
        breakdown: `${billableHours} hours × ${formatCurrency(hourlyRate)}/hr`,
      };
    }

    if (!form.pickup || !form.dropoff) {
      return {
        miles: null as number | null,
        minutes: null as number | null,
        total: null as number | null,
        breakdown: "Enter locations for estimate",
      };
    }

    const { miles, minutes } = estimateTripFromText(form.pickup, form.dropoff);

    if (form.serviceType === "point-to-point") {
      const rates = BASE_RATES["point-to-point"];
      const raw =
        rates.baseFare + miles * rates.perMile + minutes * rates.perMinute;
      const total = Math.max(raw, rates.minimumFare);

      return {
        miles,
        minutes,
        total: Math.round(total),
        breakdown: `~${miles} miles, ~${minutes} min`,
      };
    }

    // airport
    const rates = BASE_RATES.airport;
    const raw =
      rates.baseFare +
      miles * rates.perMile +
      minutes * rates.perMinute +
      rates.airportFee;
    const total = Math.max(raw, rates.minimumFare);

    return {
      miles,
      minutes,
      total: Math.round(total),
      breakdown: `~${miles} miles, Airport fee included`,
    };
  }, [form]);

  const estimateText =
    tripEstimate.total != null
      ? `${formatCurrency(tripEstimate.total)}`
      : "Enter details";

  const whatsappUrl = useMemo(() => {
    const whatsappNumber = "16593052974";
    const text = buildWhatsAppMessage(form, estimateText);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [form, estimateText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<Record<keyof ReservationForm, string>> = {};
    (Object.keys(form) as Array<keyof ReservationForm>).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
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
        ease: "easeOut" as const,
      },
    },
  };

  const isFormValid = form.name && form.phone && form.email && 
    (form.serviceType === 'hourly' || (form.pickup && form.dropoff)) &&
    (form.whenType === 'now' || (form.date && form.time));

  return (
    <section id="book" className="relative py-24 md:py-32 bg-black overflow-hidden" aria-labelledby="book-heading">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/poster-reservas.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/video-reservas.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-gold uppercase tracking-[0.3em] text-sm mb-4"
            variants={itemVariants}
          >
            Reservations
          </motion.p>
          <motion.h2
            id="book-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Book Your <span className="text-gold">Ride</span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-xl mx-auto"
            variants={itemVariants}
          >
            Quick and easy booking. Get an instant estimate and confirm via WhatsApp.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Panel - Form */}
          <motion.div 
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="mb-5">
              <p className="text-sm tracking-[0.2em] uppercase text-gold">
                Trip Details
              </p>
              <h3 className="text-xl md:text-2xl font-semibold mt-2 text-white">
                Plan Your Journey
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Type */}
              <div>
                <label className="block text-sm mb-2 text-zinc-300">
                  Service Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "point-to-point", label: "Point-to-point", icon: MapPin },
                    { id: "airport", label: "Airport", icon: CreditCard },
                    { id: "hourly", label: "Hourly", icon: Clock },
                  ].map((option) => {
                    const isActive = form.serviceType === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          handleChange("serviceType", option.id as ServiceType)
                        }
                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm border transition ${
                          isActive
                            ? "bg-gold text-black border-gold font-semibold"
                            : "bg-zinc-950 text-white border-zinc-700 hover:border-zinc-500"
                        }`}
                      >
                        <option.icon className="w-4 h-4" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pickup */}
              {form.serviceType !== "hourly" && (
                <div>
                  <label htmlFor="pickup" className="block text-sm mb-2 text-zinc-300">
                    Pickup Location <span className="text-gold">*</span>
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    value={form.pickup}
                    onChange={(e) => handleChange("pickup", e.target.value)}
                    onBlur={() => handleBlur('pickup')}
                    placeholder="Enter pickup address"
                    className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 ${
                      errors.pickup && touched.pickup ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  {errors.pickup && touched.pickup && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.pickup}
                    </p>
                  )}
                </div>
              )}

              {/* Dropoff */}
              {form.serviceType !== "hourly" && (
                <div>
                  <label htmlFor="dropoff" className="block text-sm mb-2 text-zinc-300">
                    Destination <span className="text-gold">*</span>
                  </label>
                  <input
                    id="dropoff"
                    type="text"
                    value={form.dropoff}
                    onChange={(e) => handleChange("dropoff", e.target.value)}
                    onBlur={() => handleBlur('dropoff')}
                    placeholder="Enter destination address"
                    className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 ${
                      errors.dropoff && touched.dropoff ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  {errors.dropoff && touched.dropoff && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.dropoff}
                    </p>
                  )}
                </div>
              )}

              {/* Hours (hourly only) */}
              {form.serviceType === "hourly" && (
                <div>
                  <label htmlFor="hours" className="block text-sm mb-2 text-zinc-300">
                    Service Hours
                  </label>
                  <input
                    id="hours"
                    type="number"
                    min={2}
                    max={24}
                    value={form.hours}
                    onChange={(e) => handleChange("hours", Number(e.target.value))}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-gold text-white"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Minimum {BASE_RATES.hourly.minimumHours} hours at ${BASE_RATES.hourly.hourlyRate}/hour
                  </p>
                </div>
              )}

              {/* Now / Scheduled */}
              <div>
                <label className="block text-sm mb-2 text-zinc-300">When?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange("whenType", "now")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm border transition ${
                      form.whenType === "now"
                        ? "bg-gold text-black border-gold font-semibold"
                        : "bg-zinc-950 text-white border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    ASAP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("whenType", "schedule")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm border transition ${
                      form.whenType === "schedule"
                        ? "bg-gold text-black border-gold font-semibold"
                        : "bg-zinc-950 text-white border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </button>
                </div>
              </div>

              {form.whenType === "schedule" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="date" className="block text-sm mb-2 text-zinc-300">
                      Date <span className="text-gold">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      onBlur={() => handleBlur('date')}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white ${
                        errors.date && touched.date ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.date && touched.date && (
                      <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm mb-2 text-zinc-300">
                      Time <span className="text-gold">*</span>
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      onBlur={() => handleBlur('time')}
                      className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white ${
                        errors.time && touched.time ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.time && touched.time && (
                      <p className="text-red-400 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div>
                <label htmlFor="passengers" className="block text-sm mb-2 text-zinc-300">
                  Passengers
                </label>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-zinc-500" />
                  <input
                    id="passengers"
                    type="number"
                    min={1}
                    max={8}
                    value={form.passengers}
                    onChange={(e) => handleChange("passengers", Number(e.target.value))}
                    className="flex-1 rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-gold text-white"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-zinc-800 pt-4">
                <p className="text-sm text-zinc-400 mb-3">Contact Information</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2 text-zinc-300">
                      Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your full name"
                      className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 ${
                        errors.name && touched.name ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-2 text-zinc-300">
                      Phone <span className="text-gold">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 ${
                        errors.phone && touched.phone ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="your@email.com"
                  className={`w-full rounded-xl bg-zinc-950 border px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 ${
                    errors.email && touched.email ? 'border-red-500' : 'border-zinc-700'
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm mb-2 text-zinc-300">
                  Special Requests
                </label>
                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Baby seat, extra luggage, flight number, etc."
                  rows={3}
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-gold text-white placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full rounded-xl bg-gold text-black font-semibold px-4 py-4 hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm via WhatsApp
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center rounded-xl bg-green-600 text-white font-semibold px-4 py-4 hover:bg-green-500 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Quick WhatsApp
                </a>
              </div>

              <p className="text-zinc-500 text-xs text-center">
                By booking, you agree to our{' '}
                <a href="/terms-of-service.html" className="text-gold hover:underline">Terms of Service</a>
              </p>
            </form>
          </motion.div>

          {/* Right Panel - Summary */}
          <motion.div 
            className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm sticky top-24"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-white mb-1">Price Estimate</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Real-time calculation based on your trip details
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Service Type</p>
                <p className="text-base font-medium text-white capitalize flex items-center gap-2">
                  {form.serviceType === 'point-to-point' && <MapPin className="w-4 h-4 text-gold" />}
                  {form.serviceType === 'airport' && <CreditCard className="w-4 h-4 text-gold" />}
                  {form.serviceType === 'hourly' && <Clock className="w-4 h-4 text-gold" />}
                  {form.serviceType.replace('-', ' ')}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Trip Details</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">From:</span> {form.pickup || "Not specified"}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">To:</span>{" "}
                    {form.serviceType === "hourly"
                      ? "Hourly service"
                      : form.dropoff || "Not specified"}
                  </p>
                  {tripEstimate.miles && (
                    <p className="text-zinc-300">
                      <span className="text-zinc-500">Distance:</span> ~{tripEstimate.miles} miles
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 p-5">
                <p className="text-xs uppercase tracking-wider text-gold/70 mb-1">Estimated Price</p>
                <p className="text-3xl font-bold text-gold">{estimateText}</p>
                <p className="text-sm text-gold/60 mt-1">{tripEstimate.breakdown}</p>
                <div className="flex items-start gap-2 mt-3 text-xs text-gold/50">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Final price may vary based on actual route and traffic conditions.</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <p className="text-sm text-zinc-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No hidden fees
                </p>
                <p className="text-sm text-zinc-300 flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free cancellation up to 1 hour before
                </p>
                <p className="text-sm text-zinc-300 flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Professional chauffeur included
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservations;
