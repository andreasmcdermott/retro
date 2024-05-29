import styles from "./textArea.module.css";

export function TextArea({
  value = "",
  disabled,
  onChange,
  onEscape,
}: {
  value?: string;
  disabled?: boolean;
  onChange: (v: string) => void;
  onEscape?: () => void;
}) {
  return (
    <textarea
      className={styles.textarea}
      defaultValue={value}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Escape") onEscape?.();
        else if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
          onChange(e.currentTarget.value);
      }}
    />
  );
}
