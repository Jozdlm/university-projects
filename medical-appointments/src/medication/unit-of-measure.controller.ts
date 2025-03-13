import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { UnitOfMeasure } from "./unit-of-measure";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const unitOfMeasureRepository = AppDataSource.getRepository(UnitOfMeasure);

router.use(authMiddleware);

// Get all units of measure
router.get("/", async (req: Request, res: Response) => {
  try {
    const units = await unitOfMeasureRepository.find();
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving units of measure" });
  }
});

// Get a unit of measure by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const unit = await unitOfMeasureRepository.findOneBy({ id });
    if (!unit) {
      res
        .status(404)
        .json({ message: `Unit of measure not found with ID: ${id}` });
    }
    res.json(unit);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving unit of measure" });
  }
});

// Create a new unit of measure
router.post("/", async (req: Request, res: Response) => {
  try {
    // Check if another unit with the same name exists
    const existingUnitWithSameName = await unitOfMeasureRepository.findOneBy({
      name: req.body.name,
    });

    if (existingUnitWithSameName) {
      return res.status(400).json({
        message: `Unit of measure with name "${req.body.name}" already exists.`,
      });
    }

    const unit = unitOfMeasureRepository.create(req.body);
    const savedUnit = await unitOfMeasureRepository.save(unit);
    res.status(201).json(savedUnit);
  } catch (error) {
    res.status(500).json({ message: "Error saving unit of measure" });
  }
});

// Update an existing unit of measure
router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const unit = await unitOfMeasureRepository.findOneBy({ id });

    if (!unit) {
      return res
        .status(404)
        .json({ message: `Unit of measure not found with ID: ${id}` });
    }

    unit.name = req.body.name;
    const updatedUnit = await unitOfMeasureRepository.save(unit);
    
    return res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: "Error updating unit of measure" });
  }
});

export default router;
