import { nanoid } from "nanoid";
import { useBoardInfo, useRetroItemsByColumn } from "../subscriptions";
import { RetroItem } from "./RetroItem";
import { TextArea } from "./TextArea";
import styles from "./column.module.css";
import { useEffect, useState } from "react";
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

  if (!boardInfo) return null;

  const isEditing = boardInfo.mode === "editing";
  const isViewing = boardInfo.mode === "viewing";

  if (isViewing) items.sort((a, b) => b.upvotes?.length - a.upvotes?.length);

  const onEdit = async (value: string) => {
    if (!value) r.mutate.deleteRetroItem(nextId);
    else
      await r.mutate.putRetroItem({
        id: nextId,
        column: id,
        value,
        author: userId,
        upvotes: [],
        draft: true,
        updatedAt: Date.now(),
      });
  };

  const onCancel = async () => {
    await r.mutate.deleteRetroItem(nextId);
    setNextId(nanoid());
  };

  const onSave = async (value: string) => {
    if (!value.trim()) return;

    setSaving(true);
    await r.mutate.putRetroItem({
      id: nextId,
      column: id,
      value,
      author: userId,
      upvotes: [],
      draft: false,
      updatedAt: Date.now(),
    });
    setSaving(false);
    setNextId(nanoid());
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <h3 className={styles.columnSubtitle}>{subTitle}</h3>
      </div>
      <div className={styles.columnList}>
        {isEditing && (
          <div className={styles.editorContainer}>
            <TextArea
              key={nextId}
              disabled={saving}
              onInputChange={onEdit}
              onSave={onSave}
              onCancel={onCancel}
            />
          </div>
        )}

        <div className={styles.scrollContainer}>
          {items.map((item) => (
            <RetroItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
