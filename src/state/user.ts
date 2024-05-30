import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";
import { Entity, generate } from "@rocicorp/rails";
import { oneOf } from "../utils/rand";

export type UserInfo = {
  name: string;
  avatar: string;
  color: string;
};
export type UserState = Entity & UserInfo;

const {
  init: initUser,
  has: hasUserState,
  get: getUserState,
  put: putUserState,
  update: updateUserState,
} = generate<UserState>("user");

export { hasUserState, getUserState, putUserState, updateUserState };

export function initUserState(tx: WriteTransaction, userState: UserState) {
  return initUser(tx, userState);
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

export function getNewUserInfo(): UserInfo {
  const [avatar] = oneOf(avatars);
  const randUserInfo = { avatar, name: "Anonymous", color: oneOf(colors) };
  return randUserInfo;
}

export async function setUserInfo(
  tx: WriteTransaction,
  { id, userInfo }: { id: string; userInfo: UserInfo }
) {
  return updateUserState(tx, { id, ...userInfo });
}
