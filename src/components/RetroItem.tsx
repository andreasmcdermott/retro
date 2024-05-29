import { useReflect, useUserId } from "../AppState";
import { useEditState } from "../hooks/useEditState";
import { Edit, MinusOne, PlusOne, Trash } from "../icons";
import { RetroItemState } from "../state/retro-item";
import { useBoardInfo } from "../subscriptions";
import { IconButton } from "./Button";
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
  const canEdit = boardInfo.mode === "editing";
  const canVote = boardInfo.mode !== "viewing";

  if (isEditing)
    return (
      <TextArea value={value} onChange={changeValue} onEscape={stopEditing} />
    );

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
              color="var(--black)"
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
              color="var(--black)"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => r.mutate.deleteRetroItem(item.id)}
              color="var(--black)"
            >
              <Trash />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
