import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";

export type BoardInfo = { name: string };
export type BoardState = { boardInfo: BoardInfo };

export async function setBoardInfo(tx: WriteTransaction, boardInfo: BoardInfo) {
  return tx.set("boardState", { boardInfo });
}

export async function getBoardInfo(tx: ReadTransaction) {
  return (
    (await tx.get<BoardState>("boardState"))?.boardInfo ?? {
      name: "Unnamed Board",
    }
  );
}
