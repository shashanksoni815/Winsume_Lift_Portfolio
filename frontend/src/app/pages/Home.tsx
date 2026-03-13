import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Portfolio } from '../components/Portfolio';
import { Collection } from '../components/Collection';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { InquiryForm } from '../components/InquiryForm';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="bg-[#1a3332]">
      <Navigation />
      <Hero />
      <Portfolio />
      <Collection />
      <Services />
      <About />
      <InquiryForm />
      <Footer />
    </div>
  );
}
