import { Entity, generate } from "@rocicorp/rails";
import { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";
import { seconds } from "../utils/time";

export type RetroItemState = Entity & {
  column: string;
  value: string;
  author: string;
  upvotes: string[];
  draft?: boolean;
  updatedAt?: number;
};

const {
  get: getRetroItem,
  put: putRetroItem,
  update: updateRetroItem,
  delete: deleteRetroItem,
  list: listRetroItems,
} = generate<RetroItemState>("retro-item");

export {
  getRetroItem,
  putRetroItem,
  updateRetroItem,
  deleteRetroItem,
  listRetroItems,
};

export async function updateRetroValue(
  tx: WriteTransaction,
  { id, value }: { id: string; value: string }
) {
  const item = await getRetroItem(tx, id);
  if (!item) return;
  return updateRetroItem(tx, { ...item, value });
}

export async function listRetroItemsByColumn(
  tx: ReadTransaction,
  column: string,
  userId: string
) {
  const all = await listRetroItems(tx);
  return all.filter(
    (item): item is RetroItemState =>
      !!item &&
      item.column === column &&
      (item.author !== userId || !item.draft) && // Only show drafts to other users
      (!item.draft ||
        !item.updatedAt ||
        Date.now() - item.updatedAt < seconds(30)) // Don't include drafts too old
  );
}

export async function voteOnRetroItem(
  tx: WriteTransaction,
  { id, userId }: { id: string; userId: string }
) {
  const item = await getRetroItem(tx, id);
  if (!item) return;
  if (item.upvotes.includes(userId)) {
    return updateRetroItem(tx, {
      ...item,
      upvotes: item.upvotes.filter((x) => x !== userId),
    });
  } else {
    return updateRetroItem(tx, {
      ...item,
      upvotes: [...item.upvotes, userId],
    });
  }
}
