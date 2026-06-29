"use client";
import { useState } from "react";
import { Box, Layout, X, ZoomIn } from "lucide-react";
import { FloorPlan } from "@/types/project";

export default function FloorPlanCard({ type, area, image, image3D }: FloorPlan) {
  const [show3D, setShow3D] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const activeImage = show3D && image3D ? image3D : image;

  return (
    <>
      <div className="border rounded-2xl overflow-hidden shadow-sm">
        {/* Image */}
        <div
          className="relative w-full h-48 cursor-zoom-in group"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={activeImage}
            alt={`${type} ${show3D ? "3D Render" : "2D Plan"}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Zoom hint on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
            <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          {/* Badge */}
          <span className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded-full font-bold ${show3D ? "bg-purple-600" : "bg-gray-700"}`}>
            {show3D ? "3D Render" : "2D Plan"}
          </span>
        </div>

        {/* Info + toggle */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-gray-800">{type}</p>
            <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-semibold">
              {area}
            </span>
          </div>

          {/* Toggle — only show if 3D image is available */}
          {image3D && (
            <div className="flex gap-2">
              <button
                onClick={() => setShow3D(false)}
                className={`flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-full font-semibold transition-colors ${
                  !show3D
                    ? "bg-gray-800 text-white"
                    : "border border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <Layout size={14} /> 2D Plan
              </button>
              <button
                onClick={() => setShow3D(true)}
                className={`flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-full font-semibold transition-colors ${
                  show3D
                    ? "bg-purple-600 text-white"
                    : "border border-purple-300 text-purple-600 hover:border-purple-400"
                }`}
              >
                <Box size={14} /> 3D Render
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)} // click outside to close
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking image
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <p className="font-bold text-gray-800">{type}</p>
                <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-semibold">
                  {area}
                </span>
                <span className={`text-white text-xs px-2 py-1 rounded-full font-bold ${show3D ? "bg-purple-600" : "bg-gray-700"}`}>
                  {show3D ? "3D Render" : "2D Plan"}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Full image */}
            <img
              src={activeImage}
              alt={`${type} ${show3D ? "3D Render" : "2D Plan"}`}
              className="w-full max-h-[75vh] object-contain bg-gray-50"
            />

            {/* Modal footer toggle — only if 3D available */}
            {image3D && (
              <div className="flex gap-3 px-5 py-4 border-t border-gray-100 justify-center">
                <button
                  onClick={() => setShow3D(false)}
                  className={`flex items-center gap-2 text-sm px-6 py-2 rounded-full font-semibold transition-colors ${
                    !show3D
                      ? "bg-gray-800 text-white"
                      : "border border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <Layout size={14} /> 2D Plan
                </button>
                <button
                  onClick={() => setShow3D(true)}
                  className={`flex items-center gap-2 text-sm px-6 py-2 rounded-full font-semibold transition-colors ${
                    show3D
                      ? "bg-purple-600 text-white"
                      : "border border-purple-300 text-purple-600 hover:border-purple-400"
                  }`}
                >
                  <Box size={14} /> 3D Render
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}