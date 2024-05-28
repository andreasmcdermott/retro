import { Reflect } from "@rocicorp/reflect/client";
import { nanoid } from "nanoid";
import { mutators } from "../mutators/mutators";

const roomID = "my-room";

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) throw new Error("VITE_REFLECT_URL required");

const userId = localStorage.getItem("userId") ?? nanoid();
localStorage.setItem("userId", userId);

export const r = new Reflect({
  server,
  userID: userId,
  roomID,
  auth: userId,
  mutators,
});
