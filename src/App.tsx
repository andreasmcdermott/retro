import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { AppState } from "./AppState";
import { useParams } from "./components/Router";

export function App() {
  const { boardId } = useParams();

  return (
    <AppState boardId={boardId}>
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
