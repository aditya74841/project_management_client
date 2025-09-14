export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold">Welcome to My SaaS 🚀</h1>
      <p className="mt-4 text-lg text-gray-600">
        Simplify your workflow and scale your business.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Get Started</button>
        <button className="px-6 py-3 bg-gray-200 rounded-lg">Learn More</button>
      </div>
    </section>
  );
}
