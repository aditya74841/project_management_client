"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is my project data secure when embedded via iframe?",
      answer: "Yes, absolutely. We use token-based authentication, HTTPS encryption, Content Security Policy (CSP) headers, and domain allowlisting to ensure only you can access your project data. The iframe communicates securely using the postMessage API with origin validation."
    },
    {
      question: "Will the embedded iframe slow down my app?",
      answer: "No. The iframe is highly optimized and loads in under 1 second. It's built with performance in mind using lazy loading, code splitting, and minimal dependencies. Your app's performance will remain unaffected."
    },
    {
      question: "Can I customize the look of the embedded panel?",
      answer: "Yes! Pro users can customize colors, enable dark/light mode, and match their brand. You can pass theme parameters via the iframe URL or use our CSS customization options to blend seamlessly with your app's design."
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer: "You retain full ownership of your data. Before canceling, you can export all your projects and features in JSON or CSV format. If you cancel, your account reverts to the free tier with limited projects, but your data is never deleted."
    },
    {
      question: "Can I use this on localhost for development?",
      answer: "Absolutely! Localhost domains (localhost:3000, 127.0.0.1, etc.) are automatically allowlisted for development. When you're ready to deploy, simply add your production domain in the settings."
    },
    {
      question: "Do I need backend access to integrate the iframe?",
      answer: "No backend required! It's a pure frontend integration—just paste the iframe code in your HTML. If you want advanced features like event handling, you can optionally use the postMessage API with a few lines of JavaScript."
    },
    {
      question: "Can I collaborate with team members?",
      answer: "Currently, Audit Pro is designed for single users (individuals and freelancers). Team collaboration features are on our roadmap and will be available in future updates."
    },
    {
      question: "What frameworks and platforms are supported?",
      answer: "Audit Pro works with any platform that supports iframes: React, Next.js, Vue, Angular, plain HTML, WordPress, Webflow, Wix, Squarespace, and more. If you can embed an iframe, you can use Audit Pro."
    },
    {
      question: "How do updates work? Will I need to change my embed code?",
      answer: "No code changes needed! Updates are deployed automatically on our side. Your embed URL remains the same, and new features appear instantly without any action from you."
    },
    {
      question: "Is there an API for advanced use cases?",
      answer: "Yes, Pro users get access to our REST API for programmatic project and feature management. You can create, read, update, and delete projects/features directly from your backend if needed."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Everything you need to know about embedding and using Audit Pro
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Still have questions?
          </p>
          <a href="mailto:support@auditpro.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
