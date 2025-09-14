export default function TestimonialsSection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold">What our users say</h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        <div className="p-6 bg-gray-100 rounded-lg">⭐ "Amazing product!"</div>
        <div className="p-6 bg-gray-100 rounded-lg">⭐ "Helped me grow my business."</div>
        <div className="p-6 bg-gray-100 rounded-lg">⭐ "Super easy to use."</div>
      </div>
    </section>
  );
}
