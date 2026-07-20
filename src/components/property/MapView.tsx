"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/types";
import { formatPriceCompact, googleMapsUrl } from "@/lib/utils";

/**
 * Custom price-pin marker built with divIcon so we avoid the broken default
 * Leaflet marker-image path under bundlers. Recolored to the SasteGhar accent.
 */
function priceIcon(label: string) {
  return L.divIcon({
    className: "sasteghar-pin",
    html: `<div style="
      background:#8b6f47;color:#fff;font-weight:600;font-size:12px;
      padding:4px 10px;border-radius:9999px;white-space:nowrap;
      box-shadow:0 4px 12px rgba(26,26,26,.35);border:2px solid #fff;
      transform:translateY(-50%);">${label}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

interface MapViewProps {
  properties: Property[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

export default function MapView({
  properties,
  height = "420px",
  zoom = 4,
  center,
}: MapViewProps) {
  const fallbackCenter: [number, number] =
    center ||
    (properties.length
      ? [properties[0].lat, properties[0].lng]
      : [22.5, 79.0]); // geographic centre of India

  return (
    <MapContainer
      center={fallbackCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height, width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={priceIcon(formatPriceCompact(p.price))}
        >
          <Popup>
            <div className="w-44">
              <Image
                src={p.images[0]}
                alt={p.title}
                width={176}
                height={96}
                className="mb-2 h-24 w-full rounded-lg object-cover"
              />
              <p className="text-sm font-semibold text-primary">{p.title}</p>
              <p className="text-xs text-primary-600">
                {p.locality}, {p.city}
              </p>
              <Link
                href={`/properties/${p.slug}`}
                className="mt-1 inline-block text-xs font-semibold text-secondary"
              >
                View details →
              </Link>
              <a
                href={googleMapsUrl(p.lat, p.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block text-xs font-semibold text-secondary"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
