import { Entity, Column, ManyToOne, ManyToMany, PrimaryColumn } from "typeorm";

import Evidence from "./Evidence";
import Unit from "./Unit";

@Entity()
export default class Ref {
  private _id?: string;

  @PrimaryColumn({ name: "id" })
  get id(): string {
    if (this._id) {
      return this._id;
    }
    return `${this.unit.id}-${this.type}${this.value}` + (this.subValue ? `.${this.subValue}` : "");
  }

  set id(id: string) {
    this._id = id;
  }

  @ManyToOne(
    type => Unit,
    unit => unit.refs,
    { cascade: false }
  )
  unit!: Unit;

  @Column({ type: "enum", enum: ["P", "S"] })
  type!: "P" | "S";

  @Column()
  value!: number;

  @Column({ nullable: true })
  subValue?: number;

  @ManyToMany(
    type => Evidence,
    evidence => evidence.refs
  )
  evidence?: Evidence[];
}
