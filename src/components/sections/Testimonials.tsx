import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Pune",
    review: "Excellent experience! The team was professional and the flat was delivered on time. Highly recommend BuildEstate.",
    rating: 5,
    project: "Skyline Residency",
  },
  {
    name: "Priya Mehta",
    location: "Mumbai",
    review: "We invested in their commercial space and the ROI has been amazing. Very trustworthy builder.",
    rating: 5,
    project: "Metro Business Hub",
  },
  {
    name: "Amit Joshi",
    location: "Nashik",
    review: "Beautiful villa, great amenities and the construction quality is top notch. Our family loves it!",
    rating: 5,
    project: "Palm Grove Villas",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{t.review}"</p>
              <div className="mt-4 border-t pt-4">
                <p className="font-bold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location} · {t.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
