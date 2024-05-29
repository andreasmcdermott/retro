import { Column } from "./components/Column";
import styles from "./main.module.css";

export function Main() {
  return (
    <div className={styles.main}>
      <Column title="Wins" subTitle="What went well?" />
      <Column title="Improvements" subTitle="What could be improved?" />
      <Column title="Learnings" subTitle="What did we learn?" />
      <Column title="Questions" subTitle="What is unclear?" />
    </div>
  );
}
