import { convertToHtml } from "mammoth";
import { load } from "cheerio";
import { readFileSync } from "fs";

const units = [120, 119, 117, 116, 115, 114, 89, 77, 68, 34, 26, 1] as const;

interface Ref {
  unit: number;
  type: "P" | "S";
  value: number;
  subValue?: number;
}

interface Evidence {
  text: string[];
  refs: Ref[];
}

function getRefs(input: string): Ref[] {
  const unit = units.find(u => input.indexOf(String(u)) !== -1);
  const result: Ref[] = [];
  if (unit) {
    const pointRegex = /([PS])(\d\d?)(\.\d\d?)?/gi;
    let values: RegExpExecArray | null | undefined;
    while (values !== null) {
      values = pointRegex.exec(input);
      if (values) {
        result.push({
          unit,
          type: values[1].toUpperCase() as "P" | "S",
          value: Number(values[2]),
          subValue: (values[3] && Number(values[3].substr(1))) || undefined
        });
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
  let ce: Evidence = { text: [], refs: [] };
  $("td").each((i, td) => {
    if (ce.refs.length && ce.text.length) {
      evidence.push(ce);
    }
    ce = { text: [], refs: [] };
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
              evidence.push(ce);
            }
            ce = { text: [], refs: [] };
            newPara = false;
          }
          ce.text = [...ce.text, text];
        }
      });
  });
  return evidence;
}

parse(readFileSync("./data/task8-NightFlyingReview.docx")).then(debug => {
  console.log(JSON.stringify(debug, undefined, 2));
});
