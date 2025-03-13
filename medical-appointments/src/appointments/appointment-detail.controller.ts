import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppointmentDetail } from "./appointment-detail";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const citaDetalleRepository = AppDataSource.getRepository(AppointmentDetail);

router.use(authMiddleware);

// Get all cita detalles
router.get("/", async (req: Request, res: Response) => {
  try {
    const detalles = await citaDetalleRepository.find({
      relations: {
        medicamento: true,
      },
    }); // Adjust the relation as necessary
    res.json(detalles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving cita detalles" });
  }
});

// Get a cita detalle by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const detalle = await citaDetalleRepository.findOne({
      where: { id },
      relations: {
        medicamento: true,
      },
    });

    if (detalle) {
      res.json(detalle);
    } else {
      res
        .status(404)
        .json({ message: `Cita Detalle not found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cita detalle" });
  }
});

// Create a new cita detalle
router.post("/", async (req: Request, res: Response) => {
  try {
    const detalle = citaDetalleRepository.create(req.body);
    const savedDetalle = await citaDetalleRepository.save(detalle);
    res.status(201).json(savedDetalle);
  } catch (error) {
    res.status(500).json({ message: "Error saving cita detalle" });
  }
});

// Update an existing cita detalle
router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const detalle = await citaDetalleRepository.findOneBy({ id });

    if (detalle) {
      Object.assign(detalle, req.body);
      const updatedDetalle = await citaDetalleRepository.save(detalle);
      res.json(updatedDetalle);
    } else {
      res
        .status(404)
        .json({ message: `Cita Detalle not found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cita detalle" });
  }
});

// Export the router
export default router;
