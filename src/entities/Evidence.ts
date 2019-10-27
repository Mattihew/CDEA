import { PrimaryColumn, Column, Entity, ManyToMany, JoinTable } from "typeorm";
import Ref from "./Reference";
import { createHash } from "crypto";

@Entity()
export default class Evidence {
  @PrimaryColumn({ name: "id" })
  get id(): number {
    const hash = createHash("md5");
    if (this.text) {
      hash.update(this.text);
    }
    if (this.refs) {
      this.refs.forEach(ref => hash.update(String(ref.id)));
    }
    return Number.parseInt(hash.digest("hex").slice(-6), 16);
  }

  @Column()
  text!: string;

  @ManyToMany(type => Ref, ref => ref.evidence, { cascade: true })
  @JoinTable({})
  refs?: Ref[];
}
