import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { User, UserRole } from "../users/user"; // Assuming you already have a User model.
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";

dotenv.config();
// Secret key for signing the JWT (use environment variables in production)
const router = Router();
const JWT_SECRET =
  process.env.JWT_KEY ||
  "519064915bc4d803bb2547bd8ffbb9cf674b9a0fdc863836a05b38acb5120ce7";

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is requerid").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { correo: email } });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password!);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.cui, role: user.role }, // You can add any other info you'd like to encode
        JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }
);

const registerValidationRules = [
  check("cui")
    .notEmpty()
    .withMessage("CUI is required")
    .isLength({ min: 13, max: 13 }),
  check("nombres")
    .notEmpty()
    .withMessage("Nombres is required")
    .isLength({ min: 2 })
    .withMessage("Nombres must be at least 2 characters long"),

  check("apellidos")
    .notEmpty()
    .withMessage("Apellidos is required")
    .isLength({ min: 2 })
    .withMessage("Apellidos must be at least 2 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Correo is required")
    .isEmail()
    .withMessage("Correo must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Passowrd is requiered")
    .isLength({ min: 3 }),
];

router.post(
  "/register",
  registerValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cui, nombres, apellidos, email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);

      // Check if user exists
      let user = await userRepository.findOne({ where: { correo: email } });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      user = userRepository.create({
        cui,
        nombres,
        apellidos,
        correo: email,
        password: hashedPassword,
        role: UserRole.PACIENTE, // Default role
      });

      await userRepository.save(user);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
