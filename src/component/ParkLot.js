import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; // Import addDoc function
import { db2 } from "../FirebaseConfig/Firebase";
import "./styles/Registration.css";

const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useLocation(); // Extracting location from useLocation hook
  const decodedUser = user ? JSON.parse(decodeURIComponent(user)) : null;

  const { search } = useLocation();
  const emailFromLogin = decodedUser ? decodedUser.email : null;

  useEffect(() => {
    console.log("Decoded User:", decodedUser);
    console.log("Email from Login:", emailFromLogin);

    if (decodedUser) {
      setName(decodedUser.name || "");
      setVehicleNumber(decodedUser.vehicleNumber || "");
      setParkingSlotName(decodedUser.parkingSlotName || "");
    }

    if (emailFromLogin) {
      setEmail(emailFromLogin);
      fetchNameFromEmail(emailFromLogin);
    }
  }, [decodedUser, emailFromLogin]);

  const fetchNameFromEmail = async (email) => {
    const userRef = collection(db2, "Auth");
    const userQuery = query(userRef, where("Email", "==", email));
    try {
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          setName(userData.Name || "");
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
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Vehicle Number"
            onChange={(e) => setVehicleNumber(e.target.value)}
            value={vehicleNumber}
          ></input>
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Parking Slot Name"
            onChange={(e) => setParkingSlotName(e.target.value)}
            value={parkingSlotName}
          ></input>
        </div>
        <div className="inputs">
          <select
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            value={selectedTimeSlot}
          >
            <option value="" disabled>
              Select Time Slot
            </option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <button onClick={registration}>Book Parking</button>
      </div>
    </div>
  );
};

export default ParkLot;
