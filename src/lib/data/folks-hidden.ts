import type { Folk } from "#lib/types.js";
import { images } from "./imports";

export const hiddenFolks: Folk[] = [
  {
    id: 129,
    data: {
      name: "Shelly Cheng",
      page: "https://shellyscheng.github.io/",
      type: "interactive",
      image: images["/src/lib/images/shelly-cheng.webp"].default,
    },
  },
  {
    id: 135,
    data: {
      name: "Stephanie Wu",
      page: "https://www.stephdesigns.net/",
      type: "interactive",
      image: images["/src/lib/images/stephanie-wu.webp"].default,
    },
  },
];
