import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

const MapComponent = () => {
  useEffect(() => {
    // Create the map and set the view to a specific location
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Add a tile layer to the map (OpenStreetMap here)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return (
    // Use Tailwind utility classes to style the map container
    <div id="map" className="h-96 w-full"></div>
  );
};

export default MapComponent;
