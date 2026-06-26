import { notFound } from "next/navigation";
import { MapPin, Calendar, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { FloorPlan,OngoingProject, OngoingProjectsApiResponse } from "@/types/project";

export default async function OngoingProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/projects/ongoing`);

  if (!res.ok) return notFound();

  // API returns { success: boolean, data: OngoingProject[] }
    // — unwrap .data before calling .find(), otherwise projects is an object not an array.
    const json: OngoingProjectsApiResponse = await res.json();

    if (!json.success || !json.data) return notFound();

  const project = json.data.find((p) => p.id === Number(id));

  if (!project) return notFound();
  
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="relative h-80 md:h-[450px]">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-8 left-8">
          <span className={`text-white text-xs px-3 py-1 rounded-full font-semibold ${project.type === "Residential" ? "bg-green-600" : "bg-blue-600"}`}>
            {project.type}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-3">{project.name}</h1>
          <p className="flex items-center gap-2 text-gray-300 mt-2"><MapPin size={16} /> {project.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Possession Date", value: project.possession, icon: <Calendar size={20} className="text-amber-600" /> },
            { label: "Total Units", value: `${project.total} Units`, icon: <CheckCircle size={20} className="text-green-600" /> },
            { label: "Units Left", value: `${project.total - project.sold} Units`, icon: <CheckCircle size={20} className="text-red-500" /> },
            { label: "RERA No.", value: project.rera, icon: <Shield size={20} className="text-blue-600" /> },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
              {item.icon}
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="font-bold text-gray-800 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-12 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Construction Progress</h2>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span className="font-bold text-amber-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-amber-600 h-4 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-green-600 font-semibold">{project.sold} units sold</span>
            <span className="text-red-500 font-semibold">{project.total - project.sold} units remaining</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About the Project</h2>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Floor Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Floor Plans & Layouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.floorPlans.map((fp:FloorPlan) => (
              <div key={fp.type} className="border rounded-2xl overflow-hidden shadow-sm">
                <img src={fp.image} alt={fp.type} className="w-full h-48 object-cover" />
                <div className="p-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800">{fp.type}</p>
                  <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-semibold">{fp.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {project.amenities.map((a) => (
              <div key={a} className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
                <CheckCircle size={16} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.technologies.map((t) => (
              <div key={t} className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
                <Shield size={16} className="text-blue-600 shrink-0" />
                <span className="text-sm text-gray-700">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-40 object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-amber-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Book Your Unit Today</h3>
          <p className="text-gray-500 mb-6">Only {project.total - project.sold} units remaining — contact us now</p>
          <div className="flex gap-4 justify-center">
            <Link href="/#contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Contact Us
            </Link>
            <Link href="/#upcoming" className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View Upcoming Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
