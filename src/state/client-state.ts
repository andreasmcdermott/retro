import type { WriteTransaction } from "@rocicorp/reflect";
import { Entity, generate } from "@rocicorp/rails";
import { oneOf } from "../utils/rand";

export type UserInfo = { name: string; avatar: string; color: string };
export type ClientState = Entity & { userInfo: UserInfo };

const {
  init: initImpl,
  get: getClientState,
  put: putClientState,
  update: updateClientState,
} = generate<ClientState>("client-state");

export { getClientState, putClientState, updateClientState };

export function initClientState(tx: WriteTransaction, userInfo: UserInfo) {
  return initImpl(tx, { id: tx.clientID, userInfo });
}

const colors = [
  "#2de2e6",
  "#ff4365",
  "#791e94",
  "#541388",
  "#f6019d",
  "#f9c80e",
];
const avatars = [
  ["🐶", "Puppy"],
  ["🐱", "Kitty"],
  ["🐭", "Mouse"],
  ["🐹", "Hamster"],
  ["🐰", "Bunny"],
  ["🦊", "Fox"],
  ["🐻", "Bear"],
  ["🐼", "Panda"],
  ["🐨", "Koala"],
  ["🐷", "Pig"],
  ["🐵", "Monkey"],
  ["🦁", "Lion"],
  ["🐯", "Tiger"],
  ["🐮", "Cow"],
  ["🐸", "Frog"],
  ["🐥", "Chicken"],
];

export function getUserInfo(): UserInfo {
  const rawUserInfo = localStorage.getItem("userInfo");
  if (rawUserInfo) return JSON.parse(rawUserInfo);

  const [avatar, name] = oneOf(avatars);
  const randUserInfo = { avatar, name, color: oneOf(colors) };
  localStorage.setItem("userInfo", JSON.stringify(randUserInfo));
  return randUserInfo;
}
