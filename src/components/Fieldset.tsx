import styles from "./fieldset.module.css";

export function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
