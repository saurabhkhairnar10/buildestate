const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "120+", label: "Projects Delivered" },
  { value: "500+", label: "Happy Families" },
  { value: "3", label: "Cities" },
];

export default function Stats() {
  return (
    <section className="bg-amber-600 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-4xl font-bold">{s.value}</p>
            <p className="text-sm mt-1 opacity-90">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
