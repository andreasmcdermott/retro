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

export const colors = [
  "#0d0221", // Black
  "#541388", // Dark Purple
  "#023788", // Dark Blue
  "#d40078", // Magenta
  "#ff4365", // Red
  "#efefef", // Almost White
  "#f6019d", // Pink
  "#2de2e6", // Cyan
  "#ff6c11", // Orange
  "#f9c80e", // Yellow
];
export const avatars = [
  ["🐶", "Puppy"],
  ["🐱", "Kitty"],
  ["🐭", "Mouse"],
  ["🐹", "Hamster"],
  ["🐰", "Bunny"],
  ["🦊", "Fox"],
  ["🐻", "Bear"],
  ["🐼", "Panda"],
  ["🐻‍❄️", "Polarbear"],
  ["🐨", "Koala"],
  ["🐯", "Tiger"],
  ["🦁", "Lion"],
  ["🐮", "Cow"],
  ["🐷", "Pig"],
  ["🐸", "Frog"],
  ["🐵", "Monkey"],
  ["🐣", "Chick"],
  ["🐥", "Chicken"],
  ["🐞", "Ladybug"],
  ["🫎", "Moose"],
  ["🦭", "Seal"],
  ["🪼", "Jellyfish"],
  ["🐲", "Dragon"],
  ["🌞", "Sun"],
  ["🌝", "Moon"],
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
