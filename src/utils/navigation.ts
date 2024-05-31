import { nanoid } from "nanoid";

export const gotoNewBoard = () => {
  history.pushState({}, "", `/b/${nanoid()}`);
};
