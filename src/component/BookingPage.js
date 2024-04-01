// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
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
//   const { user, email } = useParams(); // Extracting both user and email parameters
//   const decodedUser = user
//     ? decodeURIComponent(user.replace(/\+/g, " "))
//     : null; // Replace '+' with space
//   const decodedEmail = email ? decodeURIComponent(email) : ""; // Ensure decodedEmail is not undefined
//   const navigate = useNavigate();

//   const [carparkData, setCarparkData] = useState([]);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCarpark, setSelectedCarpark] = useState(null);

//   useEffect(() => {
//     console.log("User:", decodedUser);
//     console.log("Email:", decodedEmail);

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

//   function handleFilterChange(event) {
//     setFilter(event.target.value);
//     setShowModal(false);
//   }

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
//     navigate(
//       `/park-lot?user=${encodeURIComponent(
//         JSON.stringify(marker)
//       )}&email=${encodeURIComponent(decodedEmail)}`
//     );
//   };

//   const handleBookCarpark = (id, selectedCarparkData, e) => {
//     e.stopPropagation();

//     console.log("Selected Carpark Data:", selectedCarparkData);

//     if (selectedCarparkData && selectedCarparkData.bookedHours) {
//       const updatedCarparkData = {
//         bookings: selectedCarparkData.bookedHours,
//       };

//       const carparkRef = ref(db1, id);
//       set(carparkRef, updatedCarparkData)
//         .then(() => {
//           console.log("Document successfully updated!");
//           setCarparkData((prevData) =>
//             prevData.map((carpark) =>
//               carpark.id === selectedCarparkData.id
//                 ? { ...carpark, ...updatedCarparkData }
//                 : carpark
//             )
//           );
//           setSelectedCarpark(null);
//           setShowModal(false);
//         })
//         .catch((error) => {
//           console.error("Error updating document:", error);
//           setError("Error updating document");
//         });
//     } else {
//       console.error("Invalid selected carpark or booked hours");
//       setError("Invalid selected carpark or booked hours");
//     }
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
//       <MDBModal show={showModal.toString()} onHide={() => setShowModal(false)}>
//         <MDBModalHeader>Book Carpark</MDBModalHeader>
//         <MDBModalBody>
//           {selectedCarpark && (
//             <>
//               <h2>{selectedCarpark.carparkName}</h2>
//               <p>Enter number of hours:</p>
//               <input
//                 type="number"
//                 value={selectedCarpark.bookedHours || ""}
//                 onChange={(e) =>
//                   setSelectedCarpark({
//                     ...selectedCarpark,
//                     bookedHours: parseInt(e.target.value, 10),
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
//             onClick={() =>
//               handleBookCarpark(selectedCarpark.id, selectedCarpark)
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
import { Link, useParams, useNavigate } from "react-router-dom";
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
  const { user, email } = useParams(); // Extracting both user and email parameters
  const decodedUser = user
    ? decodeURIComponent(user.replace(/\+/g, " "))
    : null; // Replace '+' with space
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const navigate = useNavigate();

  const [carparkData, setCarparkData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
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
          setError(error.message);
        }
      );

      const interval = setInterval(fetchData, 5000);

      return () => {
        off(carparkRef, "value", listener);
        clearInterval(interval);
      };
    };

    fetchData();
  }, [email]); // Include decodedEmail in the dependency array

  function handleFilterChange(event) {
    setFilter(event.target.value);
    setShowModal(false);
  }

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
    navigate(
      `/park-lot?user=${encodeURIComponent(
        JSON.stringify(marker)
      )}&email=${encodeURIComponent(email)}`
    );
  };

  const handleBookCarpark = (id, selectedCarparkData, e) => {
    e.stopPropagation();

    console.log("Selected Carpark Data:", selectedCarparkData);

    if (selectedCarparkData && selectedCarparkData.bookedHours) {
      const updatedCarparkData = {
        bookings: selectedCarparkData.bookedHours,
      };

      const carparkRef = ref(db1, id);
      set(carparkRef, updatedCarparkData)
        .then(() => {
          console.log("Document successfully updated!");
          setCarparkData((prevData) =>
            prevData.map((carpark) =>
              carpark.id === selectedCarparkData.id
                ? { ...carpark, ...updatedCarparkData }
                : carpark
            )
          );
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
      <MDBModal show={showModal.toString()} onHide={() => setShowModal(false)}>
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
            onClick={() =>
              handleBookCarpark(selectedCarpark.id, selectedCarpark)
            }
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
              ]}
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
