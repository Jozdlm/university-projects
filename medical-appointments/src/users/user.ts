import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
  RECEPCIONISTA = "RECEPCIONISTA",
  MEDICO = "MEDICO",
  PACIENTE = "PACIENTE",
}

@Entity({ name: "usuarios" })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 13 })
  cui: string;

  @Column({ type: "varchar", length: 255 })
  nombres: string;

  @Column({ type: "varchar", length: 255 })
  apellidos: string;

  @Column({ type: "varchar", length: 255 })
  correo: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.PACIENTE,
  })
  role: UserRole;
}
