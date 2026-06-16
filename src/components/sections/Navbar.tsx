"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Target, Eye, Trophy, Users, Building2, Star } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Ongoing", href: "/#ongoing" },
  { label: "Completed", href: "/#completed" },
  { label: "Upcoming", href: "/#upcoming" },
  { label: "Contact", href: "/#contact" },
];

const aboutItems = [
  {
    icon: <Users size={20} className="text-amber-600" />,
    title: "Who We Are",
    desc: "15+ years of building trust, quality & premium spaces across Maharashtra.",
  },
  {
    icon: <Target size={20} className="text-amber-600" />,
    title: "Our Mission",
    desc: "Delivering dream homes and smart investments with transparency and excellence.",
  },
  {
    icon: <Eye size={20} className="text-amber-600" />,
    title: "Our Vision",
    desc: "To be Maharashtra's most trusted real estate brand by 2030.",
  },
  {
    icon: <Trophy size={20} className="text-amber-600" />,
    title: "Awards & Recognition",
    desc: "Best Residential Builder 2022 & 2023 by Maharashtra Real Estate Awards.",
  },
];

const stats = [
  { icon: <Building2 size={18} />, value: "120+", label: "Projects" },
  { icon: <Users size={18} />, value: "500+", label: "Families" },
  { icon: <Star size={18} />, value: "15+", label: "Years" },
  { icon: <Trophy size={18} />, value: "10+", label: "Awards" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-amber-600">BuildEstate</Link>

        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-amber-600 transition-colors">{l.label}</Link>
            </li>
          ))}

          {/* About Us Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center gap-1 hover:text-amber-600 transition-colors"
            >
              About Us <ChevronDown size={14} className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
            </button>

            {aboutOpen && (
              <div className="absolute top-10 -left-64 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-gray-100 mb-5">
                  <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">BE</div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">BuildEstate Developers</p>
                    <p className="text-gray-500 text-sm">Building Dreams Since 2009</p>
                  </div>
                </div>

                {/* About Items Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {aboutItems.map((item) => (
                    <div key={item.title} className="flex gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors cursor-default">
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-2 bg-amber-600 rounded-xl p-4 text-white">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="flex justify-center mb-1 opacity-80">{s.icon}</div>
                      <p className="font-bold text-lg">{s.value}</p>
                      <p className="text-xs opacity-80">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>

        <a
          href="tel:+918652256889"
          className="hidden md:flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700"
        >
          <Phone size={14} /> Call Us
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-amber-600">{l.label}</Link>
          ))}
          <div className="border-t pt-3 mt-1">
            <p className="text-amber-600 font-semibold mb-2">About Us</p>
            {aboutItems.map((item) => (
              <div key={item.title} className="flex gap-2 py-2">
                {item.icon}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
