"use client";

export default function WalkthroughSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get started in 4 simple steps
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            From signup to embedded panel—in less time than it takes to make coffee
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">1</span>
                Step One
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Sign up with email or OAuth
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Create your free account in seconds using your email, Google, or GitHub. No credit card required, no commitments.
              </p>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="space-y-4">
                  <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
                    email@example.com
                  </div>
                  <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
                    ••••••••
                  </div>
                  <div className="h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    Create Account
                  </div>
                  <div className="text-center text-sm text-slate-500 dark:text-slate-400">or continue with</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 border-2 border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
                      Google
                    </div>
                    <div className="h-10 border-2 border-slate-200 dark:border-slate-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
                      GitHub
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white">My Projects</h4>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    + New Project
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">E-commerce Platform</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Created just now</div>
                      </div>
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
                <span className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">2</span>
                Step Two
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Create your first project
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Give your project a name and description. Each project gets a unique URL that you'll use to embed it in your app.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
                <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs">3</span>
                Step Three
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Add features to track
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Break down your project into features or tasks. Mark them as todo, in progress, or done. Stay organized without the complexity.
              </p>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white">E-commerce Platform</h4>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium">
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-slate-700 dark:text-slate-300">User Authentication</span>
                    <span className="ml-auto px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">Done</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                    <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">⏳</div>
                    <span className="text-slate-700 dark:text-slate-300">Product Catalog</span>
                    <span className="ml-auto px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs">In Progress</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                    <div className="w-5 h-5 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    <span className="text-slate-500 dark:text-slate-500">Shopping Cart</span>
                    <span className="ml-auto px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs">Todo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-auto text-xs text-slate-400">your-project/index.html</span>
                </div>
                <pre className="text-sm text-green-400 font-mono overflow-x-auto">
{`<iframe
  src="https://auditpro.com/embed/abc123"
  width="100%"
  height="600"
  frameborder="0"
></iframe>`}
                </pre>
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Copy Code
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-semibold mb-4">
                <span className="flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full text-xs">4</span>
                Step Four
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Embed in your app
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Copy the iframe code and paste it anywhere in your project. That's it! Your project manager is now embedded and ready to use.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your First Project
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
