import express, { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Medication } from "./medication";
import { authMiddleware } from "../auth/auth.middleware";

const router = express.Router();
const medicationRepository = AppDataSource.getRepository(Medication);

router.use(authMiddleware);

// Get all medications
router.get("/", async (req: Request, res: Response) => {
  try {
    const medications = await medicationRepository.find();
    res.json(medications); // No need to return here
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medications" });
  }
});

// Get a medication by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const medication = await medicationRepository.findOneBy({ id });
    if (!medication) {
      res.status(404).json({ message: `Medication not found with ID: ${id}` });
    }
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medication" });
  }
});

// Create a new medication
router.post("/", async (req: Request, res: Response) => {
  try {
    const medication = medicationRepository.create(req.body); // TypeORM's create method
    const savedMedication = await medicationRepository.save(medication);
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(500).json({ message: "Error saving medication" });
  }
});

// Update an existing medication
router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const medication = await medicationRepository.findOneBy({ id });
    if (medication) {
      // Update the medication properties
      medication.name = req.body.name;
      medication.measurementId = req.body.measurementId;
      medication.isActive = req.body.isActive;

      const updatedMedication = await medicationRepository.save(medication);
      res.json(updatedMedication);
    } else {
      res.status(404).json({ message: `Medication not found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating medication" });
  }
});

// Soft delete a medication
router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const medication = await medicationRepository.findOneBy({ id });
    if (medication) {
      // Soft delete by setting isActive to false
      medication.isActive = false;
      const softDeletedMedication = await medicationRepository.save(medication);
      res.json(softDeletedMedication);
    } else {
      res.status(404).json({ message: `Medication not found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting medication" });
  }
});

export default router;
