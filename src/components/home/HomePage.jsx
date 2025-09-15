// "use client";

// import HeroSection from "./HeroSection";
// import FeaturesSection from "./FeaturesSection";
// import TestimonialsSection from "./TestimonialsSection";
// import CTASection from "./CTASection";
// import DecorativeBackground from "./DecorativeBackground";
// import LoginSheet from "./LoginSheet";
// import SignupSheet from "./SignupSheet";

// export default function HomePage() {
//   return (
//     <div className="relative min-h-screen w-full">
//       <DecorativeBackground />

//       {/* Sections */}
//       <HeroSection />
//       <FeaturesSection />
//       <TestimonialsSection />
//       <CTASection />

//       {/* Auth sheets (modals/drawers) */}
//       <LoginSheet />
//       <SignupSheet />
//     </div>
//   );
// }



import Navbar from "../common/Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import DecorativeBackground from "./DecorativeBackground";
import Footer from "../common/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <DecorativeBackground />
      <Footer />
    </>
  );
}
