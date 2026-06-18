"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CheckCircle, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { CompletedProject, CompletedProjectsApiResponse } from "@/types/project";

const filters = ["All", "Residential", "Commercial"];

export default function CompletedProjects() {
  const [projects, setProjects] = useState<CompletedProject[]>([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/completed");

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json: CompletedProjectsApiResponse = await res.json();

        if (!json.success || !json.data) {
          throw new Error(json.message || "Failed to load completed projects");
        }

        if (isMounted) {
          setProjects(json.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.type === active);

  return (
    <section id="completed" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-center mb-8">
          <div className="text-center">
            <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Our Legacy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Completed Projects</h2>
          </div>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="absolute right-0 px-5 py-2 rounded-full text-sm font-semibold border border-amber-600 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {filters.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-2 text-gray-400 py-12">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading completed projects...</span>
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-amber-600 text-sm py-12">
            Couldn&apos;t load completed projects right now. Please try again later.
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">No projects found for this filter.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <Swiper
            key={active}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
            className="pb-12"
          >
            {filtered.map((p) => (
              <SwiperSlide key={p.id} className="h-auto">
                <Link href={`/projects/completed/${p.id}`} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col h-full block">
                  <div className="relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full font-semibold ${p.type === "Residential" ? "bg-green-600" : "bg-blue-600"}`}>
                      {p.type}
                    </span>
                    <span className="absolute top-3 right-3 bg-white text-gray-700 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <CheckCircle size={12} className="text-green-500" /> Sold Out
                    </span>
                  </div>
                  <div className="p-4 bg-white flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                    <p className="flex items-center gap-1 text-gray-500 text-sm mt-1"><MapPin size={12} /> {p.location}</p>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{p.units}</span>
                      <span>Completed {p.year}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-auto pt-3 font-mono border-t border-gray-100">RERA: {p.rera}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}