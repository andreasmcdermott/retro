import { nanoid } from "nanoid";

export const gotoNewBoard = (newPage = false) => {
  if (newPage) window.open(`${location.origin}/b`, "_blank");
  else history.pushState({}, "", `/b`);
};
