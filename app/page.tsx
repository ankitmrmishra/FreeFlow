import FAQs from "@/components/Landing/FAQs";
import Footer from "@/components/Landing/Footer";
import { Hero } from "@/components/Landing/Hero";
import PricingTeaser from "@/components/Landing/pricing";
import Showcase from "@/components/Landing/Showcase";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Showcase />
      <PricingTeaser />
      <FAQs />
      <Footer />
    </div>
  );
}
