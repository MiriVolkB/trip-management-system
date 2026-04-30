import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// תיקון אייקון
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Location = {
  id: string;
  name?: string;
  lat: number;
  lng: number;
  time?: string;
};

const teacherLocation = {
  lat: 32.0853,
  lng: 34.7818,
  name: "המורה"
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // ק"מ
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapView({ style }: any) {
  const [locations, setLocations] = useState<Location[]>([]);

  // 📡 פונקציה שמביאה נתונים מהבאק
  const fetchLocations = async () => {
    const res = await fetch("http://localhost:3001/locations");
    const data = await res.json();

    // אם עדיין DMS - אפשר לשנות פה בעתיד
    setLocations(data);
  };
  console.log("LOCATIONS FROM SERVER:", locations);

  // 🔄 רץ פעם ראשונה + כל דקה
  useEffect(() => {
    fetchLocations();
    const interval = setInterval(() => { fetchLocations(); }, 60000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🧑‍🎓 כל התלמידים */}
        {locations.map((loc) => {
          const distance = getDistance(
            teacherLocation.lat,
            teacherLocation.lng,
            loc.lat,
            loc.lng
          );

          const isFar = distance > 3;

          return (
            <Marker key={`${loc.id}-${loc.time}`} position={[loc.lat, loc.lng]}>
              <Tooltip permanent direction="top" offset={[0, -10]}>
                <span style={{ fontWeight: "bold" }}>
                  {loc.name}{isFar && "🚨"}
                </span>
              </Tooltip>
              <Popup>
                תלמיד: {loc.name}
                <br />
                שעה: {loc.time}
              </Popup>
            </Marker>
          );
        })}
        <Marker position={[teacherLocation.lat, teacherLocation.lng]}>
          <Tooltip permanent>👩‍🏫 המורה</Tooltip>
        </Marker>

      </MapContainer>
    </div>
  );
}