import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import medicationController from "./medication/medication.controller";
import unitOfMeasureController from "./medication/unit-of-measure.controller";
import usersController from "./users/users.controller";
import appointmentController from "./appointments/appointment.controller";
import appointmentDetailController from "./appointments/appointment-detail.controller";
import authController from "./auth/auth.controller";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authController);
app.use("/api/medications", medicationController);
app.use("/api/units-measure", unitOfMeasureController);
app.use("/api/users", usersController);
app.use("/api/appointments/detail", appointmentDetailController);
app.use("/api/appointments", appointmentController);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello world",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
