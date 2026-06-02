"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Calendar, Clock, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

const SERVICE_ID = "service_u11r6d4";
const TEMPLATE_ID = "template_vq2dj04";
const PUBLIC_KEY = "6pErMt0PxhkojLArJ";
const BUILDER_EMAIL = "saurabhkhairnar0@gmail.com";
const BUILDER_WHATSAPP = "918652256889";

const projects = [
  "Emerald Heights – Pune",
  "Tech Park Plaza – Mumbai",
  "Serene Meadows – Nashik",
  "Royal Enclave – Pune",
  "Business Square – Mumbai",
  "Maple Residency – Nashik",
  "Golden Gate Residency – Pune",
  "Nexus Business Park – Mumbai",
  "Bluebell Heights – Nashik",
  "Pinnacle Trade Center – Pune",
  "Willow Creek Villas – Nashik",
  "Skyline Commerce Hub – Mumbai",
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookSiteVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "", date: "", time: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send notification to builder
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: BUILDER_EMAIL,
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || "Not provided",
        project: form.project,
        date: form.date,
        time: form.time,
        message: form.message || "None",
      }, PUBLIC_KEY);

      // Send confirmation to customer if email provided
      if (form.email) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          to_email: form.email,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          project: form.project,
          date: form.date,
          time: form.time,
          message: `Your site visit has been booked! Our team will contact you shortly.\n\nFor queries: ${BUILDER_WHATSAPP} | ${BUILDER_EMAIL}`,
        }, PUBLIC_KEY);
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Schedule a Visit</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">Book a Site Visit</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Experience your future home in person. Our team will guide you through the property and answer all your questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Info Panel */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Why Visit in Person?</h3>
              {[
                "See the actual construction quality",
                "Meet our sales team directly",
                "Get exclusive on-site pricing",
                "View sample flat & amenities",
                "Understand floor plans better",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 mb-3">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Need Immediate Help?</h3>
              <a href="tel:+917038665975" className="flex items-center gap-2 mb-3 hover:opacity-80">
                <Phone size={16} /> +91 70386 65975
              </a>
              <a href="https://wa.me/917038665975" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-3 hover:opacity-80">
                <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <a href="mailto:saurabhkhairnar0@gmail.com" className="flex items-center gap-2 mb-3 hover:opacity-80 text-sm break-all">
                <Mail size={16} className="shrink-0" /> saurabhkhairnar0@gmail.com
              </a>
              <div className="flex items-start gap-2 mt-2 text-sm opacity-90">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <p>123, Builder Street, Pune, Maharashtra – 411001</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Visit Booked Successfully!</h3>
                <p className="text-gray-500 mb-6">Our team will call you within 2 hours to confirm your visit slot.</p>
                <Link href="/" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Select Project *</label>
                  <select required name="project" value={form.project} onChange={handleChange} className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white">
                    <option value="">Choose a project</option>
                    {projects.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1"><Calendar size={14} /> Preferred Date *</label>
                  <input required type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1"><Clock size={14} /> Preferred Time *</label>
                  <select required name="time" value={form.time} onChange={handleChange} className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white">
                    <option value="">Choose a time slot</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any specific requirements or questions..." className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
                </div>

                <div className="md:col-span-2">
                  {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white py-3 rounded-full font-semibold text-sm transition-colors">
                    {loading ? "Sending..." : "Book My Site Visit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
