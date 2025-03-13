import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Medication } from "../medication/medication";
import { Appointment } from "./appointment";

@Entity("cita_detalle")
export class AppointmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.detalles, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_cita" })
  cita: Appointment;

  @Column({ nullable: true })
  dosis: string;

  @Column({ default: 1 })
  cantidad: number;

  @ManyToOne(() => Medication, (medication) => medication.appointmentDetail, {
    nullable: true,
  })
  @JoinColumn({ name: "medicamento_id" })
  medicamento: Medication;
}
