import { useState, useEffect } from 'react';
import { Instagram, MessageCircle, Calendar, Phone, X } from 'lucide-react';

export default function FloatingButtons() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show buttons after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToReservations = () => {
    const element = document.querySelector('#book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttons = [
    {
      id: 'instagram',
      href: 'https://www.instagram.com/premiumblackcarservice?igsh=MXBmeXhoZ2Y0aGpnag==',
      icon: Instagram,
      label: 'Instagram',
      bgColor: 'from-purple-600 via-pink-500 to-orange-400',
      textColor: 'text-white',
      ariaLabel: 'Follow us on Instagram',
    },
    {
      id: 'whatsapp',
      href: 'https://wa.me/16593052974',
      icon: MessageCircle,
      label: 'WhatsApp',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      ariaLabel: 'Chat with us on WhatsApp',
    },
    {
      id: 'reservation',
      onClick: scrollToReservations,
      icon: Calendar,
      label: 'Book Now',
      bgColor: 'bg-gold',
      textColor: 'text-black',
      ariaLabel: 'Book a ride',
    },
    {
      id: 'call',
      href: 'tel:+16593052974',
      icon: Phone,
      label: 'Call Now',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      ariaLabel: 'Call us now',
    },
  ];

  return (
    <>
      {/* Mobile: Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-black shadow-lg shadow-gold/30 flex items-center justify-center transition-all duration-300 lg:hidden ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label={isExpanded ? 'Close menu' : 'Open quick actions'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Mobile: Expanded menu */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex flex-col gap-3 lg:hidden transition-all duration-300 ${
          isExpanded && isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {buttons.map((button) => {
          const Icon = button.icon;
          const ButtonWrapper = button.onClick ? 'button' : 'a';
          const buttonProps = button.onClick
            ? { onClick: button.onClick }
            : {
                href: button.href,
                target: button.href?.startsWith('http') ? '_blank' : undefined,
                rel: button.href?.startsWith('http') ? 'noopener noreferrer' : undefined,
              };

          return (
            <ButtonWrapper
              key={button.id}
              {...buttonProps}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg whitespace-nowrap transition-all ${
                button.id === 'instagram'
                  ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white'
                  : `${button.bgColor} ${button.textColor}`
              }`}
              aria-label={button.ariaLabel}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{button.label}</span>
            </ButtonWrapper>
          );
        })}
      </div>

      {/* Desktop: Hover buttons */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 hidden lg:flex transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {buttons.map((button) => {
          const Icon = button.icon;
          const isHovered = hoveredButton === button.id;

          const ButtonWrapper = button.onClick ? 'button' : 'a';
          const buttonProps = button.onClick
            ? { onClick: button.onClick }
            : {
                href: button.href,
                target: button.href?.startsWith('http') ? '_blank' : undefined,
                rel: button.href?.startsWith('http') ? 'noopener noreferrer' : undefined,
              };

          return (
            <ButtonWrapper
              key={button.id}
              {...buttonProps}
              className="group relative flex items-center justify-end focus:outline-none"
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              onFocus={() => setHoveredButton(button.id)}
              onBlur={() => setHoveredButton(null)}
              aria-label={button.ariaLabel}
            >
              {/* Small icon (always visible) */}
              <div
                className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-white/20
                  transition-all duration-200 ease-out shadow-lg
                  ${isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                  text-white hover:text-gold
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Expanded button (visible on hover/focus) */}
              <div
                className={`
                  absolute right-0 flex items-center gap-3 px-5 py-3 rounded-full
                  shadow-xl whitespace-nowrap font-medium
                  transition-all duration-200 ease-out
                  ${isHovered
                    ? 'opacity-100 scale-100 translate-x-0'
                    : 'opacity-0 scale-90 translate-x-4 pointer-events-none'
                  }
                  ${button.id === 'instagram'
                    ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white'
                    : `${button.bgColor} ${button.textColor}`
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{button.label}</span>
              </div>
            </ButtonWrapper>
          );
        })}
      </div>
    </>
  );
}
