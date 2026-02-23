import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Fleet from './sections/Fleet';
import Reservations from './sections/Reservations';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FloatingButtons from './sections/FloatingButtons';

// Lazy load below-fold sections for better performance
const Testimonials = lazy(() => import('./sections/Testimonials'));
const FAQ = lazy(() => import('./sections/FAQ'));

// Loading fallback for lazy-loaded sections
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster 
        position="top-center" 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#fff',
          },
        }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Fleet />
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Reservations />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
