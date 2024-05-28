import { useEffect } from "react";
import { randUserInfo } from "./state/client-state";
import { useCount } from "./subscriptions";
import { r } from "./state/appState";

import styles from "./index.module.css";

const incrementKey = "count";

export function App() {
  useEffect(() => {
    void (async () => {
      const userInfo = randUserInfo();
      await r.mutate.initClientState(userInfo);
    })();
  }, []);

  const handleButtonClick = () => {
    void r.mutate.increment({ key: incrementKey, delta: 1 });
  };

  const count = useCount(r, incrementKey);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.count}>{count}</div>
        <button onClick={handleButtonClick}>Bonk</button>
      </div>
    </div>
  );
}
