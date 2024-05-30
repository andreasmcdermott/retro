import { useEffect, useState } from "react";
import { seconds } from "../utils/time";
import styles from "./draftItem.module.css";

export function DraftItem({ updatedAt }: { updatedAt: number | undefined }) {
  if (!updatedAt) updatedAt = Date.now() - seconds(15);

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let reqId: number = 0;

    const update = () => {
      setOpacity(
        1 - Math.max(0, Math.min(1, (Date.now() - updatedAt) / seconds(30)))
      );
      reqId = requestAnimationFrame(update);
    };

    reqId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(reqId);
  }, [updatedAt]);

  return (
    <div
      className={styles.draftItem}
      style={{ opacity }}
      data-active={Date.now() - updatedAt < seconds(5)}
    />
  );
}
