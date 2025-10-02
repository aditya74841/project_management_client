
import Navbar from "../common/Navbar";
import BenefitsSection from "./BenefitsSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FinalCTASection from "./FinalCTASection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import SecuritySection from "./SecuritySection";
import SocialProofSection from "./SocialProofSection";
import WalkthroughSection from "./WalkthroughSection";
// import HeroSection from "./HeroSection";
// import FeaturesSection from "./FeaturesSection";
// import TestimonialsSection from "./TestimonialsSection";
// import CTASection from "./CTASection";
// import DecorativeBackground from "./DecorativeBackground";
// import Footer from "../common/Footer";

export default function HomePage() {
  return (
    <>
     <Navbar />
      <HeroSection />
      <SocialProofSection />
      <BenefitsSection />
      <WalkthroughSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}



// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function LandingPage() {
//   const [openFaq, setOpenFaq] = useState(null);

//   const toggleFaq = (index) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   return (
//     <main className="bg-white dark:bg-gray-900">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        
//         <div className="container mx-auto px-6 py-20 lg:py-32 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 Built for Individuals & Freelancers
//               </div>

//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 Manage your project{" "}
//                 <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//                   where work happens
//                 </span>
//               </h1>

//               <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
//                 Stop switching tabs. Embed project management directly inside your app with a single iframe. Track features, manage tasks, and ship faster—all without leaving your workspace.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     Start Free
//                     <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </button>

//                 <button className="px-8 py-4 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200">
//                   View Demo
//                 </button>
//               </div>

//               <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   No credit card required
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Setup in 2 minutes
//                 </div>
//               </div>
//             </div>

//             {/* Right Visual */}
//             <div className="relative">
//               <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 transform hover:scale-105 transition-transform duration-300">
//                 <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                   <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">your-app.com/dashboard</span>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center px-3 text-white text-sm font-medium">
//                     My Project Dashboard
//                   </div>
//                   <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Embedded Project Manager</span>
//                       <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs">iframe</span>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="h-6 bg-white dark:bg-gray-700 rounded border border-slate-200 dark:border-slate-600 flex items-center px-2 text-xs text-slate-600 dark:text-slate-300">
//                         ✓ Feature: User Authentication
//                       </div>
//                       <div className="h-6 bg-white dark:bg-gray-700 rounded border border-slate-200 dark:border-slate-600 flex items-center px-2 text-xs text-slate-600 dark:text-slate-300">
//                         ⏳ Feature: Payment Integration
//                       </div>
//                       <div className="h-6 bg-white dark:bg-gray-700 rounded border border-slate-200 dark:border-slate-600 flex items-center px-2 text-xs text-slate-600 dark:text-slate-300">
//                         📝 Feature: Dashboard UI
//                       </div>
//                     </div>
//                   </div>
//                   <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
//                 </div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//               <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Proof Strip */}
//       <section className="py-12 bg-slate-50 dark:bg-gray-800 border-y border-slate-200 dark:border-slate-700">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-3 gap-8 items-center">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
//               <div className="text-slate-600 dark:text-slate-400 mt-1">Projects Managed</div>
//             </div>
//             <div className="text-center border-x border-slate-300 dark:border-slate-600">
//               <div className="flex items-center justify-center gap-1 mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <div className="text-slate-600 dark:text-slate-400">Rated 5/5 by Early Users</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-slate-900 dark:text-white">2 min</div>
//               <div className="text-slate-600 dark:text-slate-400 mt-1">Average Setup Time</div>
//             </div>
//           </div>

//           {/* Testimonials */}
//           <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
//             <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
//               <div className="flex gap-1 mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
//                 "Finally, I can manage my side projects without juggling multiple tabs. The embedded panel is a game-changer for my workflow."
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
//                   JD
//                 </div>
//                 <div>
//                   <div className="font-semibold text-slate-900 dark:text-white">James Davidson</div>
//                   <div className="text-sm text-slate-500 dark:text-slate-400">Freelance Developer</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
//               <div className="flex gap-1 mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
//                 "Perfect for my college project. I integrated it in under 5 minutes and now I can track all my features right from my app dashboard."
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
//                   SC
//                 </div>
//                 <div>
//                   <div className="font-semibold text-slate-900 dark:text-white">Sarah Chen</div>
//                   <div className="text-sm text-slate-500 dark:text-slate-400">Computer Science Student</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Outcome-Led Benefits */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//               Why developers and students choose us
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-300">
//               Built to solve the real problems of context switching and scattered project tools
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {/* Benefit 1 */}
//             <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800 hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
//                 Cut Context Switching
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Stop jumping between tabs and tools. Manage your project features directly inside your app where you're already working.
//               </p>
//               <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
//                 <span>80% less tab switching</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Benefit 2 */}
//             <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
//                 Setup in Minutes
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Copy one line of code, paste the iframe, and you're done. No complex configurations, no integrations to manage.
//               </p>
//               <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
//                 <span>Under 2 minutes average</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Benefit 3 */}
//             <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
//                 Ship Features Faster
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Track what's done, what's in progress, and what's next—all in one view. Stay focused and deliver projects on time.
//               </p>
//               <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
//                 <span>Built for solo developers</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Additional Benefits Row */}
//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
//             {/* Benefit 4 */}
//             <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-800 hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
//                 Secure by Design
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Your project data is protected with token-based authentication and domain allowlisting. Only you can access your projects.
//               </p>
//               <div className="flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400">
//                 <span>Enterprise-grade security</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Benefit 5 */}
//             <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
//                 Export & Backup
//               </h3>
//               <p className="text-slate-600 dark:text-slate-300 mb-4">
//                 Your data belongs to you. Export your projects anytime in JSON or CSV format and keep full control.
//               </p>
//               <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
//                 <span>One-click export</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Guided Product Walkthrough */}
//       <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//               Get started in 4 simple steps
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-300">
//               From signup to embedded panel—in less time than it takes to make coffee
//             </p>
//           </div>

//           <div className="max-w-5xl mx-auto space-y-12">
//             {/* Step 1 */}
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2 order-2 md:order-1">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
//                   <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">1</span>
//                   Step One
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
//                   Sign up with email or OAuth
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
//                   Create your free account in seconds using your email, Google, or GitHub. No credit card required, no commitments.
//                 </p>
//               </div>
//               <div className="md:w-1/2 order-1 md:order-2">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
//                   <div className="space-y-4">
//                     <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
//                       email@example.com
//                     </div>
//                     <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
//                       ••••••••
//                     </div>
//                     <div className="h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
//                       Create Account
//                     </div>
//                     <div className="text-center text-sm text-slate-500 dark:text-slate-400">or continue with</div>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="h-10 border-2 border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
//                         <svg className="w-5 h-5" viewBox="0 0 24 24">
//                           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                         </svg>
//                         Google
//                       </div>
//                       <div className="h-10 border-2 border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                         </svg>
//                         GitHub
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
//                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
//                     <h4 className="font-semibold text-slate-900 dark:text-white">My Projects</h4>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
//                       + New Project
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="p-4 border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="font-semibold text-slate-900 dark:text-white">E-commerce Platform</div>
//                           <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Created just now</div>
//                         </div>
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg opacity-50">
//                       <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
//                       <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mt-2"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="md:w-1/2">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
//                   <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">2</span>
//                   Step Two
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
//                   Create your first project
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
//                   Give your project a name and description. Each project gets a unique URL that you'll use to embed it in your app.
//                 </p>
//               </div>
//             </div>

//             {/* Step 3 */}
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2 order-2 md:order-1">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
//                   <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs">3</span>
//                   Step Three
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
//                   Add features to track
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
//                   Break down your project into features or tasks. Mark them as todo, in progress, or done. Stay organized without the complexity.
//                 </p>
//               </div>
//               <div className="md:w-1/2 order-1 md:order-2">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
//                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
//                     <h4 className="font-semibold text-slate-900 dark:text-white">E-commerce Platform</h4>
//                     <button className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium">
//                       + Add Feature
//                     </button>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-green-50 dark:bg-green-900/10">
//                       <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">✓</div>
//                       <span className="text-slate-700 dark:text-slate-300">User Authentication</span>
//                       <span className="ml-auto px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">Done</span>
//                     </div>
//                     <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
//                       <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">⏳</div>
//                       <span className="text-slate-700 dark:text-slate-300">Product Catalog</span>
//                       <span className="ml-auto px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs">In Progress</span>
//                     </div>
//                     <div className="flex items-center gap-3 p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
//                       <div className="w-5 h-5 bg-slate-300 dark:bg-slate-600 rounded"></div>
//                       <span className="text-slate-500 dark:text-slate-500">Shopping Cart</span>
//                       <span className="ml-auto px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs">Todo</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 4 */}
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2">
//                 <div className="bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-700">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                     <span className="ml-auto text-xs text-slate-400">your-project/index.html</span>
//                   </div>
//                   <pre className="text-sm text-green-400 font-mono overflow-x-auto">
// {`<iframe
//   src="https://auditpro.com/embed/abc123"
//   width="100%"
//   height="600"
//   frameborder="0"
// ></iframe>`}
//                   </pre>
//                   <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
//                     Copy Code
//                   </button>
//                 </div>
//               </div>
//               <div className="md:w-1/2">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-semibold mb-4">
//                   <span className="flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full text-xs">4</span>
//                   Step Four
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
//                   Embed in your app
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
//                   Copy the iframe code and paste it anywhere in your project. That's it! Your project manager is now embedded and ready to use.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="text-center mt-16">
//             <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 Start Your First Project
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//               Everything for solo project management
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-300">
//               Simple features that solve real problems—no bloat, no complexity
//             </p>
//           </div>

//           {/* Projects Theme */}
//           <div className="mb-16">
//             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//                 </svg>
//               </div>
//               Projects
//             </h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Unlimited Projects</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Create as many projects as needed—each with its own unique embed URL</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Quick Edit</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Update project details, descriptions, and settings instantly from one dashboard</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Progress Tracking</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">See completion percentage and feature status at a glance for each project</p>
//               </div>
//             </div>
//           </div>

//           {/* Features Inside Projects Theme */}
//           <div className="mb-16">
//             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                 </svg>
//               </div>
//               Features Inside Projects
//             </h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Add Features Instantly</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Create feature cards in seconds—just name it and set status (Todo/In Progress/Done)</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Drag & Drop Status</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Move features between todo, in progress, and done with simple drag-and-drop</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Add Descriptions</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Attach notes, links, or specs to each feature so nothing gets forgotten</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Priority Flags</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Mark high-priority features so they're always visible at the top of your list</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Due Dates</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Set optional deadlines for features and get gentle reminders as they approach</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Archive Completed</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Clean up your view by archiving done features—they're still accessible anytime</p>
//               </div>
//             </div>
//           </div>

//           {/* Embeddable Panel Theme */}
//           <div>
//             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//                 </svg>
//               </div>
//               Embeddable Panel
//             </h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">One-Line Integration</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Copy the iframe snippet and paste—no API keys, no SDKs, no backend setup</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Responsive Design</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Looks perfect on desktop, tablet, and mobile—adapts to any screen size automatically</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Customizable Theme</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Match your brand with light/dark mode and custom accent colors via URL params</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Lightweight & Fast</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Optimized for performance—loads in under 1 second without slowing down your app</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Real-Time Sync</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Changes update instantly—edit on main dashboard and see it live in your embedded panel</p>
//               </div>

//               <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Works Everywhere</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-sm">Compatible with React, Vue, plain HTML, WordPress, Webflow—any platform that supports iframes</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Integrations and Security */}
//       <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Secure & Simple Integration
//             </h2>
//             <p className="text-xl text-blue-100">
//               Built with security best practices—your data stays safe while you work seamlessly
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//             {/* Security Features */}
//             <div>
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//                 Security Features
//               </h3>
//               <div className="space-y-4">
//                 <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
//                   <div className="flex items-start gap-3">
//                     <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold mb-1">Token-Based Authentication</h4>
//                       <p className="text-sm text-blue-100">Each embed URL includes a secure access token that's tied to your account—only you can view and edit</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
//                   <div className="flex items-start gap-3">
//                     <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold mb-1">Domain Allowlisting</h4>
//                       <p className="text-sm text-blue-100">Restrict embed access to specific domains—prevent unauthorized embedding on other sites</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
//                   <div className="flex items-start gap-3">
//                     <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold mb-1">HTTPS Encryption</h4>
//                       <p className="text-sm text-blue-100">All data transmission is encrypted with TLS 1.3—your project details are always secure in transit</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
//                   <div className="flex items-start gap-3">
//                     <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold mb-1">Content Security Policy (CSP)</h4>
//                       <p className="text-sm text-blue-100">Strict CSP headers prevent XSS attacks and ensure only trusted resources load in the iframe</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Integration Code Example */}
//             <div>
//               <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                 </svg>
//                 How It Works
//               </h3>

//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-semibold mb-3 text-lg">1. Copy Your Embed Code</h4>
//                   <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                       <span className="ml-auto text-xs text-slate-400">HTML</span>
//                     </div>
//                     <pre className="text-sm text-green-400 font-mono overflow-x-auto">
// {`<iframe
//   src="https://auditpro.com/embed/abc123"
//   width="100%"
//   height="600"
//   frameborder="0"
//   allow="clipboard-write"
// ></iframe>`}
//                     </pre>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold mb-3 text-lg">2. Secure Communication</h4>
//                   <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                       <span className="ml-auto text-xs text-slate-400">JavaScript</span>
//                     </div>
//                     <pre className="text-sm text-blue-400 font-mono overflow-x-auto">
// {`// Optional: Listen to iframe events
// window.addEventListener('message', (e) => {
//   if (e.origin === 'https://auditpro.com') {
//     console.log('Project updated:', e.data);
//   }
// });`}
//                     </pre>
//                   </div>
//                   <p className="text-sm text-blue-100 mt-3">
//                     Use postMessage API for secure cross-origin communication between your app and the embedded panel
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold mb-3 text-lg">3. Configure Domain Access</h4>
//                   <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
//                     <p className="text-sm text-blue-100 mb-3">
//                       In your dashboard settings, add allowed domains:
//                     </p>
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm font-mono bg-slate-950/50 px-3 py-2 rounded">
//                         <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         localhost:3000
//                       </div>
//                       <div className="flex items-center gap-2 text-sm font-mono bg-slate-950/50 px-3 py-2 rounded">
//                         <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         yourapp.com
//                       </div>
//                       <div className="flex items-center gap-2 text-sm font-mono bg-slate-950/50 px-3 py-2 rounded">
//                         <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         *.yourapp.com
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Supported Platforms */}
//           <div className="mt-16 text-center">
//             <h3 className="text-xl font-semibold mb-8">Works with every platform</h3>
//             <div className="flex flex-wrap justify-center gap-6 items-center">
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 React
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 Next.js
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 Vue
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 Angular
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 WordPress
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 Webflow
//               </div>
//               <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
//                 Plain HTML
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Simple Pricing */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//               Simple, transparent pricing
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-300">
//               Built for individuals and freelancers—start free, upgrade when you need more
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {/* Free Plan */}
//             <div className="relative p-8 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transition-all">
//               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Free</h3>
//               <div className="flex items-baseline gap-2 mb-6">
//                 <span className="text-5xl font-bold text-slate-900 dark:text-white">$0</span>
//                 <span className="text-slate-600 dark:text-slate-400">/month</span>
//               </div>
//               <p className="text-slate-600 dark:text-slate-300 mb-6">
//                 Perfect for trying out the platform and managing personal projects
//               </p>
//               <button className="w-full py-3 px-6 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-full font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all">
//                 Get Started Free
//               </button>

//               <div className="mt-8 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-700 dark:text-slate-300">3 projects</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-700 dark:text-slate-300">30 features per project</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-700 dark:text-slate-300">Embed on 1 domain</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-700 dark:text-slate-300">Basic export (JSON/CSV)</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-700 dark:text-slate-300">Community support</span>
//                 </div>
//               </div>
//             </div>

//             {/* Pro Plan */}
//             <div className="relative p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-500 dark:border-blue-600 rounded-2xl shadow-xl">
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
//                 Most Popular
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
//               <div className="flex items-baseline gap-2 mb-1">
//                 <span className="text-5xl font-bold text-slate-900 dark:text-white">$9</span>
//                 <span className="text-slate-600 dark:text-slate-400">/month</span>
//               </div>
//               <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-6">
//                 Save 20% with annual billing ($86/year)
//               </p>
//               <p className="text-slate-600 dark:text-slate-300 mb-6">
//                 For freelancers and solo developers managing multiple projects
//               </p>
//               <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all">
//                 Start Pro Trial
//               </button>

//               <div className="mt-8 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Unlimited projects</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Unlimited features</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Embed on unlimited domains</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Advanced export & backup</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Custom branding & themes</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">Priority email support</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-slate-900 dark:text-white font-medium">API access</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <p className="text-center text-slate-600 dark:text-slate-400 mt-12">
//             All plans include 14-day free trial • No credit card required • Cancel anytime
//           </p>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-slate-50 dark:bg-gray-800">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-300">
//               Everything you need to know about embedding and using Audit Pro
//             </p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-4">
//             {[
//               {
//                 question: "Is my project data secure when embedded via iframe?",
//                 answer: "Yes, absolutely. We use token-based authentication, HTTPS encryption, Content Security Policy (CSP) headers, and domain allowlisting to ensure only you can access your project data. The iframe communicates securely using the postMessage API with origin validation."
//               },
//               {
//                 question: "Will the embedded iframe slow down my app?",
//                 answer: "No. The iframe is highly optimized and loads in under 1 second. It's built with performance in mind using lazy loading, code splitting, and minimal dependencies. Your app's performance will remain unaffected."
//               },
//               {
//                 question: "Can I customize the look of the embedded panel?",
//                 answer: "Yes! Pro users can customize colors, enable dark/light mode, and match their brand. You can pass theme parameters via the iframe URL or use our CSS customization options to blend seamlessly with your app's design."
//               },
//               {
//                 question: "What happens to my data if I cancel my subscription?",
//                 answer: "You retain full ownership of your data. Before canceling, you can export all your projects and features in JSON or CSV format. If you cancel, your account reverts to the free tier with limited projects, but your data is never deleted."
//               },
//               {
//                 question: "Can I use this on localhost for development?",
//                 answer: "Absolutely! Localhost domains (localhost:3000, 127.0.0.1, etc.) are automatically allowlisted for development. When you're ready to deploy, simply add your production domain in the settings."
//               },
//               {
//                 question: "Do I need backend access to integrate the iframe?",
//                 answer: "No backend required! It's a pure frontend integration—just paste the iframe code in your HTML. If you want advanced features like event handling, you can optionally use the postMessage API with a few lines of JavaScript."
//               },
//               {
//                 question: "Can I collaborate with team members?",
//                 answer: "Currently, Audit Pro is designed for single users (individuals and freelancers). Team collaboration features are on our roadmap and will be available in future updates."
//               },
//               {
//                 question: "What frameworks and platforms are supported?",
//                 answer: "Audit Pro works with any platform that supports iframes: React, Next.js, Vue, Angular, plain HTML, WordPress, Webflow, Wix, Squarespace, and more. If you can embed an iframe, you can use Audit Pro."
//               },
//               {
//                 question: "How do updates work? Will I need to change my embed code?",
//                 answer: "No code changes needed! Updates are deployed automatically on our side. Your embed URL remains the same, and new features appear instantly without any action from you."
//               },
//               {
//                 question: "Is there an API for advanced use cases?",
//                 answer: "Yes, Pro users get access to our REST API for programmatic project and feature management. You can create, read, update, and delete projects/features directly from your backend if needed."
//               }
//             ].map((faq, index) => (
//               <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <span className="font-semibold text-slate-900 dark:text-white pr-8">
//                     {faq.question}
//                   </span>
//                   <svg
//                     className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
//                       openFaq === index ? 'rotate-180' : ''
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {openFaq === index && (
//                   <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed">
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <p className="text-slate-600 dark:text-slate-400 mb-4">
//               Still have questions?
//             </p>
//             <a href="mailto:support@auditpro.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
//               Contact our support team →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]"></div>
        
//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6">
//               Ready to manage projects without the context switch?
//             </h2>
//             <p className="text-xl text-blue-100 mb-10 leading-relaxed">
//               Join hundreds of developers and students who've embedded their project management directly into their apps. Start free in under 2 minutes.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//               <button className="group relative overflow-hidden rounded-full bg-white text-blue-700 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   Get Started Free
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//               </button>

//               <button className="px-10 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition-all duration-200">
//                 View Live Demo
//               </button>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 Free forever plan
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 No credit card needed
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 Setup in under 2 minutes
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white">Audit Pro</h3>
//               </div>
//               <p className="text-sm text-slate-400 leading-relaxed">
//                 Embeddable project management for individuals and freelancers who want to work smarter.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold text-white mb-4">Product</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold text-white mb-4">Company</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold text-white mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">GDPR</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-slate-400">
//               © 2025 Audit Pro. All rights reserved.
//             </p>
//             <div className="flex gap-6">
//               <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
//                 </svg>
//               </a>
//               <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                 </svg>
//               </a>
//               <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }
