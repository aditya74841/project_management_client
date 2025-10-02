"use client";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Cut Context Switching",
      description: "Stop jumping between tabs and tools. Manage your project features directly inside your app where you're already working.",
      metric: "80% less tab switching",
      gradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      border: "border-blue-100 dark:border-blue-800",
      iconBg: "from-blue-500 to-blue-600",
      metricColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Setup in Minutes",
      description: "Copy one line of code, paste the iframe, and you're done. No complex configurations, no integrations to manage.",
      metric: "Under 2 minutes average",
      gradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      border: "border-purple-100 dark:border-purple-800",
      iconBg: "from-purple-500 to-purple-600",
      metricColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Ship Features Faster",
      description: "Track what's done, what's in progress, and what's next—all in one view. Stay focused and deliver projects on time.",
      metric: "Built for solo developers",
      gradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      border: "border-green-100 dark:border-green-800",
      iconBg: "from-green-500 to-green-600",
      metricColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure by Design",
      description: "Your project data is protected with token-based authentication and domain allowlisting. Only you can access your projects.",
      metric: "Enterprise-grade security",
      gradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      border: "border-orange-100 dark:border-orange-800",
      iconBg: "from-orange-500 to-orange-600",
      metricColor: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      title: "Export & Backup",
      description: "Your data belongs to you. Export your projects anytime in JSON or CSV format and keep full control.",
      metric: "One-click export",
      gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
      border: "border-indigo-100 dark:border-indigo-800",
      iconBg: "from-indigo-500 to-indigo-600",
      metricColor: "text-indigo-600 dark:text-indigo-400"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why developers and students choose us
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Built to solve the real problems of context switching and scattered project tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className={`group p-8 rounded-2xl bg-gradient-to-br ${benefit.gradient} border ${benefit.border} hover:shadow-xl transition-all duration-300`}>
              <div className={`w-14 h-14 bg-gradient-to-br ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {benefit.description}
              </p>
              <div className={`flex items-center gap-2 text-sm font-medium ${benefit.metricColor}`}>
                <span>{benefit.metric}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {benefits.slice(3).map((benefit, index) => (
            <div key={index} className={`group p-8 rounded-2xl bg-gradient-to-br ${benefit.gradient} border ${benefit.border} hover:shadow-xl transition-all duration-300`}>
              <div className={`w-14 h-14 bg-gradient-to-br ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {benefit.description}
              </p>
              <div className={`flex items-center gap-2 text-sm font-medium ${benefit.metricColor}`}>
                <span>{benefit.metric}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
