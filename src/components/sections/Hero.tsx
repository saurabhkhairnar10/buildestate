import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">
          Welcome to BuildEstate
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Find Your Dream <br />
          <span className="text-amber-400">Home & Investment</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Premium residential & commercial properties crafted with excellence. Trusted by 500+ happy families.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#ongoing"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Explore Properties
          </Link>
          <Link
            href="/book-site-visit"
            className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Book Site Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
