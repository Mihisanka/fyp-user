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
import Footer from './Footer';
import Button from '@mui/material/Button';

const Booking = () => {
  const { user, email } = useParams();
  const decodedUser = user
    ? decodeURIComponent(user.replace(/\+/g, " "))
    : null;
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const navigate = useNavigate();

  const [carparkData, setCarparkData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
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

  const filterData = () => {
    return filter === "all"
      ? carparkData
      : carparkData.filter((marker) => marker.availability === filter);
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

  const userIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M8 0c3.866 0 7 3.582 7 8 0 3.054-1.897 5.694-4.615 6.803-.176.071-.372.117-.572.117-.2 0-.396-.046-.572-.117C9.897 13.694 8 11.054 8 8c0-4.418 3.134-8 7-8zm-4.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
          </svg>`,
  });

  const handleBookClick = (marker) => {
    setSelectedCarpark(marker);
    setShowModal(true);
    navigate("/park-lot", {
      state: { selectedMarkerData: { ...marker, decodedUser } },
    });
    console.log("Selected Marker Data:", { ...marker, decodedUser });
  };

  const findNearestCarparkAndOpenModal = () => {
    if (userLocation) {
      const nearestCarpark = carparkData.reduce((nearest, current) => {
        const distanceToCurrent = L.latLng(current.latitude, current.longitude)
          .distanceTo(userLocation) / 1000; // Convert meters to kilometers
        if (!nearest || distanceToCurrent < nearest.distance) {
          return { ...current, distance: distanceToCurrent };
        }
        return nearest;
      }, null);
      if (nearestCarpark) {
        console.log("Nearest Carpark Data:", nearestCarpark);
        setSelectedCarpark(nearestCarpark);
        setShowModal(true);
      } else {
        console.log("No carpark found");
      }
    } else {
      console.log("User location not available");
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
          center={userLocation || [7.8731, 80.7718]}
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
                  <p>Longitude: {marker.longitude}</p>
                  {/* <button onClick={() => handleBookClick(marker)}>Book</button> */}
                  <Button onClick={() => handleBookClick(marker)} variant="contained" disableElevation>
                  Book
                </Button>
                </div>
              </Popup>
            </Marker>
          ))}
          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <center>
                You are here
                </center>
                <Button onClick={findNearestCarparkAndOpenModal} variant="contained" disableElevation>
                Near me
                </Button>
                {/* <button className="btn btn-primary" onClick={findNearestCarparkAndOpenModal}>Nearest Carpark</button> */}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      <Footer/>
    </div>
  );
};

export default Booking;
