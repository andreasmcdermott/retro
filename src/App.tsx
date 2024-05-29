import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { AppState } from "./AppState";

export function App() {
  return (
    <AppState>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <main className={styles.main}>
          <Main />
        </main>
      </div>
    </AppState>
  );
}
