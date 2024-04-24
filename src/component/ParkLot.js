import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { ref, get, update } from "firebase/database";
import "./styles/Registration.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QRCode from "qrcode.react";
import { db1, db2 } from "../FirebaseConfig/Firebase.js";
import Button from '@mui/material/Button';

const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumberFetched, setVehicleNumberFetched] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [qrData, setQrData] = useState(""); // State to store QR code data
  const location = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef(null); // Ref for QR code download anchor
  const [marker, setMarker] = useState(null);

  const fetchData = async () => {
    try {
      const markerData = location.state ? location.state.selectedMarkerData : null;
      if (markerData) {
        // Fetch necessary data
        const updatedMarkerData = await fetchVehicleDataAndUpdateMarker(markerData);
        setMarker(updatedMarkerData);
        setParkingSlotName(markerData.carparkName);
        setEmail(markerData.decodedUser);
        await fetchVehicleData(markerData.decodedUser);
        await fetchName(markerData.decodedUser);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchName = async (email) => {
    try {
      const userQuery = query(collection(db2, "Auth"), where("Email", "==", email));
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
      const userQuery = query(collection(db2, "Auth"), where("Email", "==", email));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          const vehicleNumber = userData.Vehiclenumber || "";
          setVehicleNumber(vehicleNumber);
          setVehicleNumberFetched(true);
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle number:", error);
    }
  };

  const fetchVehicleDataAndUpdateMarker = async (markerData) => {
    try {
      const updatedCapacity = markerData.capacity - 1;
      const userQuery = query(collection(db2, "Auth"), where("Email", "==", markerData.decodedUser));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          const vehicleNumber = userData.Vehiclenumber || "";
          markerData.vehicleNumber = vehicleNumber;
          markerData.updatedCapacity = updatedCapacity;
          setVehicleNumber(vehicleNumber);
          setVehicleNumberFetched(true);
        });
      }
      return markerData;
    } catch (error) {
      console.error("Error fetching vehicle number:", error);
      return markerData;
    }
  };

  const decreaseCapacity = async (parkingSlotId) => {
    try {
      const carparkRef = ref(db1, parkingSlotId);
      const snapshot = await get(carparkRef);
      if (snapshot.exists()) {
        const currentCapacity = snapshot.val().capacity;
        const updatedCapacity = currentCapacity - 1;
        await update(carparkRef, { capacity: updatedCapacity });
        return updatedCapacity;
      }
    } catch (error) {
      console.error("Error decreasing capacity:", error);
      throw error;
    }
  };

  const registration = async () => {
    try {
      if (!vehicleNumberFetched || !selectedDate || !selectedTime) {
        alert("Please fill in all required fields");
        return;
      }
      const markerData = location.state ? location.state.selectedMarkerData : null;
      const updatedCapacity = await decreaseCapacity(markerData.id);
  
      const bookingRef = doc(collection(db2, "booking"));
      await setDoc(bookingRef, {
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        BookingDate: selectedDate,
        BookingTime: selectedTime,
        Email: email,
        Status: "active",
        Capacity: updatedCapacity,
      });

      // Generate QR code data
      const qrData = JSON.stringify({
        Name: name,
        VehicleNumber: vehicleNumber,
        ParkingSlotName: parkingSlotName,
        BookingDate: selectedDate,
        BookingTime: selectedTime,
        Email: email,
      });
      setQrData(qrData);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while booking. Please try again later.");
    }
  };  

  const handleRatingSubmit = async () => {
    try {
      const ratingQuery = query(collection(db2, "ratings"), where("ParkingSlotName", "==", parkingSlotName));
      const ratingSnapshot = await getDocs(ratingQuery);

      let totalRating = 0;

      if (!ratingSnapshot.empty) {
        ratingSnapshot.forEach((doc) => {
          const ratingData = doc.data();
          totalRating += ratingData.Rating;
        });
      }

      totalRating += rating;

      await setDoc(doc(collection(db2, "ratings"), parkingSlotName), {
        ParkingSlotName: parkingSlotName,
        Rating: totalRating,
      });

      alert("Rating submitted successfully!");
      navigate(`/booking/${encodeURIComponent(email)}?user=${encodeURIComponent(JSON.stringify({ email }))}`);
      setRating(0);
      setBookingSuccess(false);
    } catch (error) {
      console.error("Error submitting rating: ", error);
      alert("An error occurred while submitting rating. Please try again later.");
    }
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24; i++) {
      const startTime = `${i < 10 ? "0" + i : i}:00 am`;
      const endTime = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}:00 am`;
      timeSlots.push({ startTime, endTime });
    }
    return timeSlots;
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const qrImageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImageURL;
    downloadLink.download = "booking_qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
          <label className="label-primary">Please Select a Date </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="inputs">
          <label className="label-primary">Please Select a Time Slot </label>
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
        {/* <button onClick={registration}>Book Parking</button> */}
        <Button onClick={registration} variant="contained" disableElevation>
        Book Parking
                </Button>

                

                {bookingSuccess && qrData && (
                  
          <div className="qr-code" ref={qrRef}>
            <h3>Booking QR Code:</h3>
            <center>
            <QRCode value={qrData} />
            </center>
            {/* <button onClick={handleDownloadQR}>Download QR Code</button> */}
            <Button onClick={handleDownloadQR} variant="contained" disableElevation>
            Download QR Code
                  </Button>
                 
          </div>
         
        )}
        
        {bookingSuccess && (
          <div>
            <h3>Please rate the parking slot:</h3>
            <div>
              <input
                type="range"
                className="form-range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
              {/* <button className="btn btn-primary" onClick={handleRatingSubmit}>
                Submit Rating
              </button> */}
               <Button onClick={handleRatingSubmit} variant="contained" disableElevation>
               Submit Rating
                </Button>
              
            </div>
          </div>
        )}
      </div>
       
    </div>
  );
};

export default ParkLot;
