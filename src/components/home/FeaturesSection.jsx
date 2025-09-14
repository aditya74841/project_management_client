export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold">Features</h2>
      <p className="mt-2 text-gray-600">All the tools you need in one place.</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        <div className="p-6 bg-white shadow rounded-lg">⚡ Fast & Reliable</div>
        <div className="p-6 bg-white shadow rounded-lg">🔒 Secure Authentication</div>
        <div className="p-6 bg-white shadow rounded-lg">📊 Analytics Dashboard</div>
      </div>
    </section>
  );
}
