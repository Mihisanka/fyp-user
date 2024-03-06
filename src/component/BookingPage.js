import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

const Booking = () => {
  useEffect(() => {
    // Initialize Leaflet map only if it's not already initialized
    const mapContainer = document.getElementById("map");
    if (!mapContainer?._leaflet_id) {
      const map = L.map(mapContainer).setView([7.8731, 80.7718], 7);

      // Add a tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
    }
  }, []);

  useEffect(() => {
    // Resize the map when the window size changes
    const resizeMap = () => {
      const map = document.getElementById("map");
      if (map) {
        const aboutSection = map.parentElement;
        const height = aboutSection.offsetHeight;
        const width = aboutSection.offsetWidth;
        map.style.height = height + "px";
        map.style.width = width + "px";

        const leafletMap = map._leaflet_map;
        if (leafletMap) {
          leafletMap.invalidateSize();
        }
      }
    };

    window.addEventListener("resize", resizeMap);
    resizeMap(); // Call initially
    return () => window.removeEventListener("resize", resizeMap); // Cleanup
  }, []);

  useEffect(() => {
    const map = document.getElementById("map");
    if (map) {
      const leafletMap = map._leaflet_map;
      if (leafletMap) {
        leafletMap.getCanvas().toBlob((blob) => {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(blob);
          map.appendChild(img);
        });
      }
    }
  }, []);

  return (
    <div className="test">
      <div id="map" style={{ width: "100%", height: "1090px" }}></div>
    </div>
  );
};

export default Booking;