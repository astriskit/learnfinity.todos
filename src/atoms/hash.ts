import { atom } from "jotai";
import { sortedTasks } from "./tasks";

export const tags = atom<string[]>([]);

export const filterTasks = atom((get) => {
  const ts = get(sortedTasks);
  const tgs = get(tags);
  const fTs = ts.filter(({ title }) =>
    tgs.every((tg) => title.split(" ").some((tiG) => tiG === tg))
  );
  return fTs;
});

export const tagFilterTasks = atom((get) => {
  const fTs = get(sortedTasks);
  const tgs = get(tags);
  if (tgs.length) {
    const fTs = get(filterTasks);
    const tFTs = fTs.map(({ title, ...rest }) => {
      const uTitle = title.split(" ").map((wrd) => {
        if (wrd.startsWith("#") && tgs.some((tg) => wrd.includes(tg))) {
          let uWrds: string[] = [];
          for (let i = 0; i < tgs.length; i++) {
            const tg = tgs[i];
            if (tg === wrd) {
              uWrds = [wrd];
              break;
            } else if (wrd.includes(tg)) {
              const splitted = wrd.split("");
              const one = splitted.slice(0, tg.length).join("");
              const two = splitted.slice(tg.length).join("");
              uWrds = [one, two];
              break;
            }
          }
          return uWrds.map((uWrd, idx) => [
            {
              content: uWrd,
              component: idx === 0 ? "code" : null,
              className: idx === 0 ? "word highlight" : "word",
            },
          ]);
        }
        return [{ content: wrd, component: "span", className: "word" }];
      });
      return { ...rest, title, uTitle };
    });
    return tFTs;
  }
  return fTs.map((f) => ({
    ...f,
    uTitle: f.title
      .split(" ")
      .map((wrd) => [{ content: wrd, component: "span", className: "word" }]),
  }));
});
