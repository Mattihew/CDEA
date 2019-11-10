import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import Ref from "./Reference";

@Entity()
export default class Unit {
  @PrimaryColumn({ unique: true })
  id!: number;

  @OneToMany(
    type => Ref,
    ref => ref.unit
  )
  refs?: Ref[];
}
