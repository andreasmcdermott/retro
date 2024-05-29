import { useReflect, useUserId } from "../AppState";
import { MinusOne, PlusOne } from "../icons";
import { RetroItemState } from "../state/retro-item";
import { IconButton } from "./Button";
import styles from "./retroItem.module.css";

export function RetroItem({ item }: { item: RetroItemState }) {
  const userId = useUserId();
  const r = useReflect();

  return (
    <div className={styles.item}>
      {item.value}
      <div className={styles.actions}>
        <small>
          Votes: <strong>{item.upvotes?.length || 0}</strong>
        </small>
        {item.author !== userId && (
          <IconButton
            onClick={() => {
              r.mutate.voteOnRetroItem({
                id: item.id,
                userId,
              });
            }}
            color="var(--black)"
          >
            {(item.upvotes || []).includes(userId) ? <MinusOne /> : <PlusOne />}
          </IconButton>
        )}
      </div>
    </div>
  );
}
