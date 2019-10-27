import { Entity, Column, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Unit from "./Unit";
import Evidence from "./Evidence";

@Entity()
export default class Ref {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => Unit, unit => unit.refs, { cascade: true })
  unit!: Unit;

  @Column({ type: "enum", enum: ["P", "S"] })
  type!: "P" | "S";

  @Column()
  value!: number;

  @Column({ nullable: true })
  subValue?: number;

  @ManyToMany(type => Evidence, evidence => evidence.refs)
  evidence?: Evidence[];
}
