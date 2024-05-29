import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";

export type BoardInfo = {
  name: string;
  owner: string;
  mode: "editing" | "voting" | "viewing";
};
export type BoardState = {
  boardInfo: BoardInfo;
};

export async function initBoardState(tx: WriteTransaction, userId: string) {
  const existingBoardInfo = await getBoardInfo(tx);
  if (existingBoardInfo.owner) return;

  return tx.set("boardState", {
    boardInfo: { name: "Unnamed Board", owner: userId, mode: "editing" },
  });
}

export async function getBoardInfo(tx: ReadTransaction) {
  return (
    (await tx.get<BoardState>("boardState"))?.boardInfo ?? {
      name: "Unnamed Board",
      owner: null,
      mode: "viewing",
    }
  );
}

export async function updateBoardName(
  tx: WriteTransaction,
  { userId, name }: { userId: string; name: string }
) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo.owner === userId)
    return tx.set("boardState", { boardInfo: { ...boardInfo, name } });
}

export async function cycleBoardMode(tx: WriteTransaction, userId: string) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo.owner === userId) {
    return tx.set("boardState", {
      boardInfo: {
        ...boardInfo,
        mode:
          boardInfo.mode === "editing"
            ? "voting"
            : boardInfo.mode === "voting"
            ? "viewing"
            : "editing",
      },
    });
  }
}
