import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { db1, db2 } from "../FirebaseConfig/Firebase.js"; // Import the Firebase Realtime Database reference
import { ref, get, update } from "firebase/database"; // Import Realtime Database methods
import DateTimePicker from '@mui/lab/DateTimePicker'; // Import DateTimePicker component
import "./styles/Registration.css";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';



const ParkLot = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [parkingSlotName, setParkingSlotName] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null); // State for selected date and time
  const [email, setEmail] = useState("");
  const [marker, setMarker] = useState(null);
  const [vehicleNumberFetched, setVehicleNumberFetched] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const markerData = location.state ? location.state.selectedMarkerData : null;
      if (markerData) {
        console.log("Marker Data:", markerData);

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
  }, []);

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
          markerData.updatedCapacity = updatedCapacity; // Add updatedCapacity to markerData
          console.log("Updated Marker Data:", markerData);
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
      const carparkRef = ref(db1, parkingSlotId); // Reference to the parking slot
      const snapshot = await get(carparkRef);
      if (snapshot.exists()) {
        console.log("Carpark Data:", snapshot.val()); // Logging carpark data
        const currentCapacity = snapshot.val().capacity; // Accessing capacity field directly
        const updatedCapacity = currentCapacity - 1;
        await update(carparkRef, { capacity: updatedCapacity }); // Updating capacity field
        return updatedCapacity;
      }
    } catch (error) {
      console.error("Error decreasing capacity:", error);
      throw error; // Throw the error to handle it in the calling function
    }
  };

  const registration = async () => {
    try {
      if (!vehicleNumberFetched || !selectedDateTime) {
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
        TimeSlot: selectedDateTime.toString(),
        Email: email,
        BookingDate: serverTimestamp(),
        Status: "active",
        Capacity: updatedCapacity, // Add the updated capacity to the booking data
      });

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
      navigate(
        `/booking/${encodeURIComponent(email)}?user=${encodeURIComponent(JSON.stringify({ email }))}`
      );
      setRating(0);
      setBookingSuccess(false);
    } catch (error) {
      console.error("Error submitting rating: ", error);
      alert("An error occurred while submitting rating. Please try again later.");
    }
  };

  const timeSlots = [
    "00:00 - 01:00",
    "01:00 - 02:00",
    // Other time slots...
  ];

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
  };

  return (
    <div className="container">
      <div>
        <ListItem disablePadding>
          <Button component={Link} to="/booking/:user">
            <ListItemText primary="Back" />
          </Button>
        </ListItem>
      </div>

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
            readOnly
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
  <label className="label-primary">Date and Time</label>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DesktopDatePicker
      value={selectedDateTime}
      minDate={new Date()} // Restrict selection to today or future dates
      onChange={(date) => setSelectedDateTime(date)}
      renderInput={(params) => <TextField {...params} />}
      label="Select Date"
      inputFormat="dd/MM/yyyy"
      openTo="day" // Show calendar view by default
      views={['day']} // Show only the day view (calendar)
    />
    <DesktopTimePicker
      value={selectedDateTime}
      onChange={(date) => setSelectedDateTime(date)}
      renderInput={(params) => <TextField {...params} />}
      label="Select Time"
      minutesStep={60} // Set time interval to 1 hour
    />
  </LocalizationProvider>
</div>


        <Button onClick={registration} variant="contained" disableElevation>
          Booking
        </Button>
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
