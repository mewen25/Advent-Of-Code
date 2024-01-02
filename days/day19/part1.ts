export default function part1(data: string) {
  const [_instructions, _vars] = data.split("\n\n");

  let accepts = 0;
  let rejects = 0;

  let sum = 0;

  const vars = _vars.split("\n").map((l) => {
    const v = l.slice(1, -1).split(",");
    console.log(v);
    return v.map((_v) => `const ${_v};`).join("");
  });

  vars.forEach((_var) => {
    window.varList = _var;

    window.A = () => {
      const v = window.varList.replaceAll(/const\s/g, "").replaceAll(/;/g, "")
        .split(/\w=/g).filter((n) => n !== "").map(Number);

      sum += v.reduce((a, b) => a + b, 0);
      console.log("ACCEPT!", accepts, v, sum);
      accepts++;
    };
    window.R = () => {
      console.log("REJECT!", rejects);
      rejects++;
    };

    const instructions = _instructions.replaceAll(/\}/g, "").split("\n").map(
      (l, i) => {
        const [label, _label] = l.split("{");
        const steps = _label.split(",");

        const ifs = steps.reduce((acc, cur) => {
          const [s, fn] = cur.split(":");
          if (!fn && s) {
            return acc + `window.${s}();`;
          }
          return acc +
            `if(${s}) {window.${fn}();return;}`;
        }, "");

        const str = `window.${label} = () => {${window.varList};${ifs}}`;

        // console.log(str);

        return [label, str];
      },
    ).filter(Boolean);

    instructions.forEach((l) => {
      const [label, fn] = l;
      eval(fn);
    });

    window.in();
  });

  return sum;
}
