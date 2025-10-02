"use client";

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Token-Based Authentication",
      description: "Each embed URL includes a secure access token that's tied to your account—only you can view and edit"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: "Domain Allowlisting",
      description: "Restrict embed access to specific domains—prevent unauthorized embedding on other sites"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      title: "HTTPS Encryption",
      description: "All data transmission is encrypted with TLS 1.3—your project details are always secure in transit"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Content Security Policy (CSP)",
      description: "Strict CSP headers prevent XSS attacks and ensure only trusted resources load in the iframe"
    }
  ];

  const allowedDomains = [
    "localhost:3000",
    "yourapp.com",
    "*.yourapp.com"
  ];

  const platforms = [
    "React",
    "Next.js",
    "Vue",
    "Angular",
    "WordPress",
    "Webflow",
    "Plain HTML"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Secure & Simple Integration
          </h2>
          <p className="text-xl text-blue-100">
            Built with security best practices—your data stays safe while you work seamlessly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Security Features */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security Features
            </h3>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                  <div className="flex items-start gap-3">
                    {feature.icon}
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-blue-100">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Code Example */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              How It Works
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-lg">1. Copy Your Embed Code</h4>
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-auto text-xs text-slate-400">HTML</span>
                  </div>
                  <pre className="text-sm text-green-400 font-mono overflow-x-auto">
{`<iframe
  src="https://auditpro.com/embed/abc123"
  width="100%"
  height="600"
  frameborder="0"
  allow="clipboard-write"
></iframe>`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-lg">2. Secure Communication</h4>
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-auto text-xs text-slate-400">JavaScript</span>
                  </div>
                  <pre className="text-sm text-blue-400 font-mono overflow-x-auto">
{`// Optional: Listen to iframe events
window.addEventListener('message', (e) => {
  if (e.origin === 'https://auditpro.com') {
    console.log('Project updated:', e.data);
  }
});`}
                  </pre>
                </div>
                <p className="text-sm text-blue-100 mt-3">
                  Use postMessage API for secure cross-origin communication between your app and the embedded panel
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-lg">3. Configure Domain Access</h4>
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                  <p className="text-sm text-blue-100 mb-3">
                    In your dashboard settings, add allowed domains:
                  </p>
                  <div className="space-y-2">
                    {allowedDomains.map((domain, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm font-mono bg-slate-950/50 px-3 py-2 rounded">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {domain}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8">Works with every platform</h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {platforms.map((platform, index) => (
              <div key={index} className="px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm font-medium">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
