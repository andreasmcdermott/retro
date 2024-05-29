import styles from "./column.module.css";

export function Column({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <h3 className={styles.columnSubtitle}>{subTitle}</h3>
      </div>
      <div className={styles.columnList}></div>
    </div>
  );
}
