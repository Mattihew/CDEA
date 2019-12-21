import { createHash } from "crypto";
import { PrimaryColumn, Column, Entity, ManyToMany, JoinTable } from "typeorm";

import Ref from "./Reference";

@Entity()
export default class Evidence {
  private _id?: number;

  @PrimaryColumn({ name: "id" })
  get id(): number {
    if (this._id) {
      return this._id;
    }
    const hash = createHash("md5");
    if (this.text) {
      hash.update(this.text);
    }
    if (this.refs) {
      this.refs.forEach(ref => {
        hash.update(String(ref.unit.id));
        hash.update(ref.type);
        hash.update(String(ref.value));
        hash.update(String(ref.subValue));
      });
    }
    return Number.parseInt(hash.digest("hex").slice(-6), 16);
  }

  set id(id: number) {
    this._id = id;
  }

  @Column()
  text!: string;

  @ManyToMany(
    type => Ref,
    ref => ref.evidence,
    { cascade: false }
  )
  @JoinTable()
  refs?: Ref[];
}
