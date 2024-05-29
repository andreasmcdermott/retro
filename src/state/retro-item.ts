import { Entity, generate } from "@rocicorp/rails";
import { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";

export type RetroItemState = Entity & {
  column: string;
  value: string;
  author: string;
  upvotes: string[];
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

export async function listRetroItemsByColumn(
  tx: ReadTransaction,
  column: string
) {
  const all = await listRetroItems(tx);
  return all.filter(
    (item): item is RetroItemState => !!item && item.column === column
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
