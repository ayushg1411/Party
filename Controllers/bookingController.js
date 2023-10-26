const { Transaction } = require("sequelize");
const Booking = require("../Models/Booking");
const { v4: uuidv4 } = require("uuid");
const Parking =require('../Models/Parking')





function generateUniqueBookingId() {
    return uuidv4(); // Generate a new UUID
  }
module.exports = {
 
    addBooking: async (req, res, next) => {
        try {
            const { userId, timeIn, timeOut, parkingId } = req.body;
        
            // Retrieve the parking space by parkingId
            const id =parkingId;
            const parkingSpace = await Parking.findByPk(id);
        
            if (!parkingSpace) {
              return res.status(404).json({ error: "Parking space not found" });
            }
        
            // Check if there are available slots
            console.log(parkingSpace)
            if (parkingSpace.capacity > 0) {
              // Decrement the available count by 1
              parkingSpace.capacity -= 1;
        
              // Save the updated available count back to the database
              await parkingSpace.save();
        
              // Generate a unique booking ID
              const bookingId = generateUniqueBookingId();
        
              // Create a new booking record in the database
              const newBooking = await Booking.create({
                bookingId,
                userId,
                timeIn,
                timeOut,
                parkingId,
              });
        
              // Respond with the newly created booking as JSON
              return res.status(201).json(newBooking);
            } else {
              return res.status(400).json({ error: "No available slots for booking" });
            }
          } catch (error) {
            // Handle validation errors or database errors
            console.error("Error:", error);
            res
              .status(500)
              .json({ error: "An error occurred while creating the booking." });
          }

    },

 
};

// app.post("/bookings", async (req, res) => {
//     try {
//       const { userId, timeIn, timeOut, parkingId } = req.body;
  
//       // Retrieve the parking space by parkingId
//       const parkingSpace = await Parking.findByPk(parkingId);
  
//       if (!parkingSpace) {
//         return res.status(404).json({ error: "Parking space not found" });
//       }
  
//       // Check if there are available slots
//       if (parkingSpace.available_slot > 0) {
//         // Decrement the available count by 1
//         parkingSpace.available_slot -= 1;
  
//         // Save the updated available count back to the database
//         await parkingSpace.save();
  
//         // Generate a unique booking ID
//         const bookingId = generateUniqueBookingId();
  
//         // Create a new booking record in the database
//         const newBooking = await Booking.create({
//           bookingId,
//           userId,
//           timeIn,
//           timeOut,
//           parkingId,
//         });
  
//         // Respond with the newly created booking as JSON
//         return res.status(201).json(newBooking);
//       } else {
//         return res.status(400).json({ error: "No available slots for booking" });
//       }
//     } catch (error) {
//       // Handle validation errors or database errors
//       console.error("Error:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while creating the booking." });
//     }
//   });