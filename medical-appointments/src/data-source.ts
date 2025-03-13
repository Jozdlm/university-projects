import { DataSource } from "typeorm";
import { Medication } from "./medication/medication";

import { UnitOfMeasure } from "./medication/unit-of-measure";

// Load environment variables
import dotenv from "dotenv";
import { User } from "./users/user";
import { Appointment } from "./appointments/appointment";
import { AppointmentDetail } from "./appointments/appointment-detail";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Medication, UnitOfMeasure, User, Appointment, AppointmentDetail],
  // synchronize: true,
});
