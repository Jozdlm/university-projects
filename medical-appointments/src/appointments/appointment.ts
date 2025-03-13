import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user";
import { AppointmentDetail } from "./appointment-detail";

export enum AppointmentStatus {
  PENDIENTE = "PENDIENTE",
  REALIZADA = "REALIZADA",
  CANCELADA = "CANCELADA",
}

@Entity("cita")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: true })
  fecha: Date;

  @Column({ type: "time", nullable: true })
  hora: string;

  @Column({ type: "date", nullable: true })
  siguiente_cita_fecha: Date;

  @Column({ type: "time", nullable: true })
  siguiente_cita_hora: string;

  @Column({ type: "decimal", precision: 21, scale: 2, nullable: true })
  precio_cita: number;

  @Column({ type: "varchar", length: 150, default: "", nullable: false })
  diagnostico: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: "PENDIENTE",
  })
  estado: "PENDIENTE" | "REALIZADA" | "CANCELADA";
  
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({name: 'id_paciente'})
  paciente: User;
  
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({name: 'id_doctor'})
  doctor: User;
  
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({name: 'id_secretaria'})
  secretaria: User;

  @OneToMany(() => AppointmentDetail, (detail) => detail.cita)
  detalles: AppointmentDetail[];
}
