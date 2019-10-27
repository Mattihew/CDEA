import { convertToHtml } from "mammoth";
import { load } from "cheerio";
import { readFileSync } from "fs";
import { createConnection } from "typeorm";
import Ref from "./entities/Reference";
import Evidence from "./entities/Evidence";
import Unit from "./entities/Unit";

const units = [120, 119, 117, 116, 115, 114, 89, 77, 68, 34, 26, 1] as const;

function getRefs(input: string): Ref[] {
  const unit = units.find(u => input.indexOf(String(u)) !== -1);
  const result: Ref[] = [];
  if (unit) {
    const pointRegex = /([PS])(\d\d?)(\.\d\d?)?/gi;
    let values: RegExpExecArray | null | undefined;
    while (values !== null) {
      values = pointRegex.exec(input);
      if (values) {
        const newUnit = new Unit();
        newUnit.id = unit;
        const newRef = new Ref();
        newRef.unit = newUnit;
        newRef.type = values[1].toUpperCase() as "P" | "S";
        newRef.value = Number(values[2]);
        newRef.subValue = (values[3] && Number(values[3].substr(1))) || undefined;
        result.push(newRef);
      }
    }
  }
  return result;
}

async function parse(buffer: Buffer): Promise<Evidence[]> {
  const result = await convertToHtml({ buffer });
  if (result.messages.length) {
    throw new Error(result.messages.join("\n"));
  }
  const $ = load(result.value);
  const evidence: Evidence[] = [];
  let newPara = false;
  let ce: Required<Pick<Evidence, "text" | "refs">> = { text: "", refs: [] };
  $("td").each((i, td) => {
    if (ce.refs.length && ce.text.length) {
      const ev = new Evidence();
      ev.text = ce.text;
      ev.refs = ce.refs;
      evidence.push(ev);
    }
    ce = { text: "", refs: [] };
    $(td)
      .children("p")
      .each((j, p) => {
        const text = $(p).text();
        const refs = getRefs(text);
        if (refs.length) {
          ce.refs = [...ce.refs, ...refs];
          newPara = true;
        } else {
          if (newPara) {
            if (ce.refs.length && ce.text.length) {
              const ev = new Evidence();
              ev.text = ce.text;
              ev.refs = ce.refs;
              evidence.push(ev);
            }
            ce = { text: "", refs: [] };
            newPara = false;
          }
          ce.text += "<p>" + text + "</p>";
        }
      });
  });
  return evidence;
}

parse(readFileSync("./data/task8-NightFlyingReview.docx")).then(debug => {
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "example",
    database: "postgres",
    entities: ["src/entities/*.ts"],
    synchronize: true
  }).then(connection => {
    connection.manager.save(debug);
  });
});
