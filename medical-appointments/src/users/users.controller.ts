import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { User, UserRole } from "./user"; // Adjust the import path as necessary
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.use(authMiddleware);

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Get a user by CUI
router.get("/:cui", async (req: Request, res: Response) => {
  const { cui } = req.params;

  try {
    const user = await User.findOneBy({ cui });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: `User not found with CUI: ${cui}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// Create a new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { cui, nombres, apellidos, correo, password, role } = req.body;

    // Check for existing user with the same CUI
    const existingUser = await User.findOneBy({ cui });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this CUI already exists." });
    }

    const stringToCheck = "RED";

    if (!Object.values(UserRole).includes(role)) {
      return res
        .status(400)
        .json({ message: "The value of role provided is not valid" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User.create({
      cui,
      nombres,
      apellidos,
      correo,
      password: hashedPassword,
      role,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error saving user" });
  }
});

// Update an existing user
router.put("/:cui", async (req: Request, res: Response) => {
  const { cui } = req.params;

  try {
    const user = await User.findOneBy({ cui });
    if (!user) {
      res.status(404).json({ message: `User not found with CUI: ${cui}` });
    } else {
      // Update user properties
      const { nombres, apellidos, correo, password, role } = req.body;
      user.nombres = nombres || user.nombres;
      user.apellidos = apellidos || user.apellidos;
      user.correo = correo || user.correo;
      user.password = password || user.password; // Note: consider hashing passwords in a real app
      user.role = role || user.role;

      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user
router.delete("/:cui", async (req: Request, res: Response) => {
  const { cui } = req.params;

  try {
    const user = await User.findOneBy({ cui });
    if (!user) {
      res.status(404).json({ message: `User not found with CUI: ${cui}` });
    } else {
      await user.remove();
      res.status(204).send(); // No content
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
