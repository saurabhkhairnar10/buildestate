"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { Clock, MapPin, Loader2 } from "lucide-react";
import { UpcomingProject, UpcomingProjectsApiResponse } from "@/types/project";

const filters = ["All", "Residential", "Commercial"];

export default function UpcomingProjects() {
  const [projects, setProjects] = useState<UpcomingProject[]>([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/upcoming"); // fixed: was incorrectly pointing to /ongoing

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json: UpcomingProjectsApiResponse = await res.json();

        if (!json.success || !json.data) {
          throw new Error(json.message || "Failed to load upcoming projects");
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

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.type === active);

  return (
    <section id="upcoming" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-center mb-8">
          <div className="text-center">
            <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm">Coming Soon</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Upcoming Projects</h2>
            <p className="text-gray-400 mt-2">Register now to get pre-launch pricing</p>
          </div>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="absolute right-0 px-5 py-2 rounded-full text-sm font-semibold border border-amber-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {filters.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-2 text-gray-400 py-12">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading upcoming projects...</span>
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-amber-400 text-sm py-12">
            Couldn&apos;t load upcoming projects right now. Please try again later.
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-12">
            No projects found for this filter.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <Swiper
            key={active}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {filtered.map((p) => (
              <SwiperSlide key={p.id} className="h-auto">
                <Link
                  href={`/projects/upcoming/${p.id}`}
                  className="rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-colors flex flex-col h-full block"
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-56 object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {p.type}
                    </span>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold">{p.name}</h3>
                      <p className="flex items-center gap-1 text-gray-300 text-sm mt-1">
                        <MapPin size={13} /> {p.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-gray-400 text-sm">{p.description}</p>
                    <p className="flex items-center gap-2 text-amber-400 text-sm mt-3 font-semibold">
                      <Clock size={14} /> Launch: {p.launch}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-mono">RERA: {p.rera}</p>
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
