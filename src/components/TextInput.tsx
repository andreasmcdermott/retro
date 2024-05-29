import styles from "./textInput.module.css";

export function TextInput({
  autoFocus,
  value = "",
  onChange,
  onBlur,
  onEscape,
}: {
  autoFocus?: boolean;
  value?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  onEscape?: () => void;
}) {
  return (
    <input
      type="text"
      className={styles.input}
      autoFocus={autoFocus}
      defaultValue={value}
      onBlur={(e) =>
        e.currentTarget.value === value
          ? onBlur?.()
          : onChange(e.currentTarget.value)
      }
      onKeyDown={(e) => {
        if (e.key === "Escape") onEscape?.();
        else if (e.key === "Enter") onChange(e.currentTarget.value);
      }}
    />
  );
}
