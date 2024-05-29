import { nanoid } from "nanoid";
import {
  useBoardInfo,
  useCurrentClient,
  useRetroItemsByColumn,
} from "../subscriptions";
import { RetroItem } from "./RetroItem";
import { TextArea } from "./TextArea";
import styles from "./column.module.css";
import { useState } from "react";
import { useReflect, useUserId } from "../AppState";

export function Column({
  id,
  title,
  subTitle,
}: {
  id: string;
  title: string;
  subTitle: string;
}) {
  const r = useReflect();
  const [saving, setSaving] = useState(false);
  const [nextId, setNextId] = useState(nanoid());
  const items = useRetroItemsByColumn(id);
  const userId = useUserId();
  const boardInfo = useBoardInfo();
  const isEditing = boardInfo.mode === "editing";
  const isViewing = boardInfo.mode === "viewing";

  if (isViewing) {
    items.sort((a, b) => b.upvotes?.length - a.upvotes?.length);
  }

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <h3 className={styles.columnSubtitle}>{subTitle}</h3>
      </div>
      <div className={styles.columnList}>
        {isEditing && (
          <TextArea
            key={nextId}
            disabled={saving}
            onChange={async (value) => {
              setSaving(true);
              await r.mutate.putRetroItem({
                id: nextId,
                column: id,
                value,
                author: userId,
                upvotes: [],
              });
              setSaving(false);
              setNextId(nanoid());
            }}
            onEscape={() => setNextId(nanoid())}
          />
        )}

        {items.map((item) => (
          <RetroItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
