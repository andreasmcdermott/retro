import styles from "./popover.module.css";

export function Popover({
  children,
  id,
  align = "center",
}: {
  children: React.ReactNode;
  id: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      ref={(node) => {
        if (node) {
          const anchorId = `${id}-trigger`;

          node.setAttribute("popover", "");
          node.setAttribute("anchor", anchorId);

          const anchor = document.getElementById(anchorId);
          if (anchor) {
            const rect = anchor.getBoundingClientRect();
            node.style.top = `${rect.bottom}px`;
            node.style.left =
              align === "right"
                ? `${rect.right}px`
                : align === "center"
                ? `${rect.left + rect.width / 2}px`
                : `${rect.left}px`;
          }
        }
      }}
      id={id}
      className={styles.popover}
      data-align={align}
    >
      {children}
    </div>
  );
}
