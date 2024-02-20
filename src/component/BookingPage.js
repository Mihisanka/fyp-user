// import React, { useState } from 'react';
// import './styles/BookingPage.css'; // Import the CSS file for styling
// //import Devmap from './Devmap';

// function BookingPage() {
//   // Define state for form inputs
//   const [location, setLocation] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [dateTime, setDateTime] = useState('');
//   const [selectedSlot, setSelectedSlot] = useState('');

//   // Handle form submission
//   const handleBookNow = () => {
//     // Implement booking logic here (e.g., send a request to a server)
//     alert('Booking completed!'); // Replace with actual booking logic

//     // Clear form fields after booking
//     setLocation('');
//     setVehicleNumber('');
//     setDateTime('');
//     setSelectedSlot('');
//   };

//   return (
//     <div >
//     <div className="map">
//     <>{/*<Devmap/> */}

//       </>

//       </div>
//        <div className="booking-page">

//       <h1>Book Parking</h1>
//       <form className="booking-form">
//         <div className="form-group">
//           <label>Location:</label>
//           <select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           >
//             <option value="">Select Location</option>
//             <option value="A">Location A</option>
//             <option value="B">Location B</option>
//             <option value="C">Location C</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Vehicle Number:</label>
//           <input
//             type="text"
//             value={vehicleNumber}
//             onChange={(e) => setVehicleNumber(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Date and Time:</label>
//           <input
//             type="datetime-local"
//             value={dateTime}
//             onChange={(e) => setDateTime(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Parking Slot:</label>
//           <select
//             value={selectedSlot}
//             onChange={(e) => setSelectedSlot(e.target.value)}
//           >
//             <option value="">Select Slot</option>
//             {/* Populate slot options dynamically based on location */}
//             {location &&
//               ['A', 'B', 'C'].includes(location) &&
//               Array.from({ length: 5 }).map((_, index) => (
//                 <option key={index} value={`${location}-${index + 1}`}>
//                   {`${location}-${index + 1}`}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <button type="button" onClick={handleBookNow}>
//           Book Now
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// }

// export default BookingPage;

import React from "react";

function BookingPage() {
  return (
    <div>
      <div>
        <h1>Booking</h1>
      </div>
    </div>
  );
}

export default BookingPage;
