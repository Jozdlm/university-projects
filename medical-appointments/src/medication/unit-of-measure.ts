import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "medicamento_medidas" })
export class UnitOfMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", nullable: false, unique: true })
  name: string;
}
