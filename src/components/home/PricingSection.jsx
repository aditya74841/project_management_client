"use client";

export default function PricingSection() {
  const freePlanFeatures = [
    "3 projects",
    "30 features per project",
    "Embed on 1 domain",
    "Basic export (JSON/CSV)",
    "Community support"
  ];

  const proPlanFeatures = [
    "Unlimited projects",
    "Unlimited features",
    "Embed on unlimited domains",
    "Advanced export & backup",
    "Custom branding & themes",
    "Priority email support",
    "API access"
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Built for individuals and freelancers—start free, upgrade when you need more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="relative p-8 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Free</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-600 dark:text-slate-400">/month</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Perfect for trying out the platform and managing personal projects
            </p>
            <button className="w-full py-3 px-6 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-full font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all">
              Get Started Free
            </button>

            <div className="mt-8 space-y-3">
              {freePlanFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-500 dark:border-blue-600 rounded-2xl shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">$9</span>
              <span className="text-slate-600 dark:text-slate-400">/month</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-6">
              Save 20% with annual billing ($86/year)
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              For freelancers and solo developers managing multiple projects
            </p>
            <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all">
              Start Pro Trial
            </button>

            <div className="mt-8 space-y-3">
              {proPlanFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-900 dark:text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-12">
          All plans include 14-day free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
}
