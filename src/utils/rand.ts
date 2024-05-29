export const oneOf = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
