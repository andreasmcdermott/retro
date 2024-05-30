import { useReflect, useUserId } from "../AppState";
import { useEditState } from "../hooks/useEditState";
import { Edit, MinusOne, PlusOne, Trash } from "../icons";
import { RetroItemState } from "../state/retro-item";
import { useBoardInfo } from "../subscriptions";
import { IconButton } from "./Button";
import { DraftItem } from "./DraftItem";
import { TextArea } from "./TextArea";
import styles from "./retroItem.module.css";

export function RetroItem({ item }: { item: RetroItemState }) {
  const userId = useUserId();
  const isAuthor = userId === item.author;
  const r = useReflect();
  const {
    state: { isEditing, value },
    startEditing,
    stopEditing,
    changeValue,
  } = useEditState(isAuthor, (v) =>
    r.mutate.updateRetroValue({ id: item.id, value: v })
  );
  const boardInfo = useBoardInfo();

  if (!boardInfo) return null;

  const isDraft = !!item.draft;
  const canEdit = boardInfo.mode === "editing";
  const canVote = boardInfo.mode !== "viewing";

  if (isEditing)
    return (
      <TextArea value={value} onSave={changeValue} onCancel={stopEditing} />
    );

  if (isDraft) {
    return <DraftItem updatedAt={item.updatedAt} />;
  }

  return (
    <div className={styles.item}>
      <pre>{item.value}</pre>

      <div className={styles.actionsContainer}>
        <div className={styles.actions}>
          <small>
            Votes: <strong>{item.upvotes?.length || 0}</strong>
          </small>
          {canVote && (
            <IconButton
              onClick={() => {
                r.mutate.voteOnRetroItem({
                  id: item.id,
                  userId,
                });
              }}
              color="var(--dark-blue)"
            >
              {(item.upvotes || []).includes(userId) ? (
                <MinusOne />
              ) : (
                <PlusOne />
              )}
            </IconButton>
          )}
        </div>
        {isAuthor && canEdit && (
          <div className={styles.actions}>
            <IconButton
              onClick={() => startEditing(item.value)}
              color="var(--dark-blue)"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => r.mutate.deleteRetroItem(item.id)}
              color="var(--dark-blue)"
            >
              <Trash />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
