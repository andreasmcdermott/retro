import type { WriteTransaction } from "@rocicorp/reflect";
import { Entity, generate } from "@rocicorp/rails";
import { oneOf } from "../utils/rand";

export type UserInfo = {
  name: string;
  avatar: string;
  color: string;
};
export type ClientState = Entity & {
  userId: string;
  userInfo: UserInfo;
};

const {
  init: initImpl,
  get: getClientState,
  put: putClientState,
  update: updateClientState,
} = generate<ClientState>("client-state");

export { getClientState, putClientState, updateClientState };

export function initClientState(
  tx: WriteTransaction,
  clientState: { userId: string; userInfo: UserInfo }
) {
  return initImpl(tx, { id: tx.clientID, ...clientState });
}

export const colors = ["#2de2e6", "#ff4365", "#541388", "#f6019d", "#f9c80e"];
export const avatars = [
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

export function updateStoredUserInfo(userInfo: UserInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getStoredUserInfo() {
  const rawUserInfo = localStorage.getItem("userInfo");
  if (rawUserInfo) return JSON.parse(rawUserInfo);

  return null;
}

export function getUserInfo(): UserInfo {
  const userInfo = getStoredUserInfo();
  if (userInfo) return userInfo;

  const [avatar] = oneOf(avatars);
  const randUserInfo = { avatar, name: "Anonymous", color: oneOf(colors) };
  updateStoredUserInfo(randUserInfo);
  return randUserInfo;
}

export async function setUserInfo(tx: WriteTransaction, userInfo: UserInfo) {
  const current = await getClientState(tx, tx.clientID);

  if (!current) return;

  return updateClientState(tx, { ...current, userInfo });
}
