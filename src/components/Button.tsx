import { HTMLAttributes, useState } from "react";
import { AddUser, Check } from "../icons";
import { copyValueToClipboard } from "../utils/copy";
import { wait } from "../utils/wait";
import styles from "./button.module.css";

export function UnstyledButton({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={styles.unstyledButton} type="button">
      {children}
    </button>
  );
}

export function IconButton({
  children,
  color = "inherit",
  ...rest
}: HTMLAttributes<HTMLButtonElement> & {
  popovertarget?: string;
  popovertargetaction?: "toggle" | "show" | "hide";
  color?: string;
}) {
  return (
    <button
      {...rest}
      type="button"
      className={styles.iconButton}
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
  ...rest
}: HTMLAttributes<HTMLButtonElement> & {
  popovertarget?: string;
  popovertargetaction?: "toggle" | "show" | "hide";
}) {
  return (
    <button {...rest} type="button" className={styles.button}>
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

export function ColorButton({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.colorButton}
      style={{ background: color }}
    />
  );
}
