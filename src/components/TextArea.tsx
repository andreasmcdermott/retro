import { useState } from "react";
import { New, Trash } from "../icons";
import { SmallButton } from "./Button";
import styles from "./textArea.module.css";

export function TextArea({
  value = "",
  disabled,
  onSave,
  onCancel,
}: {
  value?: string;
  disabled?: boolean;
  onSave: (v: string) => void;
  onCancel: () => void;
}) {
  const [currContent, setCurrContent] = useState(value);

  return (
    <div className={styles.container}>
      <textarea
        onInput={(e) => setCurrContent(e.currentTarget.value)}
        className={styles.textarea}
        defaultValue={value}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel?.();
          else if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
            onSave(e.currentTarget.value);
        }}
      />
      {currContent && currContent !== value && (
        <div className={styles.buttonContainer}>
          <SmallButton onClick={onCancel}>
            <Trash />
          </SmallButton>
          <SmallButton onClick={() => onSave(currContent)}>
            <New />
          </SmallButton>
        </div>
      )}
    </div>
  );
}
