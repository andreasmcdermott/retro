import { ClientState } from "../state/client-state";
import styles from "./avatar.module.css";

export function Avatar({ client }: { client: ClientState }) {
  console.log(client);
  return (
    <div
      className={styles.avatar}
      style={{ backgroundColor: client.userInfo.color }}
    >
      {client.userInfo.avatar}
    </div>
  );
}
