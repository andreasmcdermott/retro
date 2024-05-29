import { Reflect } from "@rocicorp/reflect/client";
import { nanoid } from "nanoid";
import { mutators } from "../mutators/mutators";

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) throw new Error("VITE_REFLECT_URL required");

const pathname = location.pathname.slice(1);
export const boardId = pathname || nanoid();
export const userId = localStorage.getItem("userId") ?? nanoid();
localStorage.setItem("userId", userId);

if (!pathname) history.replaceState({}, "", `/${boardId}`);

export const r = new Reflect({
  server,
  userID: userId,
  roomID: boardId,
  auth: userId,
  mutators,
});
