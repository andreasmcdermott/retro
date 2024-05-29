import { getUserInfo } from "./state/client-state";
import { r } from "./state/r";
import styles from "./app.module.css";
import { useAsyncEffect } from "./hooks/useAsyncEffect";
import { Header } from "./Header";
import { Main } from "./Main";

export function App() {
  useAsyncEffect(async () => {
    await r.mutate.initClientState(getUserInfo());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>
        <Main />
      </main>
    </div>
  );
}
