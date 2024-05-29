import { useClients } from "./subscriptions";
import styles from "./header.module.css";
import { Avatar } from "./components/Avatar";

export function Header() {
  const otherClients = useClients();

  return (
    <div className={styles.header}>
      <div></div>
      <div className={styles.users}>
        {otherClients.map((client) => (
          <Avatar key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
