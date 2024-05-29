import { Column } from "./Column";
import styles from "./main.module.css";

export function Main() {
  return (
    <div className={styles.main}>
      <Column id="wins" title="Wins" subTitle="What went well?" />
      <Column
        id="improvements"
        title="Improvements"
        subTitle="What could be improved?"
      />
      <Column id="learnings" title="Learnings" subTitle="What did we learn?" />
      <Column id="questions" title="Questions" subTitle="What is unclear?" />
    </div>
  );
}
