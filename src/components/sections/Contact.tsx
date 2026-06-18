"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Loader2 } from "lucide-react";
import { ContactData, ContactApiResponse } from "@/types/Contacttypes"
import { DEFAULT_CONTACT } from "@/lib/contactDefaults";

export default function Contact() {
  const [contact, setContact] = useState<ContactData>(DEFAULT_CONTACT);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContact() {
      try {
        const res = await fetch("/api/contact");

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json: ContactApiResponse = await res.json();

        if (!json.success || !json.data) {
          throw new Error(json.message || "Failed to load contact details");
        }

        if (isMounted) {
          setContact({ ...DEFAULT_CONTACT, ...json.data });
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

    fetchContact();

    return () => {
      isMounted = false;
    };
  }, []);

  const { phone, email, address, hours, whatsappMessage } = contact;
  const whatsappMsg = encodeURIComponent(whatsappMessage);
  const whatsappPhone = phone.replace(/[^\d]/g, "");

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold uppercase tracking-widest text-sm">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Contact Us Directly</h2>
          <p className="text-gray-500 mt-2">Reach out to us via call, WhatsApp or email — we respond within minutes</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-2 text-gray-400 mb-6">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading contact details...</span>
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-amber-600 text-sm mb-6">
            Couldn&apos;t load the latest contact info, showing default details instead.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Call */}
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-amber-100 hover:border-amber-500 hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-amber-100 group-hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
              <Phone size={28} className="text-amber-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">Call Us</p>
              <p className="text-amber-600 font-semibold mt-1">{phone}</p>
              <p className="text-gray-500 text-sm mt-1">{hours}</p>
            </div>
            <span className="bg-amber-600 text-white text-sm px-6 py-2 rounded-full font-semibold group-hover:bg-amber-700 transition-colors">
              Call Now
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappPhone}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-green-100 hover:border-green-500 hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-green-100 group-hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
              <MessageCircle size={28} className="text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">WhatsApp</p>
              <p className="text-green-600 font-semibold mt-1">{phone}</p>
              <p className="text-gray-500 text-sm mt-1">Chat with us instantly</p>
            </div>
            <span className="bg-green-600 text-white text-sm px-6 py-2 rounded-full font-semibold group-hover:bg-green-700 transition-colors">
              Chat Now
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}?subject=Property Enquiry&body=Hello, I'm interested in your properties.`}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-lg transition-all group"
          >
            <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
              <Mail size={28} className="text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">Email Us</p>
              <p className="text-blue-600 font-semibold mt-1">{email}</p>
              <p className="text-gray-500 text-sm mt-1">We reply within 24 hours</p>
            </div>
            <span className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full font-semibold group-hover:bg-blue-700 transition-colors">
              Send Email
            </span>
          </a>
        </div>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 mt-10 text-gray-500 text-sm">
          <MapPin size={16} className="text-amber-600" />
          <span>{address}</span>
        </div>
      </div>
    </section>
  );
}