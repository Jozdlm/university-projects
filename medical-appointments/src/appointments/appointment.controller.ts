import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source"; // Adjust the import path as necessary
import { Appointment } from "./appointment";
import { authMiddleware } from "../auth/auth.middleware";
import { Not } from "typeorm";
import { User } from "../users/user";

const router = Router();

router.use(authMiddleware);

const citaRepository = AppDataSource.getRepository(Appointment);
const userRepository = AppDataSource.getRepository(User);

// Get all citas
router.get("/", async (req: Request, res: Response) => {
  try {
    const citas = await citaRepository.find({
      relations: {
        paciente: true,
        doctor: true,
        secretaria: true,
      },
    });
    res.json(citas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving citas" });
  }
});

// Get a cita by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const cita = await citaRepository.findOne({
      where: { id },
      relations: {
        paciente: true,
        doctor: true,
        secretaria: true,
      },
    });

    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ message: `Cita not found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cita" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      fecha,
      hora,
      siguiente_cita_fecha,
      siguiente_cita_hora,
      precio_cita,
      diagnostico,
      estado,
      paciente,
      doctor,
      secretaria,
    } = req.body;

    // Retrieve User entities based on the provided CUI values
    const pacienteUser = await userRepository.findOneBy({ cui: paciente });
    const doctorUser = await userRepository.findOneBy({ cui: doctor });
    const secretariaUser = await userRepository.findOneBy({ cui: secretaria });

    // Check if users are found
    if (!pacienteUser || !doctorUser || !secretariaUser) {
      return res.status(400).json({ message: "Invalid user ID(s) provided." });
    }

    // Check if an appointment already exists for the given date, time, and doctor
    const existingCita = await citaRepository.findOne({
      where: { fecha, hora, doctor: doctorUser },
    });

    if (existingCita) {
      return res.status(409).json({
        message:
          "An appointment is already scheduled at this date and time for the selected doctor.",
      });
    }

    // Create and save the new appointment with retrieved entities
    const cita = citaRepository.create({
      fecha,
      hora,
      siguiente_cita_fecha,
      siguiente_cita_hora,
      precio_cita,
      diagnostico,
      estado,
      paciente: pacienteUser,
      doctor: doctorUser,
      secretaria: secretariaUser,
    });
    const savedCita = await citaRepository.save(cita);

    res.status(201).json(savedCita);
  } catch (error) {
    console.error("Error saving cita:", error);
    res.status(500).json({ message: "Error saving cita" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const cita = await citaRepository.findOne({
      where: { id },
      relations: ["paciente", "doctor", "secretaria"],
    });

    if (!cita) {
      return res.status(404).json({ message: `Cita not found with ID: ${id}` });
    }

    const { fecha, hora, doctor } = req.body;

    // Check if the doctor exists if ID was provided
    const doctorUser = doctor
      ? await userRepository.findOneBy({ cui: doctor })
      : cita.doctor;
    if (!doctorUser) {
      return res.status(400).json({ message: "Invalid doctor ID provided." });
    }

    // Check if another appointment exists with the same date, time, and doctor
    const existingCita = await citaRepository.findOne({
      where: { fecha, hora, doctor: doctorUser, id: Not(id) }, // Exclude the current appointment by ID
    });

    if (existingCita) {
      return res.status(409).json({
        message:
          "An appointment is already scheduled at this date and time for the selected doctor.",
      });
    }

    // Update and save the appointment with the modified details
    Object.assign(cita, { ...req.body, doctor: doctorUser });
    const updatedCita = await citaRepository.save(cita);

    res.json(updatedCita);
  } catch (error) {
    console.error("Error updating cita:", error);
    res.status(500).json({ message: "Error updating cita" });
  }
});

export default router;
