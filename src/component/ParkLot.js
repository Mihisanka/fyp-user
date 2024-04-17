import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db2 } from "../FirebaseConfig/Firebase";
import "./styles/Registration.css";
import { serverTimestamp } from "firebase/firestore";

const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [email, setEmail] = useState("");
  const [marker, setMarker] = useState(null);
  const [vehicleNumberFetched, setVehicleNumberFetched] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const markerData = location.state
          ? location.state.selectedMarkerData
          : null;
        if (markerData) {
          console.log("Marker Data:", markerData);
          setMarker(markerData);
          setParkingSlotName(markerData.carparkName);
          setEmail(markerData.decodedUser);

          // Fetch vehicle number and name
          await fetchVehicleData(markerData.decodedUser);
          await fetchName(markerData.decodedUser);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  const fetchName = async (email) => {
    try {
      const userQuery = query(
        collection(db2, "Auth"),
        where("Email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          const name = userData.Name || "";
          setName(name);
        });
      }
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  };

  const fetchVehicleData = async (email) => {
    try {
      const userQuery = query(
        collection(db2, "Auth"),
        where("Email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          const vehicleNumber = userData.Vehiclenumber || "";
          setVehicleNumber(vehicleNumber);
          setVehicleNumberFetched(true); // Set vehicle number fetched flag
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle number:", error);
    }
  };

  const registration = async () => {
    try {
      if (!vehicleNumberFetched) {
        alert("Please fill in all required fields");
        return;
      }

      console.log("Values to be saved:", {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        TimeSlot: selectedTimeSlot,
        Email: email,
        BookingDate: serverTimestamp(),
      });

      const bookingRef = doc(collection(db2, "booking"));
      await setDoc(bookingRef, {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        TimeSlot: selectedTimeSlot,
        Email: email,
        BookingDate: serverTimestamp(), // Save current date as server timestamp
      });

      alert("Booking successful");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while booking. Please try again later.");
    }
  };

  const timeSlots = [
    "00:00 - 01:00",
    "01:00 - 02:00",
    // Add other time slots here
  ];

  return (
    <div className="container">
      <div className="head">
        <h2>Booking</h2>
        <div className="inputs">
          <label className="label-primary">Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Vehicle Number</label>
          <input
            type="text"
            placeholder="Vehicle Number"
            onChange={(e) => setVehicleNumber(e.target.value)}
            value={vehicleNumber}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Parking Slot Name</label>
          <input
            type="text"
            placeholder="Parking Slot Name"
            onChange={(e) => setParkingSlotName(e.target.value)}
            value={parkingSlotName}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Please Select a time</label>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedTimeSlot ? selectedTimeSlot : "Select Time Slot"}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={registration}>Book Parking</button>
      </div>
    </div>
  );
};

export default ParkLot;
