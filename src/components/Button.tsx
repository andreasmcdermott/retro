import { useState } from "react";
import { AddUser, Check } from "../icons";
import { copyValueToClipboard } from "../utils/copy";
import { wait } from "../utils/wait";
import styles from "./button.module.css";

export function UnstyledButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={styles.unstyledButton} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({
  children,
  onClick,
  color = "inherit",
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      className={styles.iconButton}
      type="button"
      onClick={onClick}
      style={{ color }}
    >
      {children}
    </button>
  );
}

export function CopyButton({
  value,
  color,
}: {
  value: string;
  color?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <IconButton
      color={color}
      onClick={async () => {
        await copyValueToClipboard(value);
        setCopied(true);
        await wait(1000);
        setCopied(false);
      }}
    >
      {copied ? <Check /> : <AddUser />}
    </IconButton>
  );
}

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export function SmallButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={styles.smallButton}>
      {children}
    </button>
  );
}
