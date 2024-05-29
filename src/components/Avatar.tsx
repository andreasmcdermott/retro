import { ClientState } from "../state/client";
import styles from "./avatar.module.css";

export function Avatar({ client }: { client: ClientState }) {
  return (
    <div
      className={styles.avatar}
      style={{
        backgroundColor: client.userInfo.color,
        boxShadow: `0 0 1rem ${client.userInfo.color}`,
      }}
    >
      {client.userInfo.avatar}
    </div>
  );
}
