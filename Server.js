const express = require("express");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Booking = require("./Models/Booking");
const Parking = require("./Models/Parking");
const app = express();
const errorHandler = require("./Middlewares/errorHandling");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const userInfo = require("./routes/userInfo");
const countryRouter = require("./routes/country");
const bookingRouter = require("./routes/booking");
const cityRouter = require("./routes/city");
const parkingRouter = require("./routes/parking");
const port = 3000;
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(errorHandler);
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/city", cityRouter);
app.use("/api/parking", parkingRouter);
app.use("/api/country", countryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/user", userInfo);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/complete-payment", async (req, res) => {
  try {
    const { id, userId } = req.body;

    // Check if the booking exists
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res
        .status(404)
        .json({ status: false, error: "Booking not found" });
    }

    // Check if the booking is in a "pending payment" state
    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({
          status: false,
          error: "Booking is not in a pending payment state",
        });
    }

    // Check if the user is authorized to complete the payment
    if (booking.userId !== userId) {
      return res
        .status(403)
        .json({
          status: false,
          error: "User is not authorized to complete this payment",
        });
    }

    // Check if the payment has exceeded the time frame (e.g., 5 minutes)
    const currentTime = new Date();
    const bookingTime = new Date(booking.createdAt);
    const timeDifferenceMinutes = (currentTime - bookingTime) / (1000 * 60);

    if (timeDifferenceMinutes > 5) {
      // Payment time frame has expired
      // Mark the booking as "terminated"
      booking.status = "terminated";
      await booking.save();

      // Increment the available slot count by one

      const parkingSpace = await Parking.findByPk(booking.parkingId);
      if (parkingSpace) {
        parkingSpace.capacity += 1;
        await parkingSpace.save();
      }

      return res
        .status(400)
        .json({ status: false, error: "Payment time frame has expired" });
    }

    // Simulate a payment with your payment gateway   PaymentGateway.processPayment(paymentMethod, paymentAmount, currency);
    const paymentResult = true;
    // if (paymentResult.success) {
    if (paymentResult) {
      // Update the booking status to "completed"
      booking.status = "success";
      await booking.save();

      // Respond with a success message
      return res
        .status(200)
        .json({ status: true, message: "Payment completed successfully" });
    } else {
      // Respond with a payment failure message
      return res.status(400).json({ status: false, error: "Payment failed" });
    }
  } catch (error) {
    // Handle validation errors or database errors
    console.error("Error:", error);
    res
      .status(500)
      .json({
        status: false,
        error: "An error occurred while completing the payment.",
      });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
