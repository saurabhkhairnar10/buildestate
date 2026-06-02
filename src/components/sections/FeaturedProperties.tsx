import { MapPin, BedDouble, Bath, IndianRupee } from "lucide-react";
import Link from "next/link";

const properties = [
  {
    id: 1,
    name: "Skyline Residency",
    location: "Pune, Maharashtra",
    price: "45 Lakh",
    bhk: "2 BHK",
    baths: 2,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
    tag: "Hot Deal",
  },
  {
    id: 2,
    name: "Green Valley Homes",
    location: "Nashik, Maharashtra",
    price: "62 Lakh",
    bhk: "3 BHK",
    baths: 3,
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
    tag: "New Launch",
  },
  {
    id: 3,
    name: "Royal Palms",
    location: "Mumbai, Maharashtra",
    price: "1.2 Cr",
    bhk: "3 BHK",
    baths: 3,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
    tag: "Premium",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Our Properties</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Featured Properties</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {p.tag}
                </span>
                <span className="absolute top-3 right-3 bg-white text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {p.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MapPin size={14} /> {p.location}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><BedDouble size={14} /> {p.bhk}</span>
                  <span className="flex items-center gap-1"><Bath size={14} /> {p.baths} Bath</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="flex items-center gap-1 text-amber-600 font-bold text-lg">
                    <IndianRupee size={16} /> {p.price}
                  </p>
                  <Link href="/contact" className="bg-amber-600 text-white text-sm px-4 py-2 rounded-full hover:bg-amber-700 transition-colors">
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
