// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// const Booking = () => {
//   useEffect(() => {
//     // Initialize Leaflet map only if it's not already initialized
//     const mapContainer = document.getElementById("map");
//     if (!mapContainer?._leaflet_id) {
//       const map = L.map(mapContainer).setView([7.8731, 80.7718], 7);

//       // Add a tile layer (OpenStreetMap)
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(map);
//     }
//   }, []);

//   useEffect(() => {
//     // Resize the map when the window size changes
//     const resizeMap = () => {
//       const map = document.getElementById("map");
//       if (map) {
//         const aboutSection = map.parentElement;
//         const height = aboutSection.offsetHeight;
//         const width = aboutSection.offsetWidth;
//         map.style.height = height + "px";
//         map.style.width = width + "px";

//         const leafletMap = map._leaflet_map;
//         if (leafletMap) {
//           leafletMap.invalidateSize();
//         }
//       }
//     };

//     window.addEventListener("resize", resizeMap);
//     resizeMap(); // Call initially
//     return () => window.removeEventListener("resize", resizeMap); // Cleanup
//   }, []);

//   useEffect(() => {
//     const map = document.getElementById("map");
//     if (map) {
//       const leafletMap = map._leaflet_map;
//       if (leafletMap) {
//         leafletMap.getCanvas().toBlob((blob) => {
//           const img = document.createElement("img");
//           img.src = URL.createObjectURL(blob);
//           map.appendChild(img);
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="test">
//       <div id="map" style={{ width: "100%", height: "1090px" }}></div>
//     </div>
//   );
// };

// export default Booking;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { ref, onValue, off, db1, set } from "../FirebaseConfig/Firebase.js";
// import {
//   MDBModal,
//   MDBModalBody,
//   MDBModalHeader,
//   MDBModalFooter,
//   MDBBtn,
// } from "mdb-react-ui-kit";

// const Booking = () => {
//   const [carparkData, setCarparkData] = useState([]);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCarpark, setSelectedCarpark] = useState(null);

//   useEffect(() => {
//     const fetchData = () => {
//       const carparkRef = ref(db1);
//       const listener = onValue(
//         carparkRef,
//         (snapshot) => {
//           try {
//             if (snapshot && snapshot.exists()) {
//               const data = snapshot.val();
//               const carparkArray = Object.keys(data).map((key) => ({
//                 id: key,
//                 ...data[key],
//               }));
//               setCarparkData(carparkArray);
//               setError(null);
//             } else {
//               setCarparkData([]);
//               setError("No data available");
//             }
//           } catch (error) {
//             setError(error.message);
//           }
//         },
//         (error) => {
//           setError(error.message);
//         }
//       );

//       const interval = setInterval(fetchData, 5000);

//       return () => {
//         off(carparkRef, "value", listener);
//         clearInterval(interval);
//       };
//     };

//     fetchData();
//   }, []);

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//     setShowModal(false);
//   };

//   const filterData = () => {
//     return filter === "all"
//       ? carparkData
//       : carparkData.filter((marker) => marker.availability === filter);
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const customIcon = (availability) => {
//     const fillColor = availability === "unavailable" ? "red" : "green";
//     return L.divIcon({
//       className: "custom-div-icon",
//       html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${fillColor}" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//               <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
//             </svg>`,
//     });
//   };

//   const handleBookClick = (marker) => {
//     setSelectedCarpark(marker);
//     setShowModal(true);
//   };

//   const handleBookCarpark = (id, marker, e) => {
//     e.stopPropagation();

//     if (!marker || !marker.uuid) {
//       console.error("Invalid selected carpark");
//       return;
//     }

//     // Convert marker.uuid to string explicitly
//     const carparkRef = ref(db1, String(marker.uuid));
//     const updatedBookings = (marker.booking || 0) + 1;

//     set(carparkRef, { bookings: updatedBookings })
//       .then(() => {
//         console.log("Document successfully updated!");
//         setSelectedCarpark(null);
//         setShowModal(false);
//       })
//       .catch((error) => {
//         console.error("Error updating document:", error);
//         setError("Error updating document: " + error.message);
//       });
//   };

//   return (
//     <div id="map" style={{ width: "100%", height: "1090px" }}>
//       <div className="filter form-group">
//         <label htmlFor="filter" className="label">
//           Filter by Availability :
//         </label>
//         <select
//           id="filter"
//           className="form-control"
//           value={filter}
//           onChange={handleFilterChange}
//         >
//           <option value="all">All</option>
//           <option value="available">Available</option>
//           <option value="unavailable">Unavailable</option>
//         </select>
//       </div>
//       <MDBModal show={showModal} onHide={toggleModal}>
//         <MDBModalHeader>Book Carpark</MDBModalHeader>
//         <MDBModalBody>
//           {selectedCarpark && (
//             <>
//               <h2>{selectedCarpark.carparkName}</h2>
//               <p>Enter number of hours:</p>
//               <input
//                 type="number"
//                 value={selectedCarpark.bookings || ""}
//                 onChange={(e) =>
//                   setSelectedCarpark({
//                     ...selectedCarpark,
//                     bookings: parseInt(e.target.value, 10),
//                   })
//                 }
//               />
//             </>
//           )}
//         </MDBModalBody>
//         <MDBModalFooter>
//           <MDBBtn color="secondary" onClick={toggleModal}>
//             Close
//           </MDBBtn>
//           <MDBBtn
//             color="primary"
//             onClick={(e) =>
//               handleBookCarpark(selectedCarpark.id, selectedCarpark, e)
//             }
//           >
//             Book
//           </MDBBtn>
//         </MDBModalFooter>
//       </MDBModal>
//       {carparkData.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <MapContainer
//           center={[7.8731, 80.7718]}
//           zoom={8}
//           style={{ width: "100%", height: "800px" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {filterData().map((marker) => (
//             <Marker
//               key={marker.id}
//               position={[
//                 parseFloat(marker.latitude),
//                 parseFloat(marker.longitude),
//               ]}
//               icon={customIcon(marker.availability)}
//             >
//               <Popup>
//                 <div>
//                   <h2>{marker.carparkName}</h2>
//                   <p
//                     style={{
//                       color:
//                         marker.availability === "available" ? "green" : "red",
//                     }}
//                   >
//                     Availability :{" "}
//                     {marker.availability.charAt(0).toUpperCase() +
//                       marker.availability.slice(1)}
//                   </p>
//                   <p>Price : Rs.{marker.price}.00</p>
//                   <p>Latitude: {marker.latitude}</p>
//                   <p>Longitude: {marker.longitude}</p>
//                   <p>Bookings :{marker.bookings || 0}</p>
//                   <button onClick={() => handleBookClick(marker)}>Book</button>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default Booking;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onValue, off, db1, set } from "../FirebaseConfig/Firebase.js";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit";

const Booking = () => {
  const [carparkData, setCarparkData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false); // Changed default value to false
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const carparkRef = ref(db1);
      const listener = onValue(
        carparkRef,
        (snapshot) => {
          try {
            if (snapshot && snapshot.exists()) {
              const data = snapshot.val();
              const carparkArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }));
              setCarparkData(carparkArray);
              setError(null);
            } else {
              setCarparkData([]);
              setError("No data available");
            }
          } catch (error) {
            setError(error.message);
          }
        },
        (error) => {
          setError(error.message); // Handle Firebase-related errors
        }
      );

      const interval = setInterval(fetchData, 5000);

      return () => {
        off(carparkRef, "value", listener); // Remove the listener
        clearInterval(interval);
      };
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowModal(false); // Close modal when filter changes
  };

  const filterData = () => {
    return filter === "all"
      ? carparkData
      : carparkData.filter((marker) => marker.availability === filter);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const customIcon = (availability) => {
    const fillColor = availability === "unavailable" ? "red" : "green";
    return L.divIcon({
      className: "custom-div-icon",
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${fillColor}" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>`,
    });
  };

  const handleBookClick = (marker) => {
    setSelectedCarpark(marker);
    setShowModal(true);
  };

  const handleBookCarpark = (id, e) => {
    e.stopPropagation();

    console.log("Selected Carpark:", selectedCarpark);

    if (selectedCarpark && selectedCarpark.bookedHours) {
      const updatedCarparkData = {
        bookings: selectedCarpark.bookedHours, // Update with the count of bookings
      };

      const carparkRef = ref(db1, id);
      set(carparkRef, updatedCarparkData)
        .then(() => {
          console.log("Document successfully updated!");
          // Update carparkData state
          setCarparkData((prevData) =>
            prevData.map((carpark) =>
              carpark.id === selectedCarpark.id
                ? { ...carpark, ...updatedCarparkData }
                : carpark
            )
          );
          // Clear selected carpark and close modal
          setSelectedCarpark(null);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error updating document:", error);
          setError("Error updating document");
        });
    } else {
      console.error("Invalid selected carpark or booked hours");
      setError("Invalid selected carpark or booked hours");
    }
  };

  return (
    <div id="map" style={{ width: "100%", height: "1090px" }}>
      <div className="filter form-group">
        <label htmlFor="filter" className="label">
          Filter by Availability :
        </label>
        <select
          id="filter"
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <MDBModal show={showModal} onHide={toggleModal}>
        <MDBModalHeader>Book Carpark</MDBModalHeader>
        <MDBModalBody>
          {selectedCarpark && (
            <>
              <h2>{selectedCarpark.carparkName}</h2>
              <p>Enter number of hours:</p>
              <input
                type="number"
                value={selectedCarpark.bookedHours || ""}
                onChange={(e) =>
                  setSelectedCarpark({
                    ...selectedCarpark,
                    bookedHours: parseInt(e.target.value, 10),
                  })
                }
              />
            </>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModal}>
            Close
          </MDBBtn>
          <MDBBtn
            color="primary"
            onClick={() => handleBookCarpark(selectedCarpark.id)}
          >
            Book
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      {carparkData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <MapContainer
          center={[7.8731, 80.7718]}
          zoom={8}
          style={{ width: "100%", height: "800px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filterData().map((marker) => (
            <Marker
              key={marker.id}
              position={[
                parseFloat(marker.latitude),
                parseFloat(marker.longitude),
              ]} // Parse coordinates as floats
              icon={customIcon(marker.availability)}
            >
              <Popup>
                <div>
                  <h2>{marker.carparkName}</h2>
                  <p
                    style={{
                      color:
                        marker.availability === "available" ? "green" : "red",
                    }}
                  >
                    Availability :{" "}
                    {marker.availability.charAt(0).toUpperCase() +
                      marker.availability.slice(1)}
                  </p>
                  <p>Price : Rs.{marker.price}.00</p>
                  <p>Latitude: {marker.latitude}</p>
                  <p>Longitude: {marker.longitude}</p>
                  <button onClick={() => handleBookClick(marker)}>Book</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Booking;
