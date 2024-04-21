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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");
  const [marker, setMarker] = useState(null);
  const [vehicleNumberFetched, setVehicleNumberFetched] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success
  const [rating, setRating] = useState(0); // State to hold the selected rating
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
  
      // Combine selectedDate and selectedTime into a single DateTime field
      const dateTime = new Date(selectedDate);
      const timeParts = selectedTime.split(" - ")[0].split(":");
      let hour = parseInt(timeParts[0]);
      const ampm = timeParts[1].slice(-2);
      if (ampm === "pm" && hour !== 12) {
        hour += 12;
      } else if (ampm === "am" && hour === 12) {
        hour = 0;
      }
      dateTime.setHours(hour);
      dateTime.setMinutes(parseInt(timeParts[1].slice(0, -2)));
  
      console.log("Values to be saved:", {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        DateTime: serverTimestamp(),
        BookingDate: dateTime,
        BookingTime: selectedTime,
        Email: email,
        Status: "active", // Add the status attribute with the value "active"
      });
  
      const bookingRef = doc(collection(db2, "booking"));
      await setDoc(bookingRef, {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        DateTime: serverTimestamp(),
        BookingDate: dateTime,
        BookingTime: selectedTime,
        Email: email,
        Status: "active", // Include the status attribute in the document data
      });
  
      setBookingSuccess(true); // Set booking success flag
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while booking. Please try again later.");
    }
  };
  
  
  

  // Function to handle rating submission
  const handleRatingSubmit = async () => {
    try {
      // Check if a rating record already exists for the parking slot
      const ratingQuery = query(
        collection(db2, "ratings"),
        where("ParkingSlotName", "==", parkingSlotName)
      );
      const ratingSnapshot = await getDocs(ratingQuery);

      let totalRating = 0;

      if (!ratingSnapshot.empty) {
        // If a rating record exists, get the existing total rating
        ratingSnapshot.forEach((doc) => {
          const ratingData = doc.data();
          totalRating += ratingData.Rating;
        });
      }

      // Add the new rating to the existing total rating
      totalRating += rating;

      // Update the existing rating record with the new total rating
      await setDoc(doc(collection(db2, "ratings"), parkingSlotName), {
        ParkingSlotName: parkingSlotName,
        Rating: totalRating,
      });

      alert("Rating submitted successfully!");

      // Reset the rating state and booking success flag
      setRating(0);
      setBookingSuccess(false);
    } catch (error) {
      console.error("Error submitting rating: ", error);
      alert(
        "An error occurred while submitting rating. Please try again later."
      );
    }
  };

  // Function to generate time slots in the specified format
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24; i++) {
      const startTime = `${i < 10 ? "0" + i : i}:00 am`;
      const endTime = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}:00 am`;
      timeSlots.push({ startTime, endTime });
    }
    return timeSlots;
  };

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
            value={name || (marker && marker.carparkName)}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Vehicle Number</label>
          <input
            type="text"
            placeholder="Vehicle Number"
            onChange={(e) => setVehicleNumber(e.target.value)}
            value={vehicleNumber || (marker && marker.vehicleNumber)}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Parking Slot Name</label>
          <input
            type="text"
            placeholder="Parking Slot Name"
            onChange={(e) => setParkingSlotName(e.target.value)}
            value={parkingSlotName || (marker && marker.carparkName)}
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Please Select a Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Please Select a Time Slot</label>
          <select
            className="form-control"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            {generateTimeSlots().map((timeSlot, index) => (
              <option key={index} value={timeSlot.startTime}>
                {timeSlot.startTime} - {timeSlot.endTime}
              </option>
            ))}
          </select>
        </div>
        <button onClick={registration}>Book Parking</button>
        {/* Display rating component after successful booking */}
        {bookingSuccess && (
          <div>
            <h3>Please rate the parking slot:</h3>
            {/* Star rating component */}
            <div>
              <input
                type="range"
                className="form-range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
              <button className="btn btn-primary" onClick={handleRatingSubmit}>
                Submit Rating
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkLot;
