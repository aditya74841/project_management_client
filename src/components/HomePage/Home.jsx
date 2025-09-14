

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@/app/utils/showMessage";
import { userLogin, userProfile } from "./store";
import Link from "next/link";
import { Mail, CheckCircle, BarChart, Users } from "lucide-react";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
  tap: { scale: 0.95 },
};

// Demo Credentials Component with Auto-fill Button
const DemoCredentials = ({ onAutoFill }) => (
  <div className="mb-4 p-3 rounded bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 text-sm">
    <div className="flex items-center gap-2 mb-1">
      <span className="font-semibold">Demo Email:</span>
      <span className="select-all">a@gmail.com</span>
    </div>
    <div className="flex items-center gap-2 mb-3">
      <span className="font-semibold">Password:</span>
      <span className="select-all">xxxxxxxx</span>
    </div>

    {/* Auto Fill Button */}
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onAutoFill}
      className="w-full mb-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      Auto Fill Demo Credentials
    </motion.button>

    <div className="text-xs text-blue-700 dark:text-blue-200">
      <span className="font-semibold">Note:</span> Use this demo email and
      password to take a look <br />
      at the software without creating an account. This allows <br /> you to
      explore the features and interface as a guest user.
    </div>
  </div>
);

// Login Sheet Component
const LoginSheet = ({
  isOpen,
  onOpenChange,
  email,
  setEmail,
  password,
  setPassword,
  handleInputChange,
  handleLogin,
}) => {
  // Auto-fill function
  const handleDemoAutoFill = () => {
    setEmail("a@gmail.com");
    setPassword("aditya90060");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          aria-label="Open login drawer"
        >
          Login
        </motion.button>
      </SheetTrigger>
      <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Login to Audit Pro
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label
              htmlFor="login-email"
              className="text-gray-700 dark:text-gray-300"
            >
              Email or Phone
            </Label>
            <Input
              id="login-email"
              value={email} // Add value prop to show auto-filled data
              className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              onChange={handleInputChange}
              aria-required="true"
              placeholder="Enter your email or phone"
            />
          </div>
          <div>
            <Label
              htmlFor="login-password"
              className="text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              value={password} // Add value prop to show auto-filled data
              className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              placeholder="Enter your password"
            />
          </div>
          <DemoCredentials onAutoFill={handleDemoAutoFill} />
        </div>
        <SheetFooter>
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
          >
            Login
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// Signup Sheet Component
const SignupSheet = ({
  isOpen,
  onOpenChange,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  handleSignup,
}) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="rounded-full bg-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
        aria-label="Open signup drawer"
      >
        Sign Up
      </motion.button>
    </SheetTrigger>
    <SheetContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-l border-gray-200 dark:border-gray-800">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Join Audit Pro
        </SheetTitle>
      </SheetHeader>
      <div className="p-6 space-y-4">
        <div>
          <Label
            htmlFor="signup-email"
            className="text-gray-700 dark:text-gray-300"
          >
            Email
          </Label>
          <Input
            id="signup-email"
            value={signupEmail}
            className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            onChange={(e) => setSignupEmail(e.target.value)}
            aria-required="true"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label
            htmlFor="signup-password"
            className="text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <Input
            id="signup-password"
            type="password"
            value={signupPassword}
            className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            onChange={(e) => setSignupPassword(e.target.value)}
            aria-required="true"
            placeholder="Create a password"
          />
        </div>
      </div>
      <SheetFooter>
        <Button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white"
        >
          Sign Up
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

// Navbar Component
const Navbar = ({
  isLoginDrawerOpen,
  setLoginDrawerOpen,
  isSignUpDrawerOpen,
  setSignUpDrawerOpen,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const { profile, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      userProfile((error) => {
        if (error && error.response?.status !== 401) {
          showMessage(error.response?.data?.message || error.message, "error");
        }
      })
    );
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email && !phone) {
      showMessage("Please provide email or phone", "error");
      return;
    }
    if (!password) {
      showMessage("Please provide password", "error");
      return;
    }
    const userData = { email: email || phone, password };
    dispatch(
      userLogin(userData, (err, data) => {
        if (err) {
          showMessage(err.response?.data?.message || err.message, "error");
        } else {
          showMessage(data.message);
          setLoginDrawerOpen(false);
          // Clear form fields after successful login
          setEmail("");
          setPassword("");
          setPhone("");
          dispatch(
            userProfile((error) => {
              if (error) {
                showMessage(error.response?.data?.message, "error");
              }
            })
          );
        }
      })
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword) {
      showMessage("Please provide both email and password", "error");
      return;
    }
    const userData = { email: signupEmail, password: signupPassword };
    // Implement signup logic here
    showMessage("Signup functionality coming soon!", "info");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    if (emailPattern.test(value)) {
      setEmail(value);
      setPhone("");
    } else if (phonePattern.test(value)) {
      setPhone(value);
      setEmail("");
    } else {
      setEmail(value);
      setPhone("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Audit Pro
          </h1>
        </motion.div>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!isLoggedIn ? (
            <>
              <LoginSheet
                isOpen={isLoginDrawerOpen}
                onOpenChange={setLoginDrawerOpen}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
              />
              <SignupSheet
                isOpen={isSignUpDrawerOpen}
                onOpenChange={setSignUpDrawerOpen}
                signupEmail={signupEmail}
                setSignupEmail={setSignupEmail}
                signupPassword={signupPassword}
                setSignupPassword={setSignupPassword}
                handleSignup={handleSignup}
              />
            </>
          ) : (
            <Link href="/dashboard" passHref legacyBehavior>
              <motion.a
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                aria-label="Go to dashboard"
              >
                Dashboard
              </motion.a>
            </Link>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ setLoginDrawerOpen }) => (
  <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
    <motion.h1
      className="mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl dark:text-white"
      initial="hidden"
      animate="visible"
    >
      {"Simplify Your Audits with Audit Pro".split(" ").map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={textVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
    <motion.p
      variants={textVariants}
      initial="hidden"
      animate="visible"
      custom={10}
      className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300"
    >
      Streamline compliance, automate reports, and collaborate seamlessly with
      our all-in-one audit management platform.
    </motion.p>
    <motion.div
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="w-full sm:w-48 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-300 dark:from-blue-700 dark:to-indigo-700"
        onClick={() => setLoginDrawerOpen(true)}
      >
        Get Started
      </motion.button>
      <Link href="/request-demo" passHref legacyBehavior>
        <motion.a
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-48 rounded-full border-2 border-gray-300 bg-transparent px-6 py-3 text-gray-900 font-semibold dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
        >
          Request Demo
        </motion.a>
      </Link>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="mt-16 mx-auto max-w-4xl"
    >
      <div className="rounded-2xl border border-gray-200 bg-white/50 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
        <Image
          src="/audit-pro-dashboard.png"
          alt="Audit Pro dashboard preview"
          className="rounded-xl object-cover w-full h-auto"
          width={1200}
          height={675}
        />
      </div>
    </motion.div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ feature, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
  >
    {feature.icon}
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
      {feature.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mt-2">
      {feature.description}
    </p>
  </motion.div>
);

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
      title: "Automated Reports",
      description:
        "Generate detailed audit reports in seconds with AI-driven insights.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-blue-600" />,
      title: "Compliance Tracking",
      description: "Stay compliant with real-time monitoring and alerts.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with integrated task management.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Why Choose Audit Pro?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
  >
    <p className="text-gray-600 dark:text-gray-300 italic">
      "{testimonial.quote}"
    </p>
    <p className="text-gray-900 dark:text-white font-semibold mt-4">
      {testimonial.author}
    </p>
  </motion.div>
);

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Audit Pro transformed our compliance process, saving us hours every week.",
      author: "Jane Doe, CFO",
    },
    {
      quote:
        "The intuitive interface and powerful features make auditing a breeze.",
      author: "John Smith, Compliance Officer",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-900">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        What Our Users Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => (
  <section className="container mx-auto px-4 py-16 text-center">
    <motion.h2
      className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
      variants={textVariants}
      initial="hidden"
      animate="visible"
    >
      Ready to Streamline Your Audits?
    </motion.h2>
    <motion.p
      variants={textVariants}
      initial="hidden"
      animate="visible"
      custom={1}
      className="text-lg text-gray-600 dark:text-gray-300 mb-8"
    >
      Join thousands of businesses using Audit Pro to simplify compliance.
    </motion.p>
    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
      <Button className="rounded-full bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
        Sign Up Now
      </Button>
    </motion.div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="text-gray-400">
        &copy; 2025 Audit Pro. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <Link href="/privacy" className="text-gray-400 hover:text-white">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-gray-400 hover:text-white">
          Terms of Service
        </Link>
        <Link href="/contact" className="text-gray-400 hover:text-white">
          Contact Us
        </Link>
      </div>
    </div>
  </footer>
);

// Background Component
const DecorativeBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl" />
  </div>
);

// Main HomePage Component
export default function HomePage() {
  const dispatch = useDispatch();
  const { profile, isLoggedIn } = useSelector((state) => state.auth);
  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(
      userProfile((error) => {
        if (error && error.response?.status !== 401) {
          showMessage(error.response?.data?.message || error.message, "error");
        }
      })
    );
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar
        isLoginDrawerOpen={isLoginDrawerOpen}
        setLoginDrawerOpen={setLoginDrawerOpen}
        isSignUpDrawerOpen={isSignUpDrawerOpen}
        setSignUpDrawerOpen={setSignUpDrawerOpen}
      />
      <HeroSection setLoginDrawerOpen={setLoginDrawerOpen} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <DecorativeBackground />
    </div>
  );
}
