import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db2 } from "../FirebaseConfig/Firebase";
import "./styles/Registration.css";

const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [email, setEmail] = useState("");
  const [marker, setMarker] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const markerData = location.state ? location.state.selectedMarkerData : null;
    if (markerData) {
      setMarker(markerData);
      setParkingSlotName(markerData.address); // Assuming 'address' maps to parkingSlotName
      setEmail(markerData.decodedUser); // Set the email here
    }
  }, [location]);

  useEffect(() => {
    const markerData = location.state ? location.state.selectedMarkerData : null;
    if (markerData && markerData.decodedUser) {
      fetchNameFromEmail(markerData.decodedUser);
    }
  }, [location]);

  useEffect(() => {
    console.log("Marker Data:", marker); // Console log marker data
  }, [marker]); // Add marker as a dependency to this useEffect

  const fetchNameFromEmail = async (email) => {
    const userRef = collection(db2, "Auth");
    const userQuery = query(userRef, where("Email", "==", email));
    try {
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach(async (doc) => {
          const userData = doc.data();
          const searchedName = userData.Name || "";
          setName(searchedName);

          // Now, query the database to find the user by their name
          const userByNameQuery = query(
            userRef,
            where("Name", "==", searchedName)
          );
          const userByNameSnapshot = await getDocs(userByNameQuery);
          if (!userByNameSnapshot.empty) {
            userByNameSnapshot.forEach((doc) => {
              const userDataByName = doc.data();
              const vehicleNumber = userDataByName.Vehiclenumber || "";
              setVehicleNumber(vehicleNumber); // Update vehicle number state
              setMarker((prevMarker) => ({
                ...prevMarker,
                searchedName: searchedName,
                vehicleNumber: vehicleNumber,
              }));
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const registration = async () => {
    try {
      if (!name || !vehicleNumber || !parkingSlotName || !selectedTimeSlot) {
        alert("Please fill in all required fields");
        return;
      }

      const db2ref = collection(db2, "booking");
      await addDoc(db2ref, {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        TimeSlot: selectedTimeSlot,
        Email: email,
      });

      generateReceipt(); // Call the function to generate the receipt

      alert("Booking successful");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while booking. Please try again later.");
    }
  };

  const generateReceipt = () => {
    // Function to generate the receipt using all the data
    console.log("Receipt:");
    console.log("Name:", name);
    console.log("Vehicle Number:", vehicleNumber);
    console.log("Parking Slot Name:", parkingSlotName);
    console.log("Selected Time Slot:", selectedTimeSlot);
    console.log("Email:", email);
    // You can format and display the receipt as needed
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
            value={name || (marker ? marker.decodedUser : "")}
          ></input>
        </div>
        <div className="inputs">
          <label className="label-primary">Vehicle Number</label>
          <input
            type="text"
            placeholder="Vehicle Number"
            onChange={(e) => setVehicleNumber(e.target.value)}
            value={vehicleNumber}
          ></input>
        </div>
        <div className="inputs">
          <label className="label-primary">Parking Slot Name</label>
          <input
            type="text"
            placeholder="Parking Slot Name"
            onChange={(e) => setParkingSlotName(e.target.value)}
            value={parkingSlotName || (marker ? marker.address : "")}
          ></input>
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
